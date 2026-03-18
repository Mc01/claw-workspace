# 🦁 Claude Safari — African Safari Creatures Collection #1

A modular, layered NFT creature collection inspired by African wildlife and traditional African art. Each creature is a unique combination of a base animal body and layerable trait SVGs — composited cleanly in vector format.

---

## 📁 Collection Structure

```
claude-safari/
├── bases/                    # 5 base creature bodies
│   ├── lion.svg
│   ├── elephant.svg
│   ├── giraffe.svg
│   ├── zebra.svg
│   └── rhino.svg
├── traits/
│   ├── eyes/                 # 5 eye styles
│   ├── ears/                 # 5 ear styles
│   ├── horns/                # 5 horn/tusk styles + none
│   ├── manes/                # 5 mane styles + none
│   ├── tails/                # 5 tail styles
│   ├── patterns/             # 5 body patterns + none
│   └── accessories/          # 5 accessories + none
├── generated/                # Output: generated creatures
├── scripts/
│   ├── generate.py           # Python generator
│   └── generate.cjs           # Node.js generator
└── README.md
```

---

## 🐾 Base Animals

| Name      | Colors                    | Style Notes                        |
|-----------|---------------------------|------------------------------------|
| **Lion**  | Golden tawny (#C8943A)    | Mane slot, tuft tail, round face   |
| **Elephant** | Slate grey (#7A8C8C)   | Fan ears, trunk, tusk slots        |
| **Giraffe** | Warm amber (#E8C06A)    | Long neck, patchwork spots, ossicones |
| **Zebra** | Black & white (#F0EDE0)   | Bold B&W stripes throughout        |
| **Rhino** | Earthy grey (#8A7868)     | Armor plating, horn slot, thick build |

---

## 🎨 Trait Catalog

### Eyes (5 variants)
| Trait              | Color/Style          | Rarity |
|--------------------|----------------------|--------|
| alert-amber        | Wide open, amber iris | Common |
| sleepy-halfclosed  | Droopy lid, brown     | Common |
| wild-green         | Large, vivid green    | Uncommon |
| fierce-orange      | Narrow slit, orange   | Uncommon |
| star-magic         | Gold star pupils      | Rare ⭐ |

### Ears (5 variants)
| Trait              | Style                          | Rarity |
|--------------------|--------------------------------|--------|
| rounded-tawny      | Small round, pink inner        | Common |
| pointed-alert      | Sharp triangular               | Common |
| elephant-fan       | Large fan-shaped with veins    | Uncommon |
| small-rhino        | Compact oval                   | Common |
| giraffe-ossicone   | Elongated with knob buds       | Uncommon |

### Horns (5 variants + none)
| Trait              | Style                          | Rarity |
|--------------------|--------------------------------|--------|
| none               | No horn                        | Common |
| rhino-single       | Single forward horn            | Common |
| rhino-double       | Double stacked horns           | Uncommon |
| ossicones          | Giraffe-style knobbed pair     | Uncommon |
| elephant-tusks     | Curved ivory tusk pair         | Uncommon |
| magic-spiral       | Spiraling unicorn-style horn   | Rare ⭐ |

### Manes (5 variants + none)
| Trait              | Style                          | Rarity |
|--------------------|--------------------------------|--------|
| none               | No mane                        | Common |
| lion-classic       | Full dark round mane           | Common |
| mohawk-dark        | Spiked ridge mohawk            | Uncommon |
| fluffy-ruff        | Neck collar ruff               | Uncommon |
| sunset-mane        | Gradient orange flame mane     | Rare ⭐ |
| zebra-stripe-mane  | B&W striped standing mane      | Rare ⭐⭐ |

### Tails (5 variants)
| Trait              | Style                          | Rarity |
|--------------------|--------------------------------|--------|
| lion-tuft          | Curved with dark tuft          | Common |
| zebra-fluffy       | Thin with fluffy B&W tip       | Common |
| giraffe-whip       | Long thin whip with tassel     | Uncommon |
| elephant-tiny      | Stubby with brush tip          | Common |
| rhino-stumpy       | Short thick with bristles      | Common |

### Patterns (5 variants + none)
| Trait              | Style                          | Rarity |
|--------------------|--------------------------------|--------|
| none               | Clean base color               | Common |
| savanna-spots      | Cheetah-like rosette spots     | Common |
| african-diamonds   | Geometric diamond tiling       | Uncommon |
| kente-stripes      | Kente cloth color bands        | Uncommon |
| tribal-triangles   | Adinkra-inspired triangles     | Uncommon |
| mudcloth-zigzag    | Bogolan mudcloth zigzag        | Uncommon |

### Accessories (5 variants + none)
| Trait              | Style                          | Rarity |
|--------------------|--------------------------------|--------|
| none               | No accessory                   | Common |
| beaded-necklace    | Pan-African beaded necklace    | Uncommon |
| safari-hat         | Pith helmet with badge         | Uncommon |
| maasai-shield      | Traditional warrior shield     | Uncommon |
| royal-crown        | Golden jeweled crown           | Rare ⭐ |
| cool-shades        | Green-tinted sunglasses        | Uncommon |

---

## 🎲 Generating Creatures

### Python
```bash
# Single creature
python scripts/generate.py

# 10 random creatures
python scripts/generate.py -n 10

# Deterministic batch (seeded)
python scripts/generate.py -n 5 --seed 42 --start-id 1

# Custom output dir
python scripts/generate.py -n 50 --output ./my-batch
```

### Node.js
```bash
# Single creature
node scripts/generate.cjs

# 10 random creatures
node scripts/generate.cjs --count 10

# Deterministic batch
node scripts/generate.cjs --count 5 --seed 42 --start-id 1

# Custom output dir
node scripts/generate.cjs --count 50 --output ./my-batch
```

---

## 📊 Rarity System

Each trait carries a **rarity weight** (higher = more common):

```
Common     weight 35–40  →  ~35–40% frequency
Uncommon   weight 10–20  →  ~10–20% frequency  
Rare       weight 5–7    →  ~5–7% frequency
Ultra-rare weight 3      →  ~3% frequency
```

The **Rarity Score** is the average weight across all 7 trait slots.  
Lower score = rarer creature (more collectible).

**Example combinations:**

| Combination                              | Approx. Rarity |
|------------------------------------------|---------------|
| zebra + zebra-stripe-mane + star-magic + magic-spiral | Ultra-rare 💎 |
| lion + sunset-mane + royal-crown         | Very Rare ⭐⭐⭐ |
| elephant + none/none/none + alert-amber  | Common 🌿     |

---

## 🎨 African Art Influences

This collection draws on:
- **Kente cloth** — Ghanaian strip-woven textile with gold/red/green bands
- **Bogolan (Mudcloth)** — Malian hand-painted geometric textiles  
- **Adinkra symbols** — Akan geometric patterns of wisdom
- **Maasai beadwork** — Kenyan/Tanzanian pan-African color traditions
- **Cave painting geometry** — Simplified angular animal forms
- **Savanna palette** — Ochre, sienna, terracotta, golden grass, deep sky

---

## 🖼️ SVG Compositing

Each trait SVG is a **transparent overlay** (400×400 viewport) designed to layer cleanly on any base. The generator embeds traits as `<image>` elements with `data:` URIs for fully self-contained output SVGs.

Layer order (bottom to top):
1. Base body
2. Mane (behind head)
3. Body pattern (overlay)
4. Tail
5. Ears
6. Horns
7. Eyes
8. Accessories

---

## 📋 Metadata Format (ERC-721 compatible)

```json
{
  "token_id": 42,
  "name": "Safari #00042",
  "description": "A lion from the Claude Safari Collection #1",
  "image": "creature-00042-lion.svg",
  "attributes": [
    { "trait_type": "Base",      "value": "lion" },
    { "trait_type": "Eyes",      "value": "fierce-orange" },
    { "trait_type": "Ears",      "value": "rounded-tawny" },
    { "trait_type": "Horns",     "value": "none" },
    { "trait_type": "Mane",      "value": "sunset-mane" },
    { "trait_type": "Tail",      "value": "lion-tuft" },
    { "trait_type": "Pattern",   "value": "tribal-triangles" },
    { "trait_type": "Accessory", "value": "royal-crown" },
    { "trait_type": "Palette",   "value": "golden-savanna" },
    { "trait_type": "Rarity Score", "value": 18.5, "display_type": "number" }
  ]
}
```

---

## 🔢 Collection Stats

- **Base animals**: 5
- **Eye variants**: 5
- **Ear variants**: 5  
- **Horn variants**: 6 (including none)
- **Mane variants**: 6 (including none)
- **Tail variants**: 5
- **Pattern variants**: 6 (including none)
- **Accessory variants**: 6 (including none)
- **Total unique combinations**: 5 × 5 × 5 × 6 × 6 × 5 × 6 × 6 = **324,000** unique creatures

---

*Claude Safari Collection #1 — African Safari Creatures*  
*Built with ❤️ and SVG*
