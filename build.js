// OPI ROBOTICS static site generator — authoring convenience only.
// Output is 100% plain static HTML/CSS/JS — no build step required to host.
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const NAV_ITEMS = [
  { n:'01', label:'Home', href:'/', desc:'The perception stack, end to end' },
  { n:'02', label:'Features', href:'/features', desc:'Perceive, predict, act' },
  { n:'03', label:'Use Cases', href:'/use-cases', desc:'Where it runs on the floor' },
  { n:'04', label:'Pricing', href:'/pricing', desc:'Plans and deployment tiers' },
  { n:'05', label:'Free Tool', href:'/tool', desc:'Estimate your downtime cost' },
  { n:'06', label:'Blog', href:'/blog', desc:'Notes on physical AI' },
  { n:'07', label:'About', href:'/about', desc:'The team and the thesis' },
  { n:'08', label:'Contact', href:'/contact', desc:'Talk to an engineer' },
];

function wordmark(){
  return `<a href="/" class="wordmark" aria-label="Opi Robotics home"><img class="wordmark__logo" data-brand="logo" alt="Opi Robotics" decoding="async"><span class="wordmark__mark" aria-hidden="true"></span><span class="wordmark__text">Opi Robotics</span></a>`;
}

function nav(){
  return `
<nav class="site-nav">
  ${wordmark()}
  <div style="display:flex;align-items:center;gap:12px;">
    <a href="/login" class="btn-text" style="display:none" data-login-link>Sign in</a>
    <button class="nav-trigger" type="button" aria-haspopup="true" aria-controls="nav-overlay">
      <span class="nav-trigger__label">Menu</span>
      <span class="nav-trigger__icon" aria-hidden="true"><span></span></span>
    </button>
  </div>
</nav>
<div class="nav-overlay" id="nav-overlay" aria-hidden="true">
  <div class="nav-overlay__top">
    ${wordmark()}
    <button class="nav-close" type="button" aria-label="Close menu"></button>
  </div>
  <div class="nav-overlay__panel">
    <ul class="nav-index">
      ${NAV_ITEMS.map(i => `<li><a href="${i.href}"><span class="idx">${i.n}</span><span class="nav-index__text"><span class="nav-index__label">${i.label}</span><span class="nav-index__desc">${i.desc}</span></span><span class="nav-index__arrow" aria-hidden="true"></span></a></li>`).join('\n      ')}
    </ul>
  </div>
  <div class="nav-overlay__foot">
    <a href="/login">Sign in</a>
    <a href="/register">Request access</a>
    <a href="mailto:hello@opirobotics.com" class="nav-foot__spacer">hello@opirobotics.com</a>
  </div>
</div>`;
}

