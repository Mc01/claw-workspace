# River Spirits — Collection #5

**Theme:** Nile / Congo River Basin  
**Palette:** Water blues (#1A6EA0, #3A9EC8, #7AD0F0), muddy browns (#6B5A3E, #8B7355), reed greens (#4A6741, #6B8A3A)

---

## Folder Structure

```
river-spirits/
├── creatures/              # 5 base animal SVGs
│   ├── hippo.svg
│   ├── crocodile.svg
│   ├── water-buffalo.svg
│   ├── river-otter.svg
│   └── kingfisher.svg
├── traits/
│   ├── water-patterns/     # 5 water surface/flow traits
│   │   ├── nile-ripples.svg
│   │   ├── congo-currents.svg
│   │   ├── flood-surge.svg
│   │   ├── still-pool.svg
│   │   └── river-mist.svg
│   ├── river-plants/       # 5 plant/vegetation traits
│   │   ├── papyrus-reeds.svg
│   │   ├── water-lilies.svg
│   │   ├── elephant-grass.svg
│   │   ├── lotus-crown.svg
│   │   └── mangrove-roots.svg
│   ├── flow-effects/       # 5 dynamic water effects
│   │   ├── water-splash.svg
│   │   ├── diving-wake.svg
│   │   ├── swimming-bubbles.svg
│   │   ├── rapid-foam.svg
│   │   └── glowing-current.svg
│   └── mud-textures/       # 6 mud/earth textures
│       ├── nile-mud.svg
│       ├── clay-coating.svg
│       ├── silt-spray.svg
│       ├── mud-armor.svg
│       ├── dried-riverbed.svg
│       └── volcanic-silt.svg
├── generated/              # Output folder for combined NFTs
├── generator.js            # Combination script
└── README.md
```

---

## Trait Counts

| Category       | Count |
|----------------|-------|
| Creatures      | 5     |
| Water Patterns | 5     |
| River Plants   | 5     |
| Flow Effects   | 5     |
| Mud Textures   | 6     |
| **Total SVGs** | **26**|

---

## Combination Guide

Each River Spirit NFT is composed of **layers stacked in order**:

```
Layer 1 (bottom): mud-texture OR water-pattern  (background/ground)
Layer 2:          water-pattern OR river-plant   (environment)
Layer 3:          base creature                  (subject)
Layer 4 (top):    flow-effect OR river-plant     (foreground/overlay)
```

### Valid Combinations (examples)

| Creature      | Background      | Plant           | Effect           |
|---------------|-----------------|-----------------|------------------|
| Hippo         | nile-mud        | papyrus-reeds   | water-splash     |
| Hippo         | still-pool      | water-lilies    | swimming-bubbles |
| Crocodile     | congo-currents  | elephant-grass  | diving-wake      |
| Crocodile     | flood-surge     | mangrove-roots  | rapid-foam       |
| Water Buffalo | dried-riverbed  | elephant-grass  | river-mist       |
| Water Buffalo | nile-mud        | papyrus-reeds   | glowing-current  |
| River Otter   | still-pool      | water-lilies    | swimming-bubbles |
| River Otter   | congo-currents  | lotus-crown     | water-splash     |
| Kingfisher    | river-mist      | mangrove-roots  | glowing-current  |
| Kingfisher    | still-pool      | lotus-crown     | diving-wake      |

### Rarity Tiers

| Trait               | Rarity      | Notes                                    |
|---------------------|-------------|------------------------------------------|
| glowing-current     | Legendary   | Bioluminescent spirits — rarest effect   |
| lotus-crown         | Epic        | Crown placement, complex floral detail   |
| volcanic-silt       | Epic        | Congo volcano origin — dark shimmer      |
| river-mist          | Rare        | Morning fog atmosphere                   |
| mud-armor           | Rare        | Full protective plating                  |
| flood-surge         | Rare        | Annual Nile flood event                  |
| diving-wake         | Uncommon    | Active diving behavior                   |
| mangrove-roots      | Uncommon    | Delta habitat                            |
| All others          | Common      | Standard traits                          |

---

## Generator Usage

```bash
# Install dependency
npm install sharp  # or use svg-combiner

# Generate all combinations (default: random 200 NFTs)
node generator.js

# Generate specific count
node generator.js --count 500

# Generate single specific combination
node generator.js --creature hippo --bg nile-mud --plant papyrus-reeds --effect water-splash --out generated/hippo-001.svg

# Preview a combination in browser
node generator.js --preview --creature crocodile --bg congo-currents --plant elephant-grass --effect diving-wake
```

Output files are saved to `generated/` as `river-spirit-NNNN.svg`.

---

## SVG Combining (Manual)

Each SVG uses `viewBox="0 0 400 400"`. To combine manually:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <!-- Layer 1: Background texture -->
  <image href="traits/mud-textures/nile-mud.svg" width="400" height="400"/>
  <!-- Layer 2: Environment -->
  <image href="traits/river-plants/papyrus-reeds.svg" width="400" height="400"/>
  <!-- Layer 3: Creature -->
  <image href="creatures/hippo.svg" width="400" height="400"/>
  <!-- Layer 4: Effect overlay -->
  <image href="traits/flow-effects/water-splash.svg" width="400" height="400"/>
</svg>
```

---

## Metadata Template (ERC-721)

```json
{
  "name": "River Spirit #001",
  "description": "A spirit of the ancient Nile and Congo rivers.",
  "image": "ipfs://<CID>/river-spirit-001.svg",
  "attributes": [
    { "trait_type": "Creature",      "value": "Hippo" },
    { "trait_type": "Background",    "value": "Nile Mud" },
    { "trait_type": "Plant",         "value": "Papyrus Reeds" },
    { "trait_type": "Effect",        "value": "Water Splash" },
    { "trait_type": "Collection",    "value": "River Spirits #5" },
    { "trait_type": "Rarity",        "value": "Common" }
  ]
}
```

---

## Color Palette Reference

| Name            | Hex       | Usage                        |
|-----------------|-----------|------------------------------|
| Nile Blue       | `#1A6EA0` | Water, rivers, pools         |
| Congo Current   | `#3A9EC8` | Flow lines, ripples          |
| Sky Shimmer     | `#7AD0F0` | Highlights, splashes         |
| Muddy Brown     | `#6B5A3E` | Earth, silt, shores          |
| Dark Silt       | `#3A2818` | Deep mud, shadows            |
| Red Clay        | `#A85C28` | Congo clay coating           |
| Reed Green      | `#4A6741` | Crocodile scales, plants     |
| Papyrus Green   | `#6B8A3A` | Reeds, grass, lily pads      |
| Lotus Pink      | `#F8C0E0` | Lotus flowers                |
| Lotus Yellow    | `#F8D040` | Lotus stamen                 |
| Biolume Teal    | `#40E8C8` | Glowing current effect       |
