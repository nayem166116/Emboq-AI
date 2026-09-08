const { page, heroStage, btnPrimary, btnGhost } = require('./build.js');

/* ---------------- ABOUT ---------------- */
const aboutHero = heroStage({
  heroVideo: 'hero-about',
  eyebrow: 'ABOUT',
  heading: 'We think machines should understand the space they work in.',
  lede: 'TTA Robotics was built by engineers who spent years watching perfectly good automation fail for reasons no dashboard ever flagged.',
  compact: true
});

const aboutSheet = `
<section class="section">
  <div class="section-head" data-reveal="rise">
    <p class="eyebrow">WHY WE EXIST</p>
    <h2 style="margin-top:16px;max-width:760px;">Most industrial automation can act. Very little of it can actually perceive.</h2>
  </div>
  <p class="lede" data-reveal="rise">A robot arm can repeat a motion with sub-millimeter precision for a decade. What it usually can't do is notice that the part it's holding has shifted, that a neighboring machine is vibrating differently than it did last month, or that a maintenance window closed three weeks too late. TTA Robotics exists to close that gap \u2014 giving physical systems a continuous, shared read of the space and equipment around them.</p>
</section>

<section class="section section--light">
  <div class="section-head" data-reveal="rise"><p class="eyebrow">HOW WE WORK</p></div>
  <div data-reveal="stagger">
    <div class="row-card" style="grid-template-columns:90px 1fr;"><div class="row-card__idx">01</div><div class="row-card__body"><h3>We deploy on real floors, not just in pilots</h3><p>Every model we ship has been validated against production equipment before it reaches a customer \u2014 not just a benchmark dataset.</p></div></div>
    <div class="row-card" style="grid-template-columns:90px 1fr;"><div class="row-card__idx">02</div><div class="row-card__body"><h3>We treat safety engineering as a co-owner, not a reviewer</h3><p>Any capability that can influence a physical action is scoped with a customer's safety team from the first conversation, not after a pilot is already running.</p></div></div>
    <div class="row-card" style="grid-template-columns:90px 1fr;"><div class="row-card__idx">03</div><div class="row-card__body"><h3>We publish our reasoning, including the uncomfortable parts</h3><p>Our <a href="/blog" style="text-decoration:underline;">blog</a> includes the failure modes and tradeoffs we've hit, not just the wins \u2014 because that's what a buyer actually needs to evaluate us.</p></div></div>
  </div>
</section>

<section class="section">
  <div class="section-head" data-reveal="rise"><p class="eyebrow">WHERE WE'RE HEADED</p></div>
  <div style="display:flex;flex-direction:column;gap:0;" data-reveal="stagger">
    <div style="display:grid;grid-template-columns:140px 1fr;gap:24px;padding:20px 0;border-top:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">2024</span><p style="color:var(--text-2);margin:0;">TTA Robotics LLC incorporated in Illinois on October 18, 2024; first perception models deployed on automotive fastening cells.</p></div>
    <div style="display:grid;grid-template-columns:140px 1fr;gap:24px;padding:20px 0;border-top:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">2025</span><p style="color:var(--text-2);margin:0;">Expanded to warehousing and food & beverage lines; safety envelope tooling shipped.</p></div>
    <div style="display:grid;grid-template-columns:140px 1fr;gap:24px;padding:20px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">2026</span><p style="color:var(--text-2);margin:0;">In production across 9 industrial verticals; building toward fleet-wide learning across sites.</p></div>
  </div>
</section>

<section class="section section--light">
  <div class="section-head" data-reveal="rise">
    <p class="eyebrow">WHO RUNS IT</p>
    <h2 style="margin-top:16px;max-width:700px;">A small team, accountable by name.</h2>
  </div>
  <div data-reveal="stagger">
    <div class="row-card" style="grid-template-columns:90px 1fr;"><div class="row-card__idx">01</div><div class="row-card__body"><h3>Jonathan Alves \u2014 Founder &amp; CEO</h3><p>Sets product direction and owns customer relationships from the first conversation through deployment.</p></div></div>
    <div class="row-card" style="grid-template-columns:90px 1fr;"><div class="row-card__idx">02</div><div class="row-card__body"><h3>Victor Trigo \u2014 Manager</h3><p>Runs delivery and floor operations \u2014 the person your maintenance and safety teams work with day to day.</p></div></div>
  </div>
</section>

<section class="section">
  <div class="section-head" data-reveal="rise"><p class="eyebrow">COMPANY DETAILS</p></div>
  <div style="display:flex;flex-direction:column;gap:0;max-width:820px;" data-reveal="stagger">
    <div style="display:grid;grid-template-columns:210px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">LEGAL NAME</span><p style="color:var(--text-2);margin:0;">TTA ROBOTICS LLC</p></div>
    <div style="display:grid;grid-template-columns:210px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">ENTITY TYPE</span><p style="color:var(--text-2);margin:0;">Limited Liability Company</p></div>
    <div style="display:grid;grid-template-columns:210px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">JURISDICTION</span><p style="color:var(--text-2);margin:0;">Illinois, United States</p></div>
    <div style="display:grid;grid-template-columns:210px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">FILE NUMBER</span><p style="color:var(--text-2);margin:0;">LLC_15352426 (15352426)</p></div>
    <div style="display:grid;grid-template-columns:210px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">INCORPORATED</span><p style="color:var(--text-2);margin:0;">October 18, 2024 \u2014 status: Active</p></div>
    <div style="display:grid;grid-template-columns:210px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">REGISTERED ADDRESS</span><p style="color:var(--text-2);margin:0;">1632 Todd Farm Drive, Elgin, IL 60123, United States</p></div>
    <div style="display:grid;grid-template-columns:210px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);"><span class="hint" style="font-family:var(--font-mono);">REGISTERED AGENT</span><p style="color:var(--text-2);margin:0;">Northwest Registered Agent Service, Inc \u2014 2501 Chatham Rd Ste N, Springfield, IL 62704-4188</p></div>
  </div>
</section>

<section class="section" style="text-align:center;">
  <div data-reveal="rise">
    <h2 style="max-width:600px;margin:0 auto;">Want to see it on your floor?</h2>
    <div style="display:flex;gap:16px;justify-content:center;margin-top:32px;flex-wrap:wrap;">${btnPrimary('Request access', '/register')}${btnGhost('Contact us', '/contact')}</div>
  </div>
</section>
`;

