# Brand — drop your logo in this folder

Same rule as `/assets/media/`: **put a file in here with the right name and the
site picks it up.** No code edit, no rebuild, no redeploy of anything else.

## The slots

| File you drop | Where it shows up |
| --- | --- |
| `logo.<ext>` | The header lockup, top-left on every page and in the menu overlay |
| `logo-mark.<ext>` | Square mark — used for the tab icon when there is no `favicon.*` |
| `favicon.<ext>` | Browser tab icon |
| `apple-touch-icon.png` | iOS / Android home-screen icon |
| `og-image.png` | The preview card when a link is shared on LinkedIn, X, Slack, WhatsApp |

`<ext>` can be **png, webp, avif, jpg, jpeg or svg**. Raster files win over the
shipped `logo.svg`, so dropping `logo.png` is enough — you never have to delete
anything first. Dropping your own `logo.svg` simply overwrites the default.

## Recommended sizes

- `logo` — horizontal lockup, roughly 4:1. Export at **1200 × 300 px** (PNG/WebP
  with a transparent background) or any SVG. It is displayed 30 px tall, so a
  transparent background matters more than resolution.
- `logo-mark` — square, **512 × 512 px**, transparent background.
- `favicon` — square, **512 × 512 px** PNG or an SVG.
- `apple-touch-icon.png` — square, **180 × 180 px**, *no* transparency (iOS
  renders transparent pixels black).
- `og-image.png` — **1200 × 630 px**. Social crawlers read the static HTML, so
  this one must keep exactly this filename to be picked up.

## What ships by default

- `logo.svg` — the Opi Robotics lockup: aperture mark + wordmark, drawn as
  outlined paths so it renders identically everywhere, with no font dependency.
- `logo-mark.svg` — the mark on its own, transparent background.
- `logo-mark-tile.svg` — the mark on the dark brand tile, for light backgrounds.
- `favicon.svg` — 32 px optimised version of the mark.
- `apple-touch-icon.png` — 180 × 180 tile.
- `og-image.png` — 1200 × 630 social card.
- `logo-wordmark.svg` — the text only, no mark, if you ever need it alone.

## Safety net

If every candidate fails to load — wrong file type, corrupt export, blocked by a
CDN — the header falls back to the CSS gradient mark plus the words
"Opi Robotics". The layout never breaks and you never get a broken-image icon.

## Colours, if you are having a logo designed

- Deep background `#0B1020`
- Primary blue `#3B82F6`
- Accent cyan `#22D3EE`
- Off-white text `#F4F6FC`

The header sits on a dark background, so supply a light/transparent version.
