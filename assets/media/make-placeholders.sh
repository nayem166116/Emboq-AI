#!/usr/bin/env bash
# Regenerate the bundled placeholder videos — one visibly different clip per
# slot, so no two sections of the site show the same footage.
#
# These are only stand-ins. Replace any of them with real footage using
# ./get-demo-video.sh (Pexels) or by dropping your own file in this folder.
#
# Usage:  ./make-placeholders.sh                        # all slots
#         ./make-placeholders.sh hero-pricing stack     # just these

set -u
cd "$(dirname "$0")"

command -v ffmpeg >/dev/null || { echo "ffmpeg is required"; exit 1; }

# slot|c0|c1|c2|c3|seed|grid|accent|scanspeed
# c0..c3 are the drifting gradient colours; accent drives the grid + scan band.
SLOTS=(
  "hero|0x04060D|0x0B1020|0x1E3A8A|0x22D3EE|11|80|0x22D3EE|150"
  "hero-home|0x050813|0x0E1733|0x2563EB|0x38BDF8|23|72|0x38BDF8|130"
  "hero-features|0x07060F|0x141033|0x4338CA|0x818CF8|37|64|0x818CF8|110"
  "hero-usecases|0x040D0B|0x0A1F24|0x0D9488|0x2DD4BF|41|88|0x2DD4BF|120"
  "hero-pricing|0x0A0A0F|0x1A1526|0x7C3AED|0xC4B5FD|53|76|0xC4B5FD|100"
  "hero-tool|0x040A10|0x0B1A2B|0x0369A1|0x67E8F9|67|56|0x67E8F9|170"
  "hero-blog|0x08080C|0x15171F|0x475569|0x94A3B8|71|96|0x94A3B8|90"
  "hero-about|0x0B0710|0x1C1428|0x9333EA|0xE9D5FF|83|84|0xE9D5FF|105"
  "hero-contact|0x040D12|0x0C2028|0x0E7490|0x5EEAD4|97|68|0x5EEAD4|140"
  "hero-auth|0x06070E|0x101733|0x1D4ED8|0x93C5FD|103|60|0x93C5FD|115"
  "hero-blog-post|0x0A0B0F|0x191C26|0x334155|0xCBD5E1|109|112|0xCBD5E1|70"
  "hero-legal|0x07080B|0x121620|0x1E293B|0x7DD3FC|113|44|0x7DD3FC|95"
  "hero-404|0x03040A|0x0A0C18|0x312E81|0xA5B4FC|127|120|0xA5B4FC|60"
  "product|0x0B1020|0x10152B|0x3B82F6|0x04060D|29|64|0x3B82F6|120"
  "stack|0x050A18|0x0D142E|0x1D4ED8|0x22D3EE|131|48|0x22D3EE|160"
  "product-features|0x060612|0x131A38|0x4F46E5|0x60A5FA|149|52|0x60A5FA|135"
  "horizon|0x02040A|0x0A1226|0x1E40AF|0x7DD3FC|163|104|0x7DD3FC|80"
)

want=("$@")

for row in "${SLOTS[@]}"; do
  IFS='|' read -r slot c0 c1 c2 c3 seed grid accent speed <<< "$row"

  if [ ${#want[@]} -gt 0 ]; then
    match=0
    for w in "${want[@]}"; do [ "$w" = "$slot" ] && match=1; done
    [ $match -eq 1 ] || continue
  fi

  echo "==> $slot"
  ffmpeg -y -loglevel error \
    -f lavfi -i "gradients=s=1280x720:c0=$c0:c1=$c1:c2=$c2:c3=$c3:nb_colors=4:seed=$seed:duration=12:speed=0.005:x0=140:y0=90:x1=1140:y1=630" \
    -vf "drawgrid=w=$grid:h=$grid:t=1:c=$accent@0.10,drawbox=x='mod(t*$speed\,1600)-200':y=0:w=200:h=720:c=$accent@0.06:t=fill,noise=alls=6:allf=t,format=yuv420p" \
    -t 12 -r 24 -c:v libx264 -preset veryfast -crf 32 -movflags +faststart -an \
    "$slot.mp4" || { echo "FAILED: $slot"; continue; }

  ffmpeg -y -loglevel error -ss 3 -i "$slot.mp4" -frames:v 1 -q:v 4 "$slot-poster.jpg" \
    || echo "FAILED poster: $slot"
done

echo
echo "Done. Files in $(pwd):"
ls -la *.mp4 *-poster.jpg 2>/dev/null
