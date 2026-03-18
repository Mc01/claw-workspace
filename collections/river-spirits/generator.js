#!/usr/bin/env node
/**
 * River Spirits #5 — NFT Generator
 * Combines base creature + background + plant + effect SVGs into final NFTs.
 *
 * Usage:
 *   node generator.js                         # Generate 200 random NFTs
 *   node generator.js --count 500             # Generate 500 NFTs
 *   node generator.js --creature hippo \
 *     --bg nile-mud --plant papyrus-reeds \
 *     --effect water-splash --out generated/hippo-001.svg
 *   node generator.js --list                  # List all available traits
 */

const fs   = require('fs');
const path = require('path');

// ─── Trait Registries ──────────────────────────────────────────────────────────

const CREATURES = [
  'hippo',
  'crocodile',
  'water-buffalo',
  'river-otter',
  'kingfisher',
];

const BACKGROUNDS = [
  // water-patterns
  { name: 'nile-ripples',    folder: 'water-patterns', rarity: 'common' },
  { name: 'congo-currents',  folder: 'water-patterns', rarity: 'common' },
  { name: 'flood-surge',     folder: 'water-patterns', rarity: 'rare' },
  { name: 'still-pool',      folder: 'water-patterns', rarity: 'common' },
  { name: 'river-mist',      folder: 'water-patterns', rarity: 'rare' },
  // mud-textures
  { name: 'nile-mud',        folder: 'mud-textures',   rarity: 'common' },
  { name: 'clay-coating',    folder: 'mud-textures',   rarity: 'common' },
  { name: 'silt-spray',      folder: 'mud-textures',   rarity: 'common' },
  { name: 'mud-armor',       folder: 'mud-textures',   rarity: 'rare' },
  { name: 'dried-riverbed',  folder: 'mud-textures',   rarity: 'common' },
  { name: 'volcanic-silt',   folder: 'mud-textures',   rarity: 'epic' },
];

const PLANTS = [
  { name: 'papyrus-reeds',   rarity: 'common' },
  { name: 'water-lilies',    rarity: 'common' },
  { name: 'elephant-grass',  rarity: 'common' },
  { name: 'lotus-crown',     rarity: 'epic' },
  { name: 'mangrove-roots',  rarity: 'uncommon' },
];

const EFFECTS = [
  { name: 'water-splash',      rarity: 'common' },
  { name: 'diving-wake',       rarity: 'uncommon' },
  { name: 'swimming-bubbles',  rarity: 'common' },
  { name: 'rapid-foam',        rarity: 'common' },
  { name: 'glowing-current',   rarity: 'legendary' },
];

// ─── Rarity weights ────────────────────────────────────────────────────────────
const RARITY_WEIGHT = {
  legendary: 1,
  epic:      5,
  rare:     12,
  uncommon: 25,
  common:   57,
};

function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + (RARITY_WEIGHT[item.rarity] || 50), 0);
  let rand = Math.random() * totalWeight;
  for (const item of items) {
    rand -= (RARITY_WEIGHT[item.rarity] || 50);
    if (rand <= 0) return item;
  }
  return items[items.length - 1];
}

// ─── Paths ─────────────────────────────────────────────────────────────────────
const BASE_DIR     = path.dirname(__filename);
const CREATURES_DIR = path.join(BASE_DIR, 'creatures');
const TRAITS_DIR    = path.join(BASE_DIR, 'traits');
const OUTPUT_DIR    = path.join(BASE_DIR, 'generated');

function svgPath(type, name, subfolder) {
  if (type === 'creature') return path.join(CREATURES_DIR, `${name}.svg`);
  return path.join(TRAITS_DIR, subfolder, `${name}.svg`);
}

