#!/usr/bin/env node
/**
 * African Safari Creature Generator (JavaScript/Node.js version)
 * Randomly combines base bodies with layered traits to create unique creatures.
 * 
 * Usage:
 *   node generate.js                    # 1 random creature
 *   node generate.js --count 10        # 10 random creatures
 *   node generate.js --count 5 --seed 42
 *   node generate.js --start-id 1 --count 100
 */

const fs   = require("fs");
const path = require("path");

// ── Trait catalog ──────────────────────────────────────────────────────────────

const BASES = {
  lion:     "bases/lion.svg",
  elephant: "bases/elephant.svg",
  giraffe:  "bases/giraffe.svg",
  zebra:    "bases/zebra.svg",
  rhino:    "bases/rhino.svg",
};

const TRAITS = {
  eyes: {
    "alert-amber":       "traits/eyes/alert-amber.svg",
    "sleepy-halfclosed": "traits/eyes/sleepy-halfclosed.svg",
    "wild-green":        "traits/eyes/wild-green.svg",
    "star-magic":        "traits/eyes/star-magic.svg",
    "fierce-orange":     "traits/eyes/fierce-orange.svg",
  },
  ears: {
    "rounded-tawny":     "traits/ears/rounded-tawny.svg",
    "pointed-alert":     "traits/ears/pointed-alert.svg",
    "elephant-fan":      "traits/ears/elephant-fan.svg",
    "small-rhino":       "traits/ears/small-rhino.svg",
    "giraffe-ossicone":  "traits/ears/giraffe-ossicone.svg",
  },
  horns: {
    "none":              null,
    "rhino-single":      "traits/horns/rhino-single.svg",
    "rhino-double":      "traits/horns/rhino-double.svg",
    "ossicones":         "traits/horns/ossicones.svg",
    "magic-spiral":      "traits/horns/magic-spiral.svg",
    "elephant-tusks":    "traits/horns/elephant-tusks.svg",
  },
  manes: {
    "none":              null,
    "lion-classic":      "traits/manes/lion-classic.svg",
    "mohawk-dark":       "traits/manes/mohawk-dark.svg",
    "fluffy-ruff":       "traits/manes/fluffy-ruff.svg",
    "sunset-mane":       "traits/manes/sunset-mane.svg",
    "zebra-stripe-mane": "traits/manes/zebra-stripe-mane.svg",
  },
  tails: {
    "lion-tuft":         "traits/tails/lion-tuft.svg",
    "zebra-fluffy":      "traits/tails/zebra-fluffy.svg",
    "giraffe-whip":      "traits/tails/giraffe-whip.svg",
    "elephant-tiny":     "traits/tails/elephant-tiny.svg",
    "rhino-stumpy":      "traits/tails/rhino-stumpy.svg",
  },
  patterns: {
    "none":              null,
    "savanna-spots":     "traits/patterns/savanna-spots.svg",
    "african-diamonds":  "traits/patterns/african-diamonds.svg",
    "kente-stripes":     "traits/patterns/kente-stripes.svg",
    "tribal-triangles":  "traits/patterns/tribal-triangles.svg",
    "mudcloth-zigzag":   "traits/patterns/mudcloth-zigzag.svg",
  },
  accessories: {
    "none":              null,
    "beaded-necklace":   "traits/accessories/beaded-necklace.svg",
    "safari-hat":        "traits/accessories/safari-hat.svg",
    "maasai-shield":     "traits/accessories/maasai-shield.svg",
    "royal-crown":       "traits/accessories/royal-crown.svg",
    "cool-shades":       "traits/accessories/cool-shades.svg",
  },
};

const RARITY_WEIGHTS = {
  none:                40,
  "lion-classic":      20,
  "mohawk-dark":       15,
  "fluffy-ruff":       15,
  "sunset-mane":        7,
  "zebra-stripe-mane":  3,
  "star-magic":         5,
  "fierce-orange":     10,
  "wild-green":        15,
  "alert-amber":       35,
  "sleepy-halfclosed": 35,
  "royal-crown":        5,
  "magic-spiral":       5,
  "maasai-shield":     10,
};

