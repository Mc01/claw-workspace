#!/usr/bin/env python3
"""
African Safari Creature Generator
Randomly combines base bodies with layered traits to create unique creatures.
Uses SVG <use> and <image> elements for clean compositing.
"""

import random
import json
import os
import argparse
from pathlib import Path
from datetime import datetime


# ── Trait catalog ─────────────────────────────────────────────────────────────

BASES = {
    "lion":     "bases/lion.svg",
    "elephant": "bases/elephant.svg",
    "giraffe":  "bases/giraffe.svg",
    "zebra":    "bases/zebra.svg",
    "rhino":    "bases/rhino.svg",
}

TRAITS = {
    "eyes": {
        "alert-amber":      "traits/eyes/alert-amber.svg",
        "sleepy-halfclosed":"traits/eyes/sleepy-halfclosed.svg",
        "wild-green":       "traits/eyes/wild-green.svg",
        "star-magic":       "traits/eyes/star-magic.svg",
        "fierce-orange":    "traits/eyes/fierce-orange.svg",
    },
    "ears": {
        "rounded-tawny":    "traits/ears/rounded-tawny.svg",
        "pointed-alert":    "traits/ears/pointed-alert.svg",
        "elephant-fan":     "traits/ears/elephant-fan.svg",
        "small-rhino":      "traits/ears/small-rhino.svg",
        "giraffe-ossicone": "traits/ears/giraffe-ossicone.svg",
    },
    "horns": {
        "none":             None,
        "rhino-single":     "traits/horns/rhino-single.svg",
        "rhino-double":     "traits/horns/rhino-double.svg",
        "ossicones":        "traits/horns/ossicones.svg",
        "magic-spiral":     "traits/horns/magic-spiral.svg",
        "elephant-tusks":   "traits/horns/elephant-tusks.svg",
    },
    "manes": {
        "none":             None,
        "lion-classic":     "traits/manes/lion-classic.svg",
        "mohawk-dark":      "traits/manes/mohawk-dark.svg",
        "fluffy-ruff":      "traits/manes/fluffy-ruff.svg",
        "sunset-mane":      "traits/manes/sunset-mane.svg",
        "zebra-stripe-mane":"traits/manes/zebra-stripe-mane.svg",
    },
    "tails": {
        "lion-tuft":        "traits/tails/lion-tuft.svg",
        "zebra-fluffy":     "traits/tails/zebra-fluffy.svg",
        "giraffe-whip":     "traits/tails/giraffe-whip.svg",
        "elephant-tiny":    "traits/tails/elephant-tiny.svg",
        "rhino-stumpy":     "traits/tails/rhino-stumpy.svg",
    },
    "patterns": {
        "none":             None,
        "savanna-spots":    "traits/patterns/savanna-spots.svg",
        "african-diamonds": "traits/patterns/african-diamonds.svg",
        "kente-stripes":    "traits/patterns/kente-stripes.svg",
        "tribal-triangles": "traits/patterns/tribal-triangles.svg",
        "mudcloth-zigzag":  "traits/patterns/mudcloth-zigzag.svg",
    },
    "accessories": {
        "none":             None,
        "beaded-necklace":  "traits/accessories/beaded-necklace.svg",
        "safari-hat":       "traits/accessories/safari-hat.svg",
        "maasai-shield":    "traits/accessories/maasai-shield.svg",
        "royal-crown":      "traits/accessories/royal-crown.svg",
        "cool-shades":      "traits/accessories/cool-shades.svg",
    },
}

# Rarity weights (higher = more common)
RARITY_WEIGHTS = {
    "none":             40,
    "lion-classic":     20,
    "mohawk-dark":      15,
    "fluffy-ruff":      15,
    "sunset-mane":       7,
    "zebra-stripe-mane": 3,
    "star-magic":        5,
    "fierce-orange":    10,
    "wild-green":       15,
    "alert-amber":      35,
    "sleepy-halfclosed":35,
    "royal-crown":       5,
    "magic-spiral":      5,
    "maasai-shield":    10,
}

def get_weight(name: str) -> int:
    return RARITY_WEIGHTS.get(name, 20)


# ── SVG trait positioning (x, y, width, height) per base ─────────────────────

