# Pokemon Safari Collection

Pokemon-style African Safari creature collection — minimal vector sprites in side-profile view.

## Style
- **Inspiration:** Pokemon sprite simplicity — recognizable silhouette, minimal detail
- **View:** Side profile
- **Colors:** Flat, no gradients
- **Background:** White/light friendly

## Structure

```
pokemon-safari/
├── creatures/          # 5 base creatures
│   ├── lion.svg
│   ├── elephant.svg
│   ├── giraffe.svg
│   ├── zebra.svg
│   └── rhino.svg
├── traits/             # 15 composable traits
│   ├── eyes_normal.svg
│   ├── eyes_fierce.svg
│   ├── eyes_sleepy.svg
│   ├── ears_pointed.svg
│   ├── ears_round.svg
│   ├── ears_large.svg
│   ├── tail_tuft.svg
│   ├── tail_whip.svg
│   ├── tail_stripe.svg
│   ├── pattern_spots.svg
│   ├── pattern_stripes.svg
│   ├── pattern_plain.svg
│   ├── accessory_crown.svg
│   ├── accessory_necklace.svg
│   └── accessory_bandana.svg
├── collection.json     # Full metadata
└── README.md
```

## Creatures

| Name     | Base Color | Accent     | Key Features              |
|----------|-----------|------------|---------------------------|
| Lion     | #D4A017   | #8B4513    | Mane, tuft tail, predator  |
| Elephant | #808080   | #C0A0A0    | Trunk, tusks, large ears   |
| Giraffe  | #DAA520   | #8B4513    | Long neck, ossicones, spots|
| Zebra    | #F0F0F0   | #1a1a1a    | Stripes, mohawk mane        |
| Rhino    | #696969   | #3a3a3a    | Horn, armor folds, stubby  |

## Traits (15)

### Eyes (3)
- `eyes_normal` — Common: standard round eye
- `eyes_fierce` — Uncommon: angular with brow slash
- `eyes_sleepy` — Rare: half-lidded

### Ears (3)
- `ears_pointed` — Common: triangular, cat-like
- `ears_round` — Common: circular
- `ears_large` — Uncommon: elephant-style fan ear

### Tails (3)
- `tail_tuft` — Common: lion tuft
- `tail_whip` — Common: thin whip
- `tail_stripe` — Uncommon: striped with dark tip

### Patterns (3)
- `pattern_spots` — Uncommon: leopard spots
- `pattern_stripes` — Uncommon: zebra stripes
- `pattern_plain` — Common: subtle texture

### Accessories (3)
- `accessory_crown` — Legendary: gold crown with gems
- `accessory_necklace` — Rare: tribal bead necklace
- `accessory_bandana` — Uncommon: red polka-dot bandana