function readSvgContent(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠  Missing SVG: ${filePath}`);
    return '<!-- missing -->';
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  // Strip outer <svg> wrapper, keep inner content
  return raw
    .replace(/<\?xml[^>]*\?>\s*/gi, '')
    .replace(/<!--[^-].*?-->\s*/gis, '')  // strip top-level comments to reduce size
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .trim();
}

// ─── Combine layers into one SVG ───────────────────────────────────────────────
function combineSVG({ creature, bg, plant, effect, index }) {
  const layers = [
    { path: svgPath('bg',       bg.name,     bg.folder),     label: `bg:${bg.name}` },
    { path: svgPath('plant',    plant.name,  'river-plants'), label: `plant:${plant.name}` },
    { path: svgPath('creature', creature,    null),           label: `creature:${creature}` },
    { path: svgPath('effect',   effect.name, 'flow-effects'), label: `effect:${effect.name}` },
  ];

  const parts = layers.map(l => `  <!-- ${l.label} -->\n  <g>${readSvgContent(l.path)}</g>`);

  const meta = JSON.stringify({
    name:       `River Spirit #${String(index).padStart(4, '0')}`,
    creature,
    background: bg.name,
    plant:      plant.name,
    effect:     effect.name,
    rarity:     overallRarity(bg.rarity, plant.rarity, effect.rarity),
    collection: 'River Spirits #5',
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"
  data-meta='${meta}'>
${parts.join('\n')}
</svg>`;
}

function overallRarity(...rarities) {
  const order = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
  return rarities.reduce((best, r) => order.indexOf(r) < order.indexOf(best) ? r : best, 'common');
}

// ─── CLI parsing ───────────────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { count: 200 };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--count':    opts.count    = parseInt(args[++i], 10); break;
      case '--creature': opts.creature = args[++i]; break;
      case '--bg':       opts.bg       = args[++i]; break;
      case '--plant':    opts.plant    = args[++i]; break;
      case '--effect':   opts.effect   = args[++i]; break;
      case '--out':      opts.out      = args[++i]; break;
      case '--preview':  opts.preview  = true;       break;
      case '--list':     opts.list     = true;       break;
    }
  }
  return opts;
}

// ─── Main ──────────────────────────────────────────────────────────────────────
function main() {
  const opts = parseArgs();

  if (opts.list) {
    console.log('\n🐊 River Spirits #5 — Trait Catalogue\n');
    console.log('Creatures:',   CREATURES.join(', '));
    console.log('Backgrounds:', BACKGROUNDS.map(b => `${b.name} (${b.rarity})`).join(', '));
    console.log('Plants:',      PLANTS.map(p => `${p.name} (${p.rarity})`).join(', '));
    console.log('Effects:',     EFFECTS.map(e => `${e.name} (${e.rarity})`).join(', '));
    return;
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Single specific combination
  if (opts.creature || opts.bg || opts.plant || opts.effect) {
    const creature = opts.creature || CREATURES[0];
    const bg       = BACKGROUNDS.find(b => b.name === opts.bg)  || BACKGROUNDS[0];
    const plant    = PLANTS.find(p => p.name === opts.plant)     || PLANTS[0];
    const effect   = EFFECTS.find(e => e.name === opts.effect)   || EFFECTS[0];
    const outPath  = opts.out || path.join(OUTPUT_DIR, `river-spirit-custom.svg`);

    const svg = combineSVG({ creature, bg, plant, effect, index: 'custom' });
    fs.writeFileSync(outPath, svg, 'utf8');
    console.log(`✅ Generated: ${outPath}`);

    if (opts.preview) {
      // Write a simple HTML preview
      const htmlPath = outPath.replace('.svg', '-preview.html');
      fs.writeFileSync(htmlPath,
        `<!DOCTYPE html><html><body style="background:#1a1a2e;display:flex;justify-content:center;padding:40px">
        <img src="${path.basename(outPath)}" width="400" height="400" style="border-radius:16px;box-shadow:0 0 40px #3A9EC8"/>
        </body></html>`
      );
      console.log(`🌊 Preview: ${htmlPath}`);
    }
    return;
  }

  // Batch generation
  const count = opts.count;
  console.log(`\n🌊 Generating ${count} River Spirits...\n`);

  const stats = { legendary: 0, epic: 0, rare: 0, uncommon: 0, common: 0 };

  for (let i = 1; i <= count; i++) {
    const creature = CREATURES[Math.floor(Math.random() * CREATURES.length)];
    const bg       = weightedRandom(BACKGROUNDS);
    const plant    = weightedRandom(PLANTS);
    const effect   = weightedRandom(EFFECTS);
    const rarity   = overallRarity(bg.rarity, plant.rarity, effect.rarity);

    stats[rarity] = (stats[rarity] || 0) + 1;

    const svg     = combineSVG({ creature, bg, plant, effect, index: i });
    const outFile = path.join(OUTPUT_DIR, `river-spirit-${String(i).padStart(4, '0')}.svg`);
    fs.writeFileSync(outFile, svg, 'utf8');

    if (i % 50 === 0 || i === count) {
      process.stdout.write(`  ${i}/${count} generated\r`);
    }
  }

  console.log(`\n\n✅ Done! ${count} NFTs in ${OUTPUT_DIR}/`);
  console.log('\n📊 Rarity distribution:');
  for (const [tier, n] of Object.entries(stats)) {
    const pct = ((n / count) * 100).toFixed(1);
    console.log(`  ${tier.padEnd(10)} ${n.toString().padStart(4)}  (${pct}%)`);
  }
}

main();