function footer(){
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-slab">OPI ROBOTICS</div>
    <div class="footer-directory">
      <div class="footer-directory__row">
        <div class="footer-directory__label">Product</div>
        <div class="footer-directory__links">
          <a href="/features">Features</a><a href="/use-cases">Use cases</a><a href="/pricing">Pricing</a><a href="/tool">Free tool</a>
        </div>
      </div>
      <div class="footer-directory__row">
        <div class="footer-directory__label">Company</div>
        <div class="footer-directory__links">
          <a href="/about">About</a><a href="/blog">Blog</a><a href="/contact">Contact</a>
        </div>
      </div>
      <div class="footer-directory__row">
        <div class="footer-directory__label">Account</div>
        <div class="footer-directory__links">
          <a href="/login">Sign in</a><a href="/register">Request access</a>
        </div>
      </div>
      <div class="footer-directory__row">
        <div class="footer-directory__label">Legal</div>
        <div class="footer-directory__links">
          <a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/cookies">Cookie Policy</a>
          <button type="button" data-cookie="manage" style="background:none;border:0;color:var(--text-2);font-size:14.5px;cursor:pointer;padding:0;font-family:inherit;">Cookie Settings</button>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>\u00a9 <span data-year></span> Opi Robotics &middot; a brand of 21 Robots LLC &middot; 530-B Harkle Road, Ste 100, Santa Fe, NM 87505, USA &middot; All rights reserved.</span>
      <div class="footer-social">
        <a href="https://linkedin.com" aria-label="Opi Robotics on LinkedIn" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://x.com" aria-label="Opi Robotics on X" target="_blank" rel="noopener"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="https://github.com" aria-label="Opi Robotics on GitHub" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i></a>
      </div>
    </div>
  </div>
</footer>`;
}

function cookieUI(){
  return `
<div class="cookie-banner" role="dialog" aria-label="Cookie preferences">
  <p>We use essential cookies to run Opi Robotics, and optional analytics cookies to understand how the site is used. You can change this anytime in Cookie Settings.</p>
  <div class="cookie-banner__actions">
    <button class="btn btn-primary" type="button" data-cookie="accept-all"><span class="btn__cell">Accept all</span></button>
    <button class="btn btn-ghost" type="button" data-cookie="reject">Reject non-essential</button>
    <button class="btn-text" type="button" data-cookie="manage">Manage preferences</button>
  </div>
</div>
<div class="cookie-modal">
  <div class="cookie-modal__panel">
    <h3 style="margin-bottom:8px;">Cookie preferences</h3>
    <p class="lede" style="margin-bottom:0;font-size:14px;">Essential cookies keep the site working and can\u2019t be turned off. Choose whether we can use analytics or marketing cookies below.</p>
    <div class="cookie-toggle-row" style="border-top:0;">
      <div><strong>Essential</strong><div class="hint">Required for core functionality.</div></div>
      <label class="switch"><input type="checkbox" checked disabled><span class="track"></span><span class="thumb"></span></label>
    </div>
    <div class="cookie-toggle-row">
      <div><strong>Analytics</strong><div class="hint">Helps us understand product usage.</div></div>
      <label class="switch"><input type="checkbox" id="pref-analytics"><span class="track"></span><span class="thumb"></span></label>
    </div>
    <div class="cookie-toggle-row">
      <div><strong>Marketing</strong><div class="hint">Used to measure campaign performance.</div></div>
      <label class="switch"><input type="checkbox" id="pref-marketing"><span class="track"></span><span class="thumb"></span></label>
    </div>
    <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">
      <button class="btn btn-primary" type="button" data-cookie="save"><span class="btn__cell">Save preferences</span></button>
      <button class="btn btn-ghost" type="button" data-cookie="close-modal">Cancel</button>
    </div>
  </div>
</div>`;
}

function headTags({ slug, title, description }){
  const url = 'https://opirobotics.com' + (slug === '/' ? '' : slug);
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">
<meta property="og:site_name" content="Opi Robotics">
<meta property="og:image" content="https://opirobotics.com/assets/brand/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="https://opirobotics.com/assets/brand/og-image.png">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/components.css">
<link rel="stylesheet" href="/assets/css/pages.css">
<link rel="stylesheet" href="/assets/css/media.css">
<link rel="stylesheet" href="/assets/css/motion.css">`;
}

function scripts(extra){
  return `<script src="/assets/js/main.js"></script>
<script src="/assets/js/nav.js"></script>
<script src="/assets/js/brand.js"></script>
<script src="/assets/js/cookie-consent.js"></script>
<script src="/assets/js/reveal.js"></script>
<script src="/assets/js/media.js"></script>
<script src="/assets/js/hero-reveal.js"></script>
${extra ? extra.map(s => `<script src="${s}"></script>`).join('\n') : ''}`;
}

// Hero + section video layers.
// Sources are FIXED paths under /assets/media/, so dropping a replacement file
// into that folder with the same name swaps the footage with zero code changes.
// A .webm sibling is listed first and simply ignored by the browser when absent.
/* Every format we advertise to the browser, in preference order. A file that
   isn't present in /assets/media simply fails and the browser falls through to
   the next candidate — so you can drop in ANY of these extensions and it just
   works, with no code change. */
const MEDIA_FORMATS = [
  ['webm', 'video/webm'],
  ['mp4',  'video/mp4'],
  ['mov',  'video/quicktime'],
  ['m4v',  'video/x-m4v'],
  ['ogv',  'video/ogg']
];

