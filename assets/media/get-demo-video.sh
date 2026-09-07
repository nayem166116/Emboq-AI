#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# EMBOQ AI — demo video fetcher / normaliser
#
# Pulls real demo footage from Pexels (https://www.pexels.com) into this folder
# with the exact filenames the site expects, then regenerates the poster frame.
#
# EVERY SECTION HAS ITS OWN SLOT, so no two sections need to share footage.
# A page first tries its own slot, then falls back to the shared one:
#
#   hero              shared fallback for every hero (used if a page slot is absent)
#   hero-home         home hero                 hero-features   /features hero
#   hero-usecases     /use-cases hero           hero-pricing    /pricing hero
#   hero-tool         /tool hero                hero-blog       /blog hero
#   hero-blog-post    single blog post hero     hero-about      /about hero
#   hero-contact      /contact hero             hero-auth       login/register/verify
#   hero-legal        terms/privacy/cookies     hero-404        404 page
#
#   product           shared fallback for the framed section videos
#   stack             home  "THE STACK, RUNNING" frame
#   horizon           home  "THE HORIZON LINE" frame (falls back to hero)
#   product-features  /features "THE PRODUCT" frame
#
# Replace only the slots you care about — anything you leave out silently uses
# the shared hero.mp4 / product.mp4, so the site never shows a broken video.
#
# THREE WAYS TO USE IT
#
# 1. Search Pexels by keyword (needs a free API key from
#    https://www.pexels.com/api/ — takes about a minute to get):
#
#      export PEXELS_API_KEY=your_key_here
#      ./get-demo-video.sh search hero "factory robot arm"
#      ./get-demo-video.sh search hero-pricing "industrial machine automation"
#      ./get-demo-video.sh search stack "conveyor belt production line"
#
#    Run with no arguments to fetch sensible defaults for both slots:
#
#      ./get-demo-video.sh
#
# 2. From a Pexels video page you picked by hand (no API key needed).
#    Open any video on pexels.com, copy the page or download URL, then:
#
#      ./get-demo-video.sh url hero https://www.pexels.com/video/<slug>-<id>/
#
# 3. From a file you already have, in ANY format (.mov .avi .mkv .webm .m4v …).
#    This normalises it to a web-optimised MP4:
#
#      ./get-demo-video.sh local hero ~/Downloads/my-footage.mov
#
# Requires: bash, curl, ffmpeg. (jq is used for search mode when available.)
# ---------------------------------------------------------------------------
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

die(){ echo "Error: $*" >&2; exit 1; }
have(){ command -v "$1" >/dev/null 2>&1; }

have curl   || die "curl is required."
have ffmpeg || die "ffmpeg is required (brew install ffmpeg / dnf install ffmpeg)."

# Encode whatever we downloaded into the exact shape the site wants:
# H.264 + yuv420p (universally decodable), no audio, faststart, 1280px wide,
# ~14s, tuned for a silent background loop rather than archival quality.
normalise(){
  local src="$1" slot="$2"
  echo "  -> encoding ${slot}.mp4"
  ffmpeg -hide_banner -loglevel error -y -i "$src" \
    -t 14 -an \
    -vf "scale=1280:-2:flags=lanczos,format=yuv420p" \
    -c:v libx264 -preset slow -crf 28 -movflags +faststart \
    "${slot}.mp4"

  echo "  -> poster ${slot}-poster.jpg"
  ffmpeg -hide_banner -loglevel error -y -ss 2 -i "${slot}.mp4" \
    -frames:v 1 -q:v 4 "${slot}-poster.jpg"

  echo "  ✓ ${slot}.mp4 ($(du -h "${slot}.mp4" | cut -f1))"
}

# Every slot the site knows about, each with a sensible default search query.
# Format: slot|default Pexels query
SLOT_QUERIES=(
  "hero|factory robot arm automation"
  "hero-home|robot arm factory floor"
  "hero-features|machine vision camera inspection"
  "hero-usecases|warehouse robotics logistics"
  "hero-pricing|cnc machining precision metal"
  "hero-tool|industrial control room data"
  "hero-blog|engineer factory tablet inspection"
  "hero-blog-post|close up machinery detail"
  "hero-about|engineering team factory walkthrough"
  "hero-contact|modern industrial facility interior"
  "hero-auth|abstract technology blue lines"
  "hero-legal|clean architecture minimal building"
  "hero-404|empty dark warehouse"
  "product|industrial machinery production line"
  "stack|conveyor belt production line"
  "horizon|aerial factory sunrise wide"
  "product-features|automated assembly line closeup"
)

slot_names(){ for row in "${SLOT_QUERIES[@]}"; do echo "${row%%|*}"; done; }

