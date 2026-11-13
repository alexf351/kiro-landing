#!/usr/bin/env bash
# capture-app-screens.sh — fresh, localized app screenshots for the homepages.
#
#   bash blog-engine/capture-app-screens.sh <path-to-Kiro-App-checkout> [langs]
#   (langs default: "en fr es de pt it zh"; pt = pt-br, zh = zh-hans on the site)
#
# Runs the app repo's own headless capture tool (scripts/i18n/intro-shots/
# capture.js: 430x932 @3x, iPhone safe area, Inter + Noto Sans SC) against a dev
# web export, through the app's App Store screenshot scenes, lays the real iOS
# status bar over each shot, then imports them into assets/screens/<locale>/
# (English replaces assets/screens/*) and regenerates the locale homepages.
# Needs a Chromium for playwright-core at the path capture.js names (Claude Code
# cloud sessions have it); Python 3 with Pillow; Node. The Kiro-App checkout must
# include the dev web SafeAreaProvider in app/_layout.tsx (branch
# claude/capture-web-safe-area, Nov 12 2026): without it, Expo SDK 58 gives web
# screens zero insets and the status bar lands on top of every header. Check Pillow with
# `python3 -c "from PIL import Image"`: in some cloud images python3 is 3.11
# while the system Pillow is built for another version, and only importing
# Image shows it (fix: python3 -m pip install --user --ignore-installed Pillow).
#
# Site file  <- app scene
#   learning-path   learn            path-list     tools
#   prompt-builder  /dev-image-match create-path   custom
#   operator-build  operator         duels-tab     duels
#   ask-iro         coach            certificate   certificates
# image-lab, news-refresh and rank-up have no scene and keep their English shot.
set -euo pipefail
SITE="$(cd "$(dirname "$0")/.." && pwd)"
APP="$(cd "${1:?usage: capture-app-screens.sh <Kiro-App dir> [langs]}" && pwd)"
LANGS="${2:-en fr es de pt it zh}"
TMP="${TMPDIR:-/tmp}"
export CAPTURE_DEPS="$TMP/iro-capture-deps" CAPTURE_WEB="$TMP/iro-capture-web"
OUT="$TMP/iro-site-shots"

# 1. capture deps, kept out of both repos
if [ ! -d "$CAPTURE_DEPS/node_modules/playwright-core" ]; then
  mkdir -p "$CAPTURE_DEPS" && (cd "$CAPTURE_DEPS" && npm init -y >/dev/null && \
    npm i playwright-core@1.56 @fontsource/inter @fontsource/noto-sans-sc imagescript@1.3.0)
fi

# 2. dev web export of the app (placeholder anon key: an empty one crashes createClient)
[ -d "$APP/node_modules" ] || (cd "$APP" && npm ci)
(cd "$APP" && EXPO_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co \
  EXPO_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key-for-headless-qa \
  CI=1 npx expo export --platform web --dev --output-dir "$CAPTURE_WEB")

# 3. capture, per language (same mid-journey learner seed as the app's carousel run)
TODAY=$(date +%F)
COMPLETED=$(echo f1 f2 f4 f5 f33 f6 f6b f7 f31 f8 f9 f10 f11 f12 f13 f14 | sed 's/\([a-z0-9]*\)/"foundations::\1"/g; s/ /,/g')
SEED="{\"xp\":4600,\"streak\":45,\"streakBest\":45,\"gems\":1517,\"lastLessonDay\":\"$TODAY\",\"lastPathId\":\"foundations\",\"recommendedPathId\":\"foundations\",\"whatsNewSeenVersion\":\"99.0\",\"completed\":[$COMPLETED]}"
rm -rf "$OUT"
for L in $LANGS; do
  TAPS=$(node -e "
const src=require('fs').readFileSync('$APP/app/dev-image-match.tsx','utf8');
const m=src.match(new RegExp('\\\\n  $L: \\\\{[\\\\s\\\\S]*?rights: \\\\[([\\\\s\\\\S]*?)\\\\]'));
const rights=[...m[1].matchAll(/'([^']+)'/g)].map(x=>x[1]);
process.stdout.write(JSON.stringify({'prompt-builder':['Claude',rights[1],'Perplexity',rights[2]],'ask-iro':['Ask Iro']}));")
  S="/dev-screenshots?locale=$L&scene="
  # The operator scene is captured as "progress" because capture.js hides the
  # signed-out "save your progress" banner only under that name; it becomes
  # operator-build.png below. Tapping the "Ask Iro" title moves focus off the
  # sheet's first button, which headless Chrome otherwise draws a focus ring on.
  STATUSBAR=0 SEED="$SEED" TAPS="$TAPS" timeout 900 node "$APP/scripts/i18n/intro-shots/capture.js" "$OUT/$L" "$L" \
    "learning-path=${S}learn" "path-list=${S}tools" "prompt-builder=/dev-image-match" "create-path=${S}custom" \
    "progress=${S}operator" "duels-tab=${S}duels" "ask-iro=${S}coach" "certificate=${S}certificates"
  mv "$OUT/$L/progress.png" "$OUT/$L/operator-build.png"
done

# 4. the real iOS status bar over each shot (the mask is drawn for 1290 px wide)
python3 - "$OUT" "$APP/scripts/i18n/intro-shots/status-bar.png" <<'PY'
import sys
from pathlib import Path
from PIL import Image
out, bar = Path(sys.argv[1]), Image.open(sys.argv[2]).convert("RGBA")
for f in out.rglob("*.png"):
    im = Image.open(f).convert("RGBA")
    b = bar if bar.width == im.width else bar.resize((im.width, round(bar.height * im.width / bar.width)), Image.LANCZOS)
    im.alpha_composite(b, (0, 0))
    im.convert("RGB").save(f)
PY

# 5. into the site
python3 "$SITE/blog-engine/import-app-screens.py" "$OUT"
node "$SITE/blog-engine/build-i18n.mjs"
echo "Done. Review: git -C '$SITE' status"