POSITIONS = {
    "lion": {
        "eyes":        (160, 125, 80, 40),
        "ears":        (140,  82, 120, 80),
        "horns":       (170,  55,  60, 80),
        "manes":       (100,  58, 200, 200),
        "tails":       (305, 175,  80, 120),
        "patterns":    ( 90, 175, 220, 170),
        "accessories": (120,  85, 160, 80),
    },
    "elephant": {
        "eyes":        (148, 128,  80, 40),
        "ears":        ( 88, 100, 160, 110),
        "horns":       (148, 170, 120, 60),
        "manes":       (100,  70, 200, 200),
        "tails":       (300, 180,  80, 120),
        "patterns":    ( 75, 178, 220, 170),
        "accessories": (120, 88, 160, 80),
    },
    "giraffe": {
        "eyes":        (162,  28,  80, 40),
        "ears":        (120,   6, 120, 80),
        "horns":       (160,  -8,  80, 70),
        "manes":       (140,  35, 120, 200),
        "tails":       (295, 210,  80, 120),
        "patterns":    ( 95, 202, 220, 170),
        "accessories": (120,   2, 160, 80),
    },
    "zebra": {
        "eyes":        (138, 128,  80, 40),
        "ears":        (100,  80, 120, 80),
        "horns":       (170,  65,  60, 80),
        "manes":       ( 90,  80, 200, 100),
        "tails":       (295, 175,  80, 120),
        "patterns":    ( 88, 175, 220, 170),
        "accessories": (120,  88, 160, 80),
    },
    "rhino": {
        "eyes":        (123, 138,  80, 40),
        "ears":        ( 85, 100, 120, 60),
        "horns":       (125, 102,  80, 80),
        "manes":       ( 90,  60, 200, 200),
        "tails":       (300, 178,  80, 120),
        "patterns":    ( 70, 168, 220, 170),
        "accessories": (120,  80, 160, 80),
    },
}


# ── Color palettes ─────────────────────────────────────────────────────────────

SAVANNA_PALETTES = {
    "golden-savanna":  "#E8C06A",
    "dusk-earth":      "#C8943A",
    "termite-mound":   "#D4AA80",
    "dry-grass":       "#C8B460",
    "red-ocher":       "#B85030",
    "baobab-bark":     "#8A7058",
    "stone-grey":      "#8A8C78",
    "night-sky":       "#2A3850",
    "flamingo-pink":   "#E890A0",
    "sahara-sand":     "#E8D8A8",
}


# ── Core generation logic ──────────────────────────────────────────────────────

def weighted_choice(options: dict) -> str:
    keys = list(options.keys())
    weights = [get_weight(k) for k in keys]
    return random.choices(keys, weights=weights, k=1)[0]


def roll_traits() -> dict:
    return {
        "base":        random.choice(list(BASES.keys())),
        "eyes":        weighted_choice(TRAITS["eyes"]),
        "ears":        weighted_choice(TRAITS["ears"]),
        "horns":       weighted_choice(TRAITS["horns"]),
        "manes":       weighted_choice(TRAITS["manes"]),
        "tails":       weighted_choice(TRAITS["tails"]),
        "patterns":    weighted_choice(TRAITS["patterns"]),
        "accessories": weighted_choice(TRAITS["accessories"]),
        "palette":     random.choice(list(SAVANNA_PALETTES.keys())),
    }


def compute_rarity_score(traits: dict) -> float:
    """Lower score = rarer (more collectible)."""
    score = 0
    for key, val in traits.items():
        if key in ("base", "palette"):
            continue
        score += get_weight(val)
    return round(score / 6, 1)