// Each video has its OWN slot, plus a shared fallback slot. Sources are emitted
// slot-first, fallback-second, so the browser walks the list until a file
// actually exists: /assets/media/hero-pricing.mp4 wins if you drop it in,
// otherwise that page quietly uses the shared /assets/media/hero.mp4.
// Per-section footage is therefore opt-in per file, with zero code changes.
function videoLayer({ name, fallback, className, poster }){
  const slots = [name, fallback]
    .filter(Boolean)
    .filter((slot, i, all) => all.indexOf(slot) === i);
  const sources = slots
    .map(slot => MEDIA_FORMATS
      .map(([ext, mime]) => `    <source src="/assets/media/${slot}.${ext}" type="${mime}">`)
      .join('\n'))
    .join('\n');
  return `<video class="${className}" data-media="${name}" data-media-slots="${slots.join(',')}" autoplay muted loop playsinline preload="metadata" poster="/assets/media/${poster || name + '-poster.jpg'}" aria-hidden="true" tabindex="-1">
${sources}
  </video>`;
}

// A framed section video with copy layered on top — used for the product /
// perception sections. Replace /assets/media/<name>.mp4 to change the footage.
function mediaVideo({ name, fallback, body, shape, align, caption }){
  return `<div class="media-frame media-frame--${shape || 'wide'}">
  ${videoLayer({ name, fallback: fallback || 'product', className: 'media-video' })}
  <div class="media-frame__scrim" aria-hidden="true"></div>
  <div class="media-frame__body${align === 'center' ? ' media-frame__body--center' : ''}">
${body}
  </div>
</div>${caption ? `\n<p class="media-caption">${caption}</p>` : ''}`;
}

function heroStage({ eyebrow, heading, lede, ctas, extraStage, compact, heroVideo }){
  return `
<div class="hero-stage${compact ? ' hero-stage--compact' : ''}">
  <div class="starfield" aria-hidden="true"></div>
  ${videoLayer({ name: heroVideo || 'hero', fallback: 'hero', className: 'hero-video' })}
  <div class="hero-scrim" aria-hidden="true"></div>
  <div class="horizon-line" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-content__main">
      <div class="container">
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
        ${heading ? `<h1 class="hero-heading">${heading}</h1>` : ''}
        ${lede ? `<p class="lede hero-lede">${lede}</p>` : ''}
        ${ctas ? `<div class="hero-ctas">${ctas}</div>` : ''}
      </div>
    </div>
    ${extraStage ? `<div class="hero-foot">
      <div class="container">${extraStage}</div>
    </div>` : ''}
  </div>
</div>
<div class="hero-spacer${compact ? ' hero-spacer--sm' : ''}"></div>`;
}

function finale(text, eyebrow){
  return `
<div class="finale">
  <div>
    <p class="eyebrow">${eyebrow || 'OPI ROBOTICS'}</p>
    <p>${text}</p>
  </div>
</div>`;
}

function page({ slug, title, description, hero, sheet, finaleText, finaleEyebrow, extraScripts, bodyAttrs }){
  const html = `<!doctype html>
<html lang="en">
<head>
${headTags({ slug, title, description })}
</head>
<body${bodyAttrs ? ' ' + bodyAttrs : ''}>
<a href="#main" class="skip-link">Skip to content</a>
<div class="route-progress"></div>
${nav()}
${hero}
<main id="main" class="peel-sheet">
  <div class="container">
${sheet}
  </div>
</main>
${finale(finaleText, finaleEyebrow)}
${footer()}
${cookieUI()}
${scripts(extraScripts)}
</body>
</html>`;
  const outDir = slug === '/' ? ROOT : path.join(ROOT, slug.replace(/^\//,''));
  fs.mkdirSync(outDir, { recursive:true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log('wrote', slug);
}

function btnPrimary(label, href, icon){
  return `<a href="${href}" class="btn btn-primary"><span class="btn__cell">${label}</span><span class="btn__cell"><i class="fa-solid ${icon||'fa-arrow-right'}"></i></span></a>`;
}
function btnGhost(label, href){ return `<a href="${href}" class="btn btn-ghost">${label}</a>`; }
function btnText(label, href){ return `<a href="${href}" class="btn-text">${label}</a>`; }

function rowCard(idx, title, body, reveal){
  return `<div class="row-card" data-reveal="${reveal||'rise'}">
    <div class="row-card__idx">${idx}</div>
    <div class="row-card__body"><h3>${title}</h3><p>${body}</p></div>
  </div>`;
}

module.exports = { NAV_ITEMS, nav, footer, cookieUI, headTags, scripts, heroStage, finale, page, btnPrimary, btnGhost, btnText, rowCard, videoLayer, mediaVideo };
