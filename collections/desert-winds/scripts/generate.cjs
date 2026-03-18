#!/usr/bin/env node
/**
 * Desert Winds Collection #4 - NFT Generator
 * Combines base creatures with trait SVGs to create unique desert NFTs
 * North African desert theme: sand golds, rust reds, sky blues
 */

const fs = require('fs');
const path = require('path');

// ─── Config ────────────────────────────────────────────────────────────────

const COLLECTION_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR     = path.join(COLLECTION_DIR, 'generated');
const METADATA_DIR   = path.join(COLLECTION_DIR, 'metadata');

const CREATURES = [
  { id: 'fennec-fox',    name: 'Fennec Fox',     rarity: 0.25 },
  { id: 'meerkat',       name: 'Meerkat',        rarity: 0.20 },
  { id: 'dromedary',     name: 'Dromedary',      rarity: 0.20 },
  { id: 'desert-eagle',  name: 'Desert Eagle',   rarity: 0.15 },
  { id: 'horned-viper',  name: 'Horned Viper',   rarity: 0.20 },
];

const TRAIT_LAYERS = [
  {
    layer:    'background',
    folder:   'traits/patterns',
    required: true,
    traits: [
      { id: 'rippled-sand',    name: 'Rippled Sand',    rarity: 0.30 },
      { id: 'dune-shadows',    name: 'Dune Shadows',    rarity: 0.25 },
      { id: 'berber-geometric',name: 'Berber Geometric',rarity: 0.20 },
      { id: 'cracked-earth',   name: 'Cracked Earth',   rarity: 0.15 },
      { id: 'starry-night',    name: 'Starry Night',    rarity: 0.10 },
    ],
  },
  {
    layer:    'atmosphere',
    folder:   'traits/wind-effects',
    required: false,
    chanceOf: 0.75,
    traits: [
      { id: 'wind-streaks',       name: 'Wind Streaks',        rarity: 0.30 },
      { id: 'sandstorm-swirl',    name: 'Sandstorm Swirl',     rarity: 0.20 },
      { id: 'drifting-sand-veil', name: 'Drifting Sand Veil',  rarity: 0.20 },
      { id: 'sand-splash',        name: 'Sand Splash',         rarity: 0.15 },
      { id: 'mirage-shimmer',     name: 'Mirage Shimmer',      rarity: 0.10 },
      { id: 'whirlwind-vortex',   name: 'Whirlwind Vortex',    rarity: 0.05 },
    ],
  },
  {
    layer:    'sun-motif',
    folder:   'traits/sun-motifs',
    required: false,
    chanceOf: 0.60,
    traits: [
      { id: 'desert-sunrise',  name: 'Desert Sunrise',  rarity: 0.30 },
      { id: 'blazing-sun-halo',name: 'Blazing Sun Halo',rarity: 0.25 },
      { id: 'sunbeam-aura',    name: 'Sunbeam Aura',    rarity: 0.20 },
      { id: 'ra-eye-emblem',   name: 'Ra Eye Emblem',   rarity: 0.15 },
      { id: 'solar-ankh',      name: 'Solar Ankh',      rarity: 0.07 },
      { id: 'sun-scarab',      name: 'Sun Scarab',      rarity: 0.03 },
    ],
  },
  {
    layer:    'gear',
    folder:   'traits/gear',
    required: false,
    chanceOf: 0.70,
    traits: [
      { id: 'desert-turban',    name: 'Desert Turban',    rarity: 0.25 },
      { id: 'desert-goggles',   name: 'Desert Goggles',   rarity: 0.22 },
      { id: 'ornate-collar',    name: 'Ornate Collar',    rarity: 0.20 },
      { id: 'saddlebag',        name: 'Saddlebag',        rarity: 0.18 },
      { id: 'water-gourd',      name: 'Water Gourd',      rarity: 0.10 },
      { id: 'warrior-shield',   name: 'Warrior Shield',   rarity: 0.03 },
      { id: 'pharaoh-headdress',name: 'Pharaoh Headdress',rarity: 0.02 },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Seeded pseudo-random (LCG) for reproducible results */
function seededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/** Weighted pick from array of {id, rarity} objects */
function weightedPick(rng, items) {
  const total = items.reduce((sum, t) => sum + t.rarity, 0);
  let r = rng() * total;
  for (const item of items) {
    r -= item.rarity;
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

/** Read SVG file and extract inner content (strip outer <svg> wrapper) */
function readSvgContent(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  // Extract body between first <svg ...> and last </svg>
  const bodyMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  return bodyMatch ? bodyMatch[1] : content;
}

// ─── Generator ─────────────────────────────────────────────────────────────

function generateNFT(tokenId, seed) {
  const rng = seededRng(seed || tokenId * 7919 + 12345);
  const attributes = [];
  const layers = [];

  // 1. Pick base creature
  const creature = weightedPick(rng, CREATURES);
  attributes.push({ trait_type: 'Creature', value: creature.name });

  const creaturePath = path.join(COLLECTION_DIR, 'creatures', `${creature.id}.svg`);
  const creatureContent = readSvgContent(creaturePath);
  if (creatureContent) {
    layers.push({ z: 10, content: creatureContent, label: creature.name });
  }

  // 2. Apply trait layers
  for (const layer of TRAIT_LAYERS) {
    if (!layer.required && rng() > (layer.chanceOf || 0.5)) {
      attributes.push({ trait_type: layer.layer, value: 'None' });
      continue;
    }
    const trait = weightedPick(rng, layer.traits);
    attributes.push({ trait_type: layer.layer, value: trait.name });

    const traitPath = path.join(COLLECTION_DIR, layer.folder, `${trait.id}.svg`);
    const traitContent = readSvgContent(traitPath);
    if (traitContent) {
      layers.push({ z: layer.layer === 'background' ? 0 : 20, content: traitContent, label: trait.name });
    }
  }

  // 3. Compose SVG (background layers first, then creature, then overlays)
  layers.sort((a, b) => a.z - b.z);

  const composed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <!-- Desert Winds Collection #4 — Token #${tokenId} -->
  <!-- Seed: ${seed || tokenId * 7919 + 12345} -->
${layers.map(l => `  <!-- Layer: ${l.label} -->\n  <g>${l.content}</g>`).join('\n')}
</svg>`;

  return { tokenId, attributes, composed };
}

function generateMetadata(tokenId, attributes, collectionName = 'Desert Winds') {
  return {
    name: `${collectionName} #${tokenId}`,
    description: 'A unique desert creature from the windswept dunes of North Africa. Each NFT is a one-of-a-kind combination of base creature and layered traits.',
    image: `ipfs://<CID>/${tokenId}.svg`,
    attributes,
    collection: {
      name: collectionName,
      family: 'Chamafi',
    },
  };
}

// ─── CLI Entry ─────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const count  = parseInt(args.find(a => a.startsWith('--count='))?.split('=')[1]  || '10', 10);
  const start  = parseInt(args.find(a => a.startsWith('--start='))?.split('=')[1]  || '1',  10);
  const dryRun = args.includes('--dry-run');
  const preview= args.includes('--preview');

  if (!dryRun) {
    fs.mkdirSync(OUTPUT_DIR,   { recursive: true });
    fs.mkdirSync(METADATA_DIR, { recursive: true });
  }

  console.log(`\n🌵 Desert Winds Collection #4 Generator`);
  console.log(`   Generating tokens ${start} → ${start + count - 1}${dryRun ? ' (DRY RUN)' : ''}\n`);

  const summary = [];

  for (let i = 0; i < count; i++) {
    const tokenId = start + i;
    const { attributes, composed } = generateNFT(tokenId);
    const metadata = generateMetadata(tokenId, attributes);

    if (!dryRun) {
      fs.writeFileSync(path.join(OUTPUT_DIR,   `${tokenId}.svg`),  composed);
      fs.writeFileSync(path.join(METADATA_DIR, `${tokenId}.json`), JSON.stringify(metadata, null, 2));
    }

    const traitSummary = attributes.map(a => `${a.trait_type}=${a.value}`).join(', ');
    console.log(`  #${String(tokenId).padEnd(4)} ${traitSummary}`);
    summary.push({ tokenId, attributes });
  }

  console.log(`\n✅ Done. ${count} tokens generated.`);
  if (!dryRun) {
    console.log(`   SVGs     → ${OUTPUT_DIR}`);
    console.log(`   Metadata → ${METADATA_DIR}`);
  }

  if (preview && summary.length > 0) {
    const first = summary[0];
    console.log(`\n📋 Preview #${first.tokenId}:`);
    first.attributes.forEach(a => console.log(`   ${a.trait_type.padEnd(12)} → ${a.value}`));
  }
}

main();