def build_svg(traits: dict, collection_root: Path) -> str:
    base_name  = traits["base"]
    base_path  = collection_root / BASES[base_name]
    positions  = POSITIONS[base_name]

    # Read base SVG content and strip xml declaration/outer svg wrapper for embedding
    base_content = base_path.read_text()

    layers = []
    layer_order = ["manes", "patterns", "tails", "ears", "horns", "eyes", "accessories"]

    for layer in layer_order:
        trait_name = traits.get(layer)
        if not trait_name or trait_name == "none":
            continue
        trait_rel = TRAITS[layer].get(trait_name)
        if not trait_rel:
            continue
        trait_path = collection_root / trait_rel
        if not trait_path.exists():
            continue

        x, y, w, h = positions[layer]
        # Embed trait as nested SVG element using image href (data URI approach)
        import base64
        svg_data = trait_path.read_bytes()
        b64 = base64.b64encode(svg_data).decode()
        layers.append(
            f'  <image href="data:image/svg+xml;base64,{b64}" '
            f'x="{x}" y="{y}" width="{w}" height="{h}" />'
        )

    # Embed base as first image
    import base64
    base_data = base_path.read_bytes()
    base_b64  = base64.b64encode(base_data).decode()

    rarity = compute_rarity_score(traits)
    timestamp = datetime.utcnow().isoformat()

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <!-- African Safari Creature | Claude Safari Collection #1 -->
  <!-- Generated: {timestamp} -->
  <!-- Base: {traits['base']} | Rarity: {rarity} -->
  <!-- Traits: {json.dumps({k:v for k,v in traits.items() if k != 'base'})} -->
  <image href="data:image/svg+xml;base64,{base_b64}" x="0" y="0" width="400" height="400" />
{chr(10).join(layers)}
</svg>'''
    return svg


def generate_creature(
    seed: int | None = None,
    output_dir: Path | None = None,
    collection_root: Path | None = None,
    token_id: int | None = None,
) -> dict:
    if seed is not None:
        random.seed(seed)

    collection_root = collection_root or Path(__file__).parent.parent
    output_dir = output_dir or collection_root / "generated"
    output_dir.mkdir(parents=True, exist_ok=True)

    traits = roll_traits()
    traits["seed"] = seed
    traits["rarity_score"] = compute_rarity_score(traits)
    if token_id is not None:
        traits["token_id"] = token_id

    svg_content = build_svg(traits, collection_root)

    tid = token_id if token_id is not None else random.randint(10000, 99999)
    filename = f"creature-{tid:05d}-{traits['base']}.svg"
    svg_path = output_dir / filename
    svg_path.write_text(svg_content)

    # Write metadata JSON
    meta_path = output_dir / f"creature-{tid:05d}.json"
    metadata = {
        "token_id":     tid,
        "name":         f"Safari #{tid:05d}",
        "description":  f"A {traits['base']} from the Claude Safari Collection #1",
        "image":        filename,
        "seed":         seed,
        "rarity_score": traits["rarity_score"],
        "attributes": [
            {"trait_type": "Base",        "value": traits["base"]},
            {"trait_type": "Eyes",        "value": traits["eyes"]},
            {"trait_type": "Ears",        "value": traits["ears"]},
            {"trait_type": "Horns",       "value": traits["horns"]},
            {"trait_type": "Mane",        "value": traits["manes"]},
            {"trait_type": "Tail",        "value": traits["tails"]},
            {"trait_type": "Pattern",     "value": traits["patterns"]},
            {"trait_type": "Accessory",   "value": traits["accessories"]},
            {"trait_type": "Palette",     "value": traits["palette"]},
            {"trait_type": "Rarity Score","value": traits["rarity_score"], "display_type": "number"},
        ]
    }
    meta_path.write_text(json.dumps(metadata, indent=2))

    print(f"✅  #{tid:05d}  {traits['base']:10s}  rarity={traits['rarity_score']:5.1f}  → {filename}")
    return metadata


# ── CLI ────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Generate African Safari Creatures",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python generate.py                     # Generate 1 random creature
  python generate.py -n 10              # Generate 10 random creatures
  python generate.py -n 5 --seed 42     # 5 creatures from seed 42
  python generate.py --start-id 1 -n 100 # Mint IDs #00001–#00100
        """
    )
    parser.add_argument("-n", "--count",    type=int, default=1,    help="Number of creatures to generate")
    parser.add_argument("--seed",           type=int, default=None,  help="Random seed for reproducibility")
    parser.add_argument("--start-id",       type=int, default=1,     help="Starting token ID")
    parser.add_argument("--output",         type=str, default=None,  help="Output directory path")
    args = parser.parse_args()

    collection_root = Path(__file__).parent.parent
    output_dir = Path(args.output) if args.output else collection_root / "generated"

    print(f"\n🦁  Claude Safari Collection #1 — Generator")
    print(f"    Generating {args.count} creature(s)...\n")

    results = []
    for i in range(args.count):
        seed = (args.seed + i) if args.seed is not None else None
        token_id = args.start_id + i
        meta = generate_creature(
            seed=seed,
            output_dir=output_dir,
            collection_root=collection_root,
            token_id=token_id,
        )
        results.append(meta)

    print(f"\n📁  Output: {output_dir}")
    print(f"🎨  {args.count} creature(s) generated.\n")

    # Print rarity summary
    if args.count > 1:
        scores = [r["rarity_score"] for r in results]
        print(f"📊  Rarity summary:")
        print(f"    Min score (rarest):  {min(scores)}")
        print(f"    Max score (common):  {max(scores)}")
        print(f"    Avg score:           {sum(scores)/len(scores):.1f}")


if __name__ == "__main__":
    main()
