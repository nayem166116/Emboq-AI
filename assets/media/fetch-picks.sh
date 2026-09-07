#!/usr/bin/env bash
# fetch-picks.sh - download the curated Pexels robotics clip for every slot.
#
# Usage:
#   ./fetch-picks.sh                  # all 17 slots
#   ./fetch-picks.sh hero-home stack  # only these slots
#   ./fetch-picks.sh list             # show what goes where, and why
#   ./fetch-picks.sh alts             # alternative clip ids you can swap in
#   ./fetch-picks.sh dry              # print the urls, download nothing
#
# Pexels API key (optional, picks the cleanest 1920-wide rendition):
#   the key in pexels-key.txt next to this script is used automatically,
#   or export PEXELS_API_KEY=your-key before running.
# Without a key the public download link is used instead - that also works.
#
# Every clip is Pexels-licensed: free for commercial use, no attribution.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

PEXELS_HOST="https://www.pexels.com"
PEXELS_API="https://api.pexels.com/videos/videos"
download_url(){ echo "${PEXELS_HOST}/download/video/${1}/"; }
page_url(){ echo "${PEXELS_HOST}/video/${1}/"; }

KEY="${PEXELS_API_KEY:-}"
if [ -z "$KEY" ] && [ -f pexels-key.txt ]; then
  KEY="$(tr -d '[:space:]' < pexels-key.txt || true)"
fi

# slot|pexels id|why this footage suits this section
PICKS=(
  "hero-home|32386532|Industrial robot arm in a high-tech factory - the flagship home hero"
  "hero-features|32386523|Close-up robotic arm in a modern plant - perceive / predict / act"
  "hero-usecases|4473250|Factory conveyor belt running - where it runs on the floor"
  "hero-pricing|10080479|Calm production-machine close-up - quiet behind the pricing table"
  "hero-tool|8327794|Robot arm mid-cycle - motion behind the downtime calculator"
  "hero-blog|8087025|Robotics lab footage - editorial, low distraction"
  "hero-blog-post|8501985|Slow robotics detail - sits behind long-form text"
  "hero-about|30715848|Wide aerial of an automated production line - the whole floor"
  "hero-contact|20682093|Warehouse logistics floor - human, approachable"
  "hero-auth|8328035|Dark slow robot-arm detail - minimal motion behind forms"
  "hero-legal|853905|Steady neutral conveyor - the quietest option"
  "hero-404|6153453|Robot arm reaching into empty space"
  "hero|8087323|Generic factory robot arm - shared safety net"
  "product|8328046|Industrial machinery detail - framed-section safety net"
  "stack|4473187|Production line in motion - home THE STACK, RUNNING"
  "horizon|30915832|Aerial industrial plant, wide and slow - home THE HORIZON LINE"
  "product-features|32386590|Robotic arm precision close-up - features THE PRODUCT"
)

# id|description - swap any of these into any slot with:
#   ./get-demo-video.sh url <slot> https://www.pexels.com/download/video/<id>/
ALTS=(
  "855117|Chocolate factory robotic arms, bright and busy"
  "32386519|Robotic arm close-up, crisp grade"
  "8328143|Robot arm variant - side angle"
  "8328090|Robot arm variant - top down"
  "8328141|Robot arm variant - tight detail"
  "8328037|Robot arm variant - slow pan"
  "8084757|Robot arm variant - wide bay"
  "8328095|Robot arm variant - dark grade"
  "6153728|Robot arm variant - reaching motion"
  "14314764|Worker welding, heavy sparks"
  "34771866|Professional welder, vivid sparks"
  "4941457|Industrial welding station"
  "6046350|Welding close-up"
  "30915328|Aerial power plant with transmission lines"
  "30915331|Aerial sweep over a sprawling plant"
  "36306203|Warehouse logistics, boxes moving"
  "6167566|Factory conveyor carrying goods"
  "5675641|Packaging line"
  "10472351|Conveyor / material handling"
)

slot_of(){ echo "${1%%|*}"; }
id_of(){ local r="${1#*|}"; echo "${r%%|*}"; }
desc_of(){ echo "${1##*|}"; }

find_pick(){
  local want="$1" row
  for row in "${PICKS[@]}"; do
    if [ "$(slot_of "$row")" = "$want" ]; then echo "$row"; return 0; fi
  done
  return 1
}

print_list(){
  local row
  echo "slot                 pexels id   footage"
  echo "-------------------------------------------------------------"
  for row in "${PICKS[@]}"; do
    printf '%-20s %-11s %s\n' "$(slot_of "$row")" "$(id_of "$row")" "$(desc_of "$row")"
  done
}

print_alts(){
  local row id
  echo "alternative clips - swap into any slot:"
  echo "  ./get-demo-video.sh url <slot> <download url>"
  echo ""
  for row in "${ALTS[@]}"; do
    id="${row%%|*}"
    printf '%-10s %-46s %s\n' "$id" "${row#*|}" "$(download_url "$id")"
  done
}

# best mp4 rendition at or below 1920 wide, via the API key
api_link(){
  [ -n "$KEY" ] || return 1
  command -v jq >/dev/null 2>&1 || return 1
  curl -fsSL -m 30 -H "Authorization: $KEY" "$PEXELS_API/$1" 2>/dev/null \
    | jq -r '[.video_files[]? | select(.file_type=="video/mp4") | select(.width != null and .width <= 1920)] | sort_by(.width) | last | .link // empty' 2>/dev/null
}

fetch_one(){
  local row slot id desc url via
  row="$1"
  slot="$(slot_of "$row")"; id="$(id_of "$row")"; desc="$(desc_of "$row")"
  url=""; via="public link"
  if [ -n "$KEY" ]; then
    url="$(api_link "$id" || true)"
    [ -n "$url" ] && via="api key"
  fi
  if [ -z "$url" ]; then url="$(download_url "$id")"; fi
  echo ""
  echo "== $slot   (pexels $id, via $via)"
  echo "   $desc"
  echo "   $url"
  if [ "${DRY:-0}" = "1" ]; then return 0; fi
  if ./get-demo-video.sh url "$slot" "$url"; then
    echo "   ok -> $slot.mp4 + $slot-poster.jpg"
  else
    echo "   FAILED. open $(page_url "$id") , download it by hand, then run:"
    echo "   ./get-demo-video.sh local $slot /path/to/downloaded.mp4"
  fi
}

DRY="${DRY:-0}"
case "${1:-}" in
  -h|--help) sed -n '2,17p' "$0"; exit 0 ;;
  list|--list) print_list; exit 0 ;;
  alts|--alts) print_alts; exit 0 ;;
  dry|--dry-run) DRY=1; shift ;;
esac

chmod +x ./get-demo-video.sh 2>/dev/null || true

if [ -n "$KEY" ]; then
  echo "pexels api key found - pulling the 1920-wide rendition of each clip"
else
  echo "no api key - using the public download link for each clip"
fi

if [ "$#" -eq 0 ]; then
  for row in "${PICKS[@]}"; do fetch_one "$row"; done
else
  for want in "$@"; do
    row="$(find_pick "$want" || true)"
    if [ -z "$row" ]; then
      echo "unknown slot: $want   (run ./fetch-picks.sh list)"
      exit 1
    fi
    fetch_one "$row"
  done
fi

echo ""
echo "done. reload the site - every section now plays its own clip."
