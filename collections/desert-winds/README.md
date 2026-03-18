# 🌵 Desert Winds — Collection #4

> *"Where the sand speaks and the wind remembers."*

North African desert NFT collection. 5 base creatures × layered trait system.  
Theme: sand golds · rust reds · sky blues · Egyptian motifs.

---

## Folder Structure

```
desert-winds/
├── creatures/              # 5 base creature SVGs
│   ├── fennec-fox.svg      # Large-eared desert fox
│   ├── meerkat.svg         # Upright sentinel pose
│   ├── dromedary.svg       # Single-hump camel
│   ├── desert-eagle.svg    # Golden eagle, wings spread
│   └── horned-viper.svg    # Coiled Saharan viper with horns
│
├── traits/
│   ├── patterns/           # Background / body patterns (4 traits)
│   │   ├── rippled-sand.svg
│   │   ├── dune-shadows.svg
│   │   ├── berber-geometric.svg
│   │   ├── cracked-earth.svg
│   │   └── starry-night.svg
│   │
│   ├── gear/               # Wearable items (7 traits)
│   │   ├── desert-turban.svg       # Tuareg tagelmust veil
│   │   ├── desert-goggles.svg      # Sand-protection goggles
│   │   ├── ornate-collar.svg       # Gold & turquoise collar
│   │   ├── saddlebag.svg           # Nomad twin saddlebags
│   │   ├── water-gourd.svg         # Desert canteen
│   │   ├── warrior-shield.svg      # Berber sun shield (rare)
│   │   └── pharaoh-headdress.svg   # Nemes headdress (ultra-rare)
│   │
│   ├── sun-motifs/         # Solar / celestial overlays (6 traits)
│   │   ├── desert-sunrise.svg
│   │   ├── blazing-sun-halo.svg
│   │   ├── sunbeam-aura.svg
│   │   ├── ra-eye-emblem.svg
│   │   ├── solar-ankh.svg
│   │   └── sun-scarab.svg
│   │
│   └── wind-effects/       # Atmospheric wind/sand effects (6 traits)
│       ├── wind-streaks.svg
│       ├── sandstorm-swirl.svg
│       ├── drifting-sand-veil.svg
│       ├── sand-splash.svg
│       ├── mirage-shimmer.svg
│       └── whirlwind-vortex.svg
│
├── scripts/
│   └── generate.cjs         # NFT combination generator
│
├── generated/              # Output SVGs (created by generator)
└── metadata/               # Output JSON metadata (created by generator)
```

---

## Layer Composition Order

```
z=0   Background pattern (always present)
z=10  Base creature (always present)
z=20  Atmospheric effects / gear / sun-motifs (optional)
```

Layers are composited by wrapping each SVG's inner content in a `<g>` group
and stacking them inside a single 400×400 SVG canvas.

---

## Trait Rarity System

### Creatures
| Creature       | Rarity |
|---------------|--------|
| Fennec Fox     | 25%    |
| Meerkat        | 20%    |
| Dromedary      | 20%    |
| Horned Viper   | 20%    |
| Desert Eagle   | 15%    |

### Backgrounds (Patterns) — always applied
| Trait           | Rarity |
|----------------|--------|
| Rippled Sand    | 30%    |
| Dune Shadows    | 25%    |
| Berber Geometric| 20%    |
| Cracked Earth   | 15%    |
| Starry Night    | 10%    |

### Atmosphere (Wind Effects) — 75% chance
| Trait              | Rarity |
|-------------------|--------|
| Wind Streaks       | 30%    |
| Sandstorm Swirl    | 20%    |
| Drifting Sand Veil | 20%    |
| Sand Splash        | 15%    |
| Mirage Shimmer     | 10%    |
| Whirlwind Vortex   | 5%     |

### Sun Motifs — 60% chance
| Trait           | Rarity |
|----------------|--------|
| Desert Sunrise  | 30%    |
| Blazing Sun Halo| 25%    |
| Sunbeam Aura    | 20%    |
| Ra Eye Emblem   | 15%    |
| Solar Ankh      | 7%     |
| Sun Scarab      | 3%     |

### Gear — 70% chance
| Trait              | Rarity |
|-------------------|--------|
| Desert Turban      | 25%    |
| Desert Goggles     | 22%    |
| Ornate Collar      | 20%    |
| Saddlebag          | 18%    |
| Water Gourd        | 10%    |
| Warrior Shield     | 3%     |
| Pharaoh Headdress  | 2%     |

---

## Generator Usage

```bash
# Preview 10 random combos (no files written)
node scripts/generate.cjs --count=10 --dry-run --preview

# Generate 100 NFTs starting from token #1
node scripts/generate.cjs --count=100 --start=1

# Generate tokens #1000-1049
node scripts/generate.cjs --count=50 --start=1000

# Options
#   --count=N      Number of tokens to generate (default: 10)
#   --start=N      Starting token ID (default: 1)
#   --dry-run      Print trait combos without writing files
#   --preview      Show detailed trait breakdown for first token
```

Output files:
- `generated/<id>.svg` — Composed SVG artwork
- `metadata/<id>.json` — ERC-721 compatible metadata

---

## Combination Potential

```
5 creatures
× 5 background patterns
× 7 atmosphere options (6 traits + none)
× 7 sun motifs (6 traits + none)
× 8 gear items (7 traits + none)
= 9,800 unique combinations
```

---

## Color Palette

| Role         | Color     | Hex       |
|-------------|-----------|-----------|
| Sand Gold    | 🟡        | `#D4A840` |
| Warm Sand    | 🟡        | `#E8C870` |
| Rust Red     | 🟠        | `#C85820` |
| Desert Brown | 🟤        | `#A07020` |
| Sky Blue     | 🔵        | `#87CEEB` |
| Turquoise    | 🩵        | `#3AB8C8` |
| Deep Night   | 🟣        | `#1A2A5A` |
| Tuareg Blue  | 🔵        | `#1A4A7A` |

---

## Metadata Schema

```json
{
  "name": "Desert Winds #1",
  "description": "...",
  "image": "ipfs://<CID>/1.svg",
  "attributes": [
    { "trait_type": "Creature",    "value": "Fennec Fox"   },
    { "trait_type": "background",  "value": "Dune Shadows" },
    { "trait_type": "atmosphere",  "value": "Wind Streaks" },
    { "trait_type": "sun-motif",   "value": "Solar Ankh"   },
    { "trait_type": "gear",        "value": "Desert Turban"}
  ],
  "collection": {
    "name": "Desert Winds",
    "family": "Chamafi"
  }
}
```

---

*Collection #4 in the Chamafi series. Previous: Claude Safari (#1), GLM Jungle (#2), Kimi Tribe (#3).*
