# Site media — one slot per section

Every hero and every framed video section on this site has **its own slot**, and
**every slot already ships with a video in this folder** — nothing is left empty.

To change any of them you only ever do one thing:

> **Upload a file into this folder using the same slot name.**
> Replace `hero-pricing.mp4` and only the `/pricing` hero changes.

No code to edit, no build step, no HTML rebuild. Overwrite the file, reload the
page, done. The filename is the only thing that matters, and any of `.mp4` /
`.webm` / `.mov` / `.m4v` / `.ogv` works — so `hero-pricing.mov` is picked up just
as happily as `hero-pricing.mp4`.

Optional: drop `hero-pricing-poster.jpg` (or `.png` / `.webp` / `.avif`) beside it
for the still frame shown while the video loads.

## Real robotics footage in one command

Every slot has a **specific Pexels clip already picked for it** — chosen to match
that section's copy, so no two sections show the same thing. Fetch them all:

```bash
./fetch-picks.sh            # all 17 sections
./fetch-picks.sh hero-home  # just one
./fetch-picks.sh list       # see what goes where, and why
./fetch-picks.sh alts       # 19 spare clips you can swap in
```

No API key needed. Pexels content is free for commercial use with no
attribution required (https://www.pexels.com/license/).

| Section | Footage picked | Pexels |
| --- | --- | --- |
| home hero | Industrial robot arm in a high-tech factory — the flagship shot | `32386532` |
| /features hero | Close-up robotic arm in a modern plant — perceive / predict / act | `32386523` |
| /use-cases hero | Factory conveyor belt running — "where it runs on the floor" | `4473250` |
| /pricing hero | Calm production-machine close-up — quiet behind pricing tables | `10080479` |
| /tool hero | Robot arm mid-cycle — motion behind the downtime calculator | `8327794` |
| /blog hero | Robotics lab footage — editorial, low distraction | `8087025` |
| blog post hero | Slow robotics detail — sits behind long-form text | `8501985` |
| /about hero | Wide aerial of an automated production line — the whole floor | `30715848` |
| /contact hero | Warehouse logistics floor — human, approachable | `20682093` |
| login / register | Dark, slow robot-arm detail — minimal motion behind forms | `8328035` |
| terms / privacy | Steady neutral conveyor — the quietest option | `853905` |
| 404 | Robot arm reaching into empty space | `6153453` |
| `hero` safety net | Generic factory robot arm | `8087323` |
| `product` safety net | Industrial machinery detail | `8328046` |
| home → THE STACK, RUNNING | Production line in motion | `4473187` |
| home → THE HORIZON LINE | Aerial industrial plant, wide and slow | `30915832` |
| /features → THE PRODUCT | Robotic arm precision close-up | `32386590` |

Don't like one? `./fetch-picks.sh alts` lists spares (welding sparks, aerial
plants, packaging lines, more robot-arm angles), and any of them drops in with:

```bash
./get-demo-video.sh url hero-pricing https://www.pexels.com/download/video/<id>/
```

## The slots

### Heroes (full-screen background video)

| Slot file | Used by |
| --- | --- |
| `hero.mp4` | Safety net — used only if one of the files below gets deleted |
| `hero-home.mp4` | `/` home hero |
| `hero-features.mp4` | `/features` hero |
| `hero-usecases.mp4` | `/use-cases` hero |
| `hero-pricing.mp4` | `/pricing` hero |
| `hero-tool.mp4` | `/tool` hero |
| `hero-blog.mp4` | `/blog` index hero |
| `hero-blog-post.mp4` | every single blog post hero |
| `hero-about.mp4` | `/about` hero |
| `hero-contact.mp4` | `/contact` hero |
| `hero-auth.mp4` | `/login`, `/register`, `/forgot-password`, `/verify`, `/loading` |
| `hero-legal.mp4` | `/terms`, `/privacy`, `/cookies` |
| `hero-404.mp4` | `404.html` |

### Framed section videos (video with copy on top)

| Slot file | Used by |
| --- | --- |
| `product.mp4` | Safety net for framed sections — used only if a file below gets deleted |
| `stack.mp4` | home → “THE STACK, RUNNING” |
| `horizon.mp4` | home → “THE HORIZON LINE” (falls back to `hero.mp4`) |
| `product-features.mp4` | `/features` → “THE PRODUCT” |