page({
  slug:'/about',
  title:'About \u2014 TTA Robotics',
  description:'TTA Robotics builds physical AI perception systems for industrial automation. Learn why we exist and how we work.',
  hero:aboutHero, sheet:aboutSheet,
  finaleEyebrow:'TTA ROBOTICS',
  finaleText:'Built by people who\u2019ve stood on the floor at 2am waiting for a line to restart.'
});

/* ---------------- CONTACT ---------------- */
const contactHero = heroStage({
  heroVideo: 'hero-contact',
  eyebrow: 'CONTACT',
  heading: 'Talk to the team building this.',
  lede: 'No forms that go nowhere \u2014 reach us directly, or request access to get started.',
  compact: true
});

const contactSheet = `
<section class="section">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-5);" data-reveal="stagger">
    <div class="row-card" style="grid-template-columns:1fr;border-top:1px solid var(--border);">
      <div class="row-card__body">
        <span class="badge">SALES</span>
        <h3 style="margin-top:16px;">Evaluating TTA Robotics for your site</h3>
        <p style="margin-top:8px;">Talk through fit, pricing, and a scoped pilot for your line.</p>
        <a href="mailto:sales@ttarobotics.com" class="row-link" style="margin-top:20px;"><i class="fa-solid fa-envelope"></i> sales@ttarobotics.com</a>
      </div>
    </div>
    <div class="row-card" style="grid-template-columns:1fr;border-top:1px solid var(--border);">
      <div class="row-card__body">
        <span class="badge">SUPPORT</span>
        <h3 style="margin-top:16px;">Existing customer support</h3>
        <p style="margin-top:8px;">For active deployments \u2014 our support SLA depends on your plan.</p>
        <a href="mailto:support@ttarobotics.com" class="row-link" style="margin-top:20px;"><i class="fa-solid fa-envelope"></i> support@ttarobotics.com</a>
      </div>
    </div>
    <div class="row-card" style="grid-template-columns:1fr;border-top:1px solid var(--border);">
      <div class="row-card__body">
        <span class="badge">PRESS</span>
        <h3 style="margin-top:16px;">Media & press inquiries</h3>
        <p style="margin-top:8px;">Interview requests, briefings, and press assets.</p>
        <a href="mailto:press@ttarobotics.com" class="row-link" style="margin-top:20px;"><i class="fa-solid fa-envelope"></i> press@ttarobotics.com</a>
      </div>
    </div>
    <div class="row-card" style="grid-template-columns:1fr;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
      <div class="row-card__body">
        <span class="badge">CAREERS</span>
        <h3 style="margin-top:16px;">Join the team</h3>
        <p style="margin-top:8px;">We hire engineers who've spent real time on plant floors.</p>
        <a href="mailto:careers@ttarobotics.com" class="row-link" style="margin-top:20px;"><i class="fa-solid fa-envelope"></i> careers@ttarobotics.com</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-head" data-reveal="rise"><p class="eyebrow">OFFICE</p></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-5);" data-reveal="stagger">
    <div class="row-card" style="grid-template-columns:1fr;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
      <div class="row-card__body">
        <span class="badge">HEADQUARTERS</span>
        <h3 style="margin-top:16px;">TTA Robotics LLC</h3>
        <p style="margin-top:8px;">1632 Todd Farm Drive<br />Elgin, IL 60123<br />United States</p>
        <p class="hint" style="margin-top:12px;">Illinois limited liability company \u00b7 file no. LLC_15352426</p>
      </div>
    </div>
    <div class="row-card" style="grid-template-columns:1fr;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
      <div class="row-card__body">
        <span class="badge">GENERAL</span>
        <h3 style="margin-top:16px;">Not sure who to write to?</h3>
        <p style="margin-top:8px;">Send it here and we'll route it to the right person the same day.</p>
        <a href="mailto:hello@ttarobotics.com" class="row-link" style="margin-top:20px;"><i class="fa-solid fa-envelope"></i> hello@ttarobotics.com</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--light" style="text-align:center;">
  <div data-reveal="rise">
    <h2 style="max-width:560px;margin:0 auto;">Ready to start without waiting for a call back?</h2>
    <div style="margin-top:28px;">${btnPrimary('Request access', '/register')}</div>
  </div>
</section>
`;

page({
  slug:'/contact',
  title:'Contact \u2014 TTA Robotics',
  description:'Reach the TTA Robotics sales, support, press, or careers team directly.',
  hero:contactHero, sheet:contactSheet,
  finaleEyebrow:'TTA ROBOTICS',
  finaleText:'We read every message ourselves.'
});