const POSITIONS = {
  lion:     { eyes:[160,125,80,40], ears:[140,82,120,80],  horns:[170,55,60,80],  manes:[100,58,200,200], tails:[305,175,80,120], patterns:[90,175,220,170], accessories:[120,85,160,80] },
  elephant: { eyes:[148,128,80,40], ears:[88,100,160,110], horns:[148,170,120,60], manes:[100,70,200,200], tails:[300,180,80,120], patterns:[75,178,220,170], accessories:[120,88,160,80] },
  giraffe:  { eyes:[162,28,80,40],  ears:[120,6,120,80],   horns:[160,-8,80,70],   manes:[140,35,120,200], tails:[295,210,80,120], patterns:[95,202,220,170], accessories:[120,2,160,80] },
  zebra:    { eyes:[138,128,80,40], ears:[100,80,120,80],  horns:[170,65,60,80],  manes:[90,80,200,100],  tails:[295,175,80,120], patterns:[88,175,220,170], accessories:[120,88,160,80] },
  rhino:    { eyes:[123,138,80,40], ears:[85,100,120,60],  horns:[125,102,80,80], manes:[90,60,200,200],  tails:[300,178,80,120], patterns:[70,168,220,170], accessories:[120,80,160,80] },
};

const SAVANNA_PALETTES = [
  "golden-savanna", "dusk-earth", "termite-mound", "dry-grass",
  "red-ocher", "baobab-bark", "stone-grey", "night-sky",
  "flamingo-pink", "sahara-sand",
];

// ── Seeded RNG (Mulberry32) ───────────────────────────────────────────────────

function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

let rng = Math.random;

function weightedChoice(options) {
  const keys    = Object.keys(options);
  const weights = keys.map(k => RARITY_WEIGHTS[k] ?? 20);
  const total   = weights.reduce((a, b) => a + b, 0);
  let   r       = rng() * total;
  for (let i = 0; i < keys.length; i++) {
    r -= weights[i];
    if (r <= 0) return keys[i];
  }
  return keys[keys.length - 1];
}

function pickRandom(arr) {
  return arr[Math.floor(rng() * arr.length)];
}

// ── Rarity score ──────────────────────────────────────────────────────────────

function computeRarity(traits) {
  const keys = ["eyes","ears","horns","manes","tails","patterns","accessories"];
  const sum  = keys.reduce((a, k) => a + (RARITY_WEIGHTS[traits[k]] ?? 20), 0);
  return Math.round((sum / keys.length) * 10) / 10;
}

// ── SVG builder ───────────────────────────────────────────────────────────────