default_query(){
  for row in "${SLOT_QUERIES[@]}"; do
    if [ "${row%%|*}" = "$1" ]; then echo "${row#*|}"; return 0; fi
  done
  echo "industrial automation"
}

check_slot(){
  local s
  for s in $(slot_names); do
    [ "$s" = "$1" ] && return 0
  done
  echo "Unknown slot '$1'. Known slots:" >&2
  slot_names | sed 's/^/  /' >&2
  exit 1
}

# --- mode: local file -------------------------------------------------------
mode_local(){
  local slot="$1" path="$2"
  check_slot "$slot"
  [ -f "$path" ] || die "No such file: $path"
  echo "Normalising $path -> $slot"
  normalise "$path" "$slot"
}

# --- mode: direct URL -------------------------------------------------------
# Accepts either a direct file URL or a pexels.com video page URL, from which
# we derive the public download endpoint using the trailing numeric id.
mode_url(){
  local slot="$1" url="$2"
  check_slot "$slot"

  if [[ "$url" == *pexels.com/video/* ]]; then
    local id
    id="$(echo "$url" | grep -oE '[0-9]+/?$' | tr -d '/')"
    [ -n "$id" ] || die "Could not read a video id from: $url"
    url="https://www.pexels.com/download/video/$id/"
    echo "Using download endpoint: $url"
  fi

  local tmp
  tmp="$(mktemp -t emboq-video.XXXXXX)"
  echo "Downloading -> $slot"
  curl -fsSL --retry 3 -A "Mozilla/5.0" "$url" -o "$tmp" \
    || die "Download failed. Open the page in a browser, save the MP4, then use: $0 local $slot <file>"
  normalise "$tmp" "$slot"
  rm -f "$tmp"
}

# --- mode: API search -------------------------------------------------------
mode_search(){
  local slot="$1" query="$2"
  check_slot "$slot"
  [ -n "${PEXELS_API_KEY:-}" ] || die "PEXELS_API_KEY is not set. Get a free key at https://www.pexels.com/api/ then: export PEXELS_API_KEY=..."

  echo "Searching Pexels for \"$query\" -> $slot"
  local json
  json="$(curl -fsSL -H "Authorization: ${PEXELS_API_KEY}" \
    --get "https://api.pexels.com/videos/search" \
    --data-urlencode "query=${query}" \
    --data-urlencode "orientation=landscape" \
    --data-urlencode "per_page=15")" || die "Pexels API request failed."

  local file_url=""
  if have jq; then
    # Prefer a ~1920px-wide progressive MP4; fall back to the widest available.
    file_url="$(echo "$json" | jq -r '
      [ .videos[].video_files[]
        | select(.file_type=="video/mp4")
        | select(.width != null and .width <= 1920) ]
      | sort_by(-.width) | .[0].link // empty')"
  else
    file_url="$(echo "$json" | grep -oE 'https://[^"]+\.mp4[^"]*' | head -1)"
  fi

  [ -n "$file_url" ] || die "No usable MP4 in the search results. Try a different query."
  echo "  found: ${file_url:0:90}..."

  local tmp
  tmp="$(mktemp -t emboq-video.XXXXXX)"
  curl -fsSL --retry 3 "$file_url" -o "$tmp" || die "Download failed."
  normalise "$tmp" "$slot"
  rm -f "$tmp"
}

# --- dispatch ---------------------------------------------------------------
if [ $# -eq 0 ]; then
  echo "No arguments — fetching a different clip for every slot."
  echo "(Industrial/robotics footage that suits the Emboq AI copy.)"
  echo "Tip: pass slot names to do just a few, e.g. $0 hero hero-pricing"
  echo
  for s in $(slot_names); do
    mode_search "$s" "$(default_query "$s")" || echo "  (skipped $s)"
    echo
  done
  echo "Done. Reload the site — the new footage is live."
  exit 0
fi

case "${1:-}" in
  search) [ $# -ge 3 ] || die "Usage: $0 search <slot> \"<query>\""; mode_search "$2" "$3" ;;
  url)    [ $# -ge 3 ] || die "Usage: $0 url <slot> <url>";          mode_url    "$2" "$3" ;;
  local)  [ $# -ge 3 ] || die "Usage: $0 local <slot> <file>";       mode_local  "$2" "$3" ;;
  slots)  slot_names ;;
  -h|--help|help) sed -n '2,56p' "$0" ;;
  *)
    # Bare slot names: fetch each one with its default query.
    for s in "$@"; do
      check_slot "$s"
    done
    for s in "$@"; do
      mode_search "$s" "$(default_query "$s")"
      echo
    done
    ;;
esac
