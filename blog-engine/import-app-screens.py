#!/usr/bin/env python3
"""import-app-screens.py — turn raw Iro app captures into the site's screenshots.

    python3 blog-engine/import-app-screens.py <folder> [<folder> ...]
    python3 blog-engine/import-app-screens.py <folder> --dry-run

Each input file is named either with the app's screenshot-panel capture label
(`de-01-learn.png`, `fr-07-coach.jpg`, set by Settings > App Store Screenshots
in a dev build) or as `<locale>/<site-name>.<ext>` / `<locale>-<site-name>.<ext>`
(`de/image-lab.png`, `zh-news-refresh.jpg`), for the screens the panel has no
scene for. App locale codes are accepted: `pt` means pt-br, `zh` means zh-hans.

Output, per shot, is a 900x1951 .jpg and .webp (the slot every homepage
device frame uses): English replaces assets/screens/<name>.*, every other
locale goes to assets/screens/<locale>/<name>.*. Then run
`node blog-engine/build-i18n.mjs` so the locale pages pick them up.
"""
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "screens"
W, H = 900, 1951

# The app's screenshot scene registry (lib/dev/screenshotScenes.ts in the app
# repo), in carousel order, mapped to the site's file names.
SCENES = {
    "01-learn": "learning-path",
    "02-tools": "path-list",
    "03-practice": "prompt-builder",
    "04-custom": "create-path",
    "05-operator": "operator-build",
    "06-duels": "duels-tab",
    "07-coach": "ask-iro",
    "08-certificates": "certificate",
}
SITE_NAMES = set(SCENES.values()) | {"image-lab", "news-refresh", "rank-up", "prompt-library-refresh"}
LOCALES = {"en": "en", "fr": "fr", "es": "es", "de": "de", "it": "it",
           "pt": "pt-br", "pt-br": "pt-br", "zh": "zh-hans", "zh-hans": "zh-hans"}
EXTS = {".png", ".jpg", ".jpeg", ".webp", ".heic"}


def identify(f: Path):
    """(site locale, site name) for a capture file, or None."""
    stem = f.stem.lower().replace("_", "-").replace(" ", "-")
    parent = f.parent.name.lower()
    m = re.match(r"^(en|fr|es|de|it|pt-br|pt|zh-hans|zh)-(.+)$", stem)
    loc, rest = (m.group(1), m.group(2)) if m else (parent, stem)
    if loc not in LOCALES:
        return None
    for label, name in SCENES.items():
        if rest == label:
            return LOCALES[loc], name
    if rest in SITE_NAMES:
        return LOCALES[loc], rest
    return None


def fit(im: Image.Image) -> Image.Image:
    """Scale to 900 wide, then trim or pad the bottom to 1951 (phone status bar stays)."""
    im = im.convert("RGB")
    h = round(im.height * W / im.width)
    im = im.resize((W, h), Image.LANCZOS)
    if h >= H:
        return im.crop((0, 0, W, H))
    canvas = Image.new("RGB", (W, H), im.getpixel((W // 2, h - 1)))
    canvas.paste(im, (0, 0))
    return canvas


def main(args):
    dry = "--dry-run" in args
    dirs = [Path(a) for a in args if not a.startswith("--")]
    if not dirs:
        print(__doc__)
        return 2
    done, skipped = {}, []
    for d in dirs:
        for f in sorted(p for p in d.rglob("*") if p.suffix.lower() in EXTS):
            hit = identify(f)
            if not hit:
                skipped.append(str(f))
                continue
            loc, name = hit
            dest = OUT if loc == "en" else OUT / loc
            done.setdefault(loc, []).append(name)
            if dry:
                continue
            dest.mkdir(parents=True, exist_ok=True)
            img = fit(Image.open(f))
            img.save(dest / f"{name}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
            img.save(dest / f"{name}.webp", "WEBP", quality=78, method=6)
    for loc in sorted(done):
        print(f"{loc}: {len(done[loc])} -> {', '.join(sorted(done[loc]))}")
    if skipped:
        print("not recognized (rename to <locale>-<site-name> or the capture label):")
        for s in skipped:
            print("  " + s)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