function buildSVG(traits, collectionRoot) {
  const baseName  = traits.base;
  const basePath  = path.join(collectionRoot, BASES[baseName]);
  const positions = POSITIONS[baseName];
  const baseData  = fs.readFileSync(basePath);
  const baseB64   = baseData.toString("base64");

  const LAYER_ORDER = ["manes","patterns","tails","ears","horns","eyes","accessories"];
  const layers = [];

  for (const layer of LAYER_ORDER) {
    const traitName = traits[layer];
    if (!traitName || traitName === "none") continue;
    const traitRel  = TRAITS[layer][traitName];
    if (!traitRel) continue;
    const traitPath = path.join(collectionRoot, traitRel);
    if (!fs.existsSync(traitPath)) continue;

    const [x, y, w, h] = positions[layer];
    const svgData  = fs.readFileSync(traitPath);
    const b64      = svgData.toString("base64");
    layers.push(
      `  <image href="data:image/svg+xml;base64,${b64}" x="${x}" y="${y}" width="${w}" height="${h}" />`
    );
  }

  const now = new Date().toISOString();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <!-- African Safari Creature | Claude Safari Collection #1 -->
  <!-- Generated: ${now} -->
  <!-- Base: ${traits.base} | Rarity: ${traits.rarity_score} -->
  <image href="data:image/svg+xml;base64,${baseB64}" x="0" y="0" width="400" height="400" />
${layers.join("\n")}
</svg>`;
}

// ── Main generation ───────────────────────────────────────────────────────────

function generateCreature({ seed, tokenId, outputDir, collectionRoot }) {
  if (seed !== undefined && seed !== null) rng = mulberry32(seed);

  const traits = {
    base:        pickRandom(Object.keys(BASES)),
    eyes:        weightedChoice(TRAITS.eyes),
    ears:        weightedChoice(TRAITS.ears),
    horns:       weightedChoice(TRAITS.horns),
    manes:       weightedChoice(TRAITS.manes),
    tails:       weightedChoice(TRAITS.tails),
    patterns:    weightedChoice(TRAITS.patterns),
    accessories: weightedChoice(TRAITS.accessories),
    palette:     pickRandom(SAVANNA_PALETTES),
    seed,
  };
  traits.rarity_score = computeRarity(traits);

  const svg = buildSVG(traits, collectionRoot);
  const tid  = String(tokenId).padStart(5, "0");
  const filename = `creature-${tid}-${traits.base}.svg`;

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, filename), svg);

  const metadata = {
    token_id:     tokenId,
    name:         `Safari #${tid}`,
    description:  `A ${traits.base} from the Claude Safari Collection #1`,
    image:        filename,
    seed,
    rarity_score: traits.rarity_score,
    attributes: [
      { trait_type: "Base",         value: traits.base },
      { trait_type: "Eyes",         value: traits.eyes },
      { trait_type: "Ears",         value: traits.ears },
      { trait_type: "Horns",        value: traits.horns },
      { trait_type: "Mane",         value: traits.manes },
      { trait_type: "Tail",         value: traits.tails },
      { trait_type: "Pattern",      value: traits.patterns },
      { trait_type: "Accessory",    value: traits.accessories },
      { trait_type: "Palette",      value: traits.palette },
      { trait_type: "Rarity Score", value: traits.rarity_score, display_type: "number" },
    ],
  };

  fs.writeFileSync(
    path.join(outputDir, `creature-${tid}.json`),
    JSON.stringify(metadata, null, 2)
  );

  console.log(`✅  #${tid}  ${traits.base.padEnd(10)}  rarity=${String(traits.rarity_score).padStart(5)}  → ${filename}`);
  return metadata;
}

// ── CLI ───────────────────────────────────────────────────────────────────────

function parseArgs() {
  const args   = process.argv.slice(2);
  const opts   = { count: 1, seed: null, startId: 1, output: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--count"    || args[i] === "-n") opts.count    = parseInt(args[++i]);
    if (args[i] === "--seed"     || args[i] === "-s") opts.seed     = parseInt(args[++i]);
    if (args[i] === "--start-id" || args[i] === "-i") opts.startId  = parseInt(args[++i]);
    if (args[i] === "--output"   || args[i] === "-o") opts.output   = args[++i];
  }
  return opts;
}

const opts           = parseArgs();
const collectionRoot = path.join(__dirname, "..");
const outputDir      = opts.output ? path.resolve(opts.output) : path.join(collectionRoot, "generated");

console.log(`\n🦁  Claude Safari Collection #1 — Generator`);
console.log(`    Generating ${opts.count} creature(s)...\n`);

const results = [];
for (let i = 0; i < opts.count; i++) {
  const seed    = opts.seed !== null ? opts.seed + i : null;
  const tokenId = opts.startId + i;
  const meta    = generateCreature({ seed, tokenId, outputDir, collectionRoot });
  results.push(meta);
}

console.log(`\n📁  Output: ${outputDir}`);
console.log(`🎨  ${opts.count} creature(s) generated.\n`);

if (results.length > 1) {
  const scores = results.map(r => r.rarity_score);
  console.log(`📊  Rarity summary:`);
  console.log(`    Min score (rarest):  ${Math.min(...scores)}`);
  console.log(`    Max score (common):  ${Math.max(...scores)}`);
  console.log(`    Avg score:           ${(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1)}`);
}