## How the fallback works

Each `<video>` lists **its own slot first, then the shared slot**, and the
browser plays the first source that actually exists:

```html
<video data-media="hero-pricing" data-media-slots="hero-pricing,hero">
  <source src="/assets/media/hero-pricing.webm" type="video/webm">
  <source src="/assets/media/hero-pricing.mp4"  type="video/mp4">
  ...
  <source src="/assets/media/hero.webm" type="video/webm">
  <source src="/assets/media/hero.mp4"  type="video/mp4">
</video>
```

So:

- Drop in `hero-pricing.mp4` → only `/pricing` changes.
- Delete `hero-pricing.mp4` → `/pricing` quietly uses `hero.mp4` again.
- Delete **everything** → the video layer removes itself and the original
  starfield / gradient hero shows through. No broken players, no black boxes.

## Supported formats

Video, tried in this order per slot: **`.webm` → `.mp4` → `.mov` → `.m4v` → `.ogv`**

Poster (still frame), probed in this order: **`.jpg` → `.jpeg` → `.png` → `.webp` → `.avif`**
named `<slot>-poster.<ext>` — e.g. `hero-pricing-poster.png`.

Got an `.avi`, `.mkv`, or anything else? Convert it once:

```bash
./get-demo-video.sh local hero-pricing ~/Downloads/whatever.mkv
```

## Getting real footage

### `./get-demo-video.sh` — Pexels downloader / converter

```bash
./get-demo-video.sh slots                      # list every slot name
./get-demo-video.sh                            # fetch a different clip for EVERY slot
./get-demo-video.sh hero hero-pricing stack    # just these slots, default queries

# pick your own search terms (needs a free key from pexels.com/api)
export PEXELS_API_KEY=your_key_here
./get-demo-video.sh search hero-pricing "cnc machining precision metal"

# or grab one specific Pexels video you liked — no API key needed
./get-demo-video.sh url hero-home https://www.pexels.com/video/some-slug-1234567/

# or convert a file you already have, in any format
./get-demo-video.sh local stack ~/Downloads/line.mov
```

Every mode re-encodes to web-safe H.264 / yuv420p, strips audio, caps at 1280px
wide and ~14s, adds `faststart`, and regenerates the poster automatically.

Good Pexels search terms: `factory automation`, `robot arm`, `assembly line`,
`industrial machinery`, `warehouse robotics`, `cnc machining`, `conveyor belt`,
`welding robot`, `machine vision`.

### `./make-placeholders.sh` — regenerate the bundled stand-ins

The clips shipped here are generated placeholders — every slot has one already,
each with a different colour, grid density, and scan direction, so you can see at
a glance that each section has its own video. Upload your own file over any of
them to swap it. To regenerate the stand-ins instead:

```bash
./make-placeholders.sh                  # all slots
./make-placeholders.sh hero-pricing     # just one
```

## Notes

- Keep clips **silent** — they autoplay, and browsers block autoplay with sound.
- Aim for **under ~3 MB per file**; these are decorative backgrounds.
- Landscape 16:9 works best; the hero is cropped with `object-fit: cover`.
- Videos are lazy-loaded, pause when off-screen, and are skipped entirely for
  visitors who ask for reduced motion (they see the poster instead).
- Check the licence of anything you ship. Pexels footage is free for commercial
  use, but attribution is appreciated.

## Your Pexels API key

`pexels-key.txt` in this folder holds the key you gave me, so `./fetch-picks.sh`
picks up automatically and pulls the clean 1920-wide rendition of every clip
(needs `jq`; without it the script falls back to the public download link, which
works fine too).

```bash
cd assets/media
./fetch-picks.sh          # all 17 sections, real Pexels robotics footage
```

Prefer an env var instead? Delete the file and run:

```bash
export PEXELS_API_KEY=your-key
./fetch-picks.sh
```

Two housekeeping notes: don't commit `pexels-key.txt` to a public repo, and
since the key travelled through a chat you can rotate it any time at
https://www.pexels.com/api/ - nothing in the site depends on it, it only makes
the download step pick a nicer rendition.
