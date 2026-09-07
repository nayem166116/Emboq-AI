const { page, heroStage, btnPrimary, btnText } = require('./build.js');

const POSTS = [
  {
    slug:'/blog/perception-stack-industrial-robots',
    date:'2026-06-02',
    dateLabel:'June 2, 2026',
    title:'What a perception stack actually needs to survive a factory floor',
    excerpt:'Lab-grade computer vision rarely survives contact with a real production line. Here is what breaks first, and what a durable perception stack does differently.',
    body:`
<p>Most computer vision demos are built in conditions no factory floor will ever offer: clean lighting, a static camera, a single part orientation. The moment that same model meets a line running three shifts, dust on the lens, and a product mix that changes weekly, accuracy drops in ways that rarely show up in a slide deck.</p>
<h2>The three failure modes that show up first</h2>
<p><strong>Lighting drift.</strong> Ambient light on most floors changes throughout the day \u2014 skylights, shift changes, welding flashes from a neighboring cell. A model calibrated at 9am can silently degrade by 2pm. Any perception stack that doesn't continuously re-normalize against its own recent history will eventually drift into false confidence.</p>
<p><strong>Sensor fouling.</strong> Cameras get dusty. Vibration sensors loosen. Thermal sensors get recalibrated by maintenance without anyone logging it. A stack that treats every sensor reading as ground truth, rather than cross-checking it against other signals on the same asset, will eventually act on bad data.</p>
<p><strong>Distribution shift.</strong> The part mix on a line six months from now is rarely identical to the part mix used to train the model. Without a retraining loop that treats new product variants as expected, not exceptional, accuracy quietly decays every quarter.</p>
<h2>What holds up in practice</h2>
<p>The perception stacks that actually survive a floor share three traits. First, they fuse multiple sensor types for the same physical event \u2014 a bearing failure shows up as vibration, heat, and eventually sound, and a system that requires agreement across at least two of those is far more resistant to a single fouled sensor. Second, they baseline against the asset's own history rather than a fleet-wide average, because two machines of the same model rarely age identically. Third, they treat every prediction as provisional until it's been checked against an outcome \u2014 a flagged bearing that runs another six months without failing should adjust the model's confidence, not get quietly ignored.</p>
<h2>Why this matters before you buy anything</h2>
<p>If you're evaluating a physical AI vendor, ask them directly how their model handles lighting drift, sensor fouling, and distribution shift \u2014 not just what their headline accuracy number is on a validation set. The answer will tell you more about how the system performs in month eight than any demo will in week one.</p>`
  },
  {
    slug:'/blog/roi-of-embodied-ai',
    date:'2026-04-18',
    dateLabel:'April 18, 2026',
    title:'The real payback math behind embodied AI on the plant floor',
    excerpt:'Most ROI claims for industrial AI skip the denominator. Here is the actual math worth running before you sign anything.',
    body:`
<p>Every industrial AI vendor, including us, will show you a savings number. The number that matters more is the one underneath it: what does it cost to reach that savings, and how long does it take to get there?</p>
<h2>Start with the cost of the status quo</h2>
<p>Unplanned downtime cost is usually understated because most sites only track the direct cost \u2014 the line stoppage \u2014 and miss the surrounding cost: expedited parts, overtime for the repair crew, and the schedule ripple across downstream stations. A more complete number is: <em>(downtime hours \u00d7 fully loaded cost per hour) + (average expedite premium \u00d7 incidents per month)</em>.</p>
<h2>Then be honest about recovery rates</h2>
<p>No monitoring system recovers 100% of unplanned downtime. In practice, well-instrumented predictive maintenance programs recover somewhere between 30% and 55% of unplanned downtime cost in the first year, with the number climbing as the model's baseline matures. Vendors that promise higher than that in year one are usually counting savings that were already achievable through basic scheduled maintenance.</p>
<h2>The part everyone forgets: implementation drag</h2>
<p>The real payback period isn't calculation-start to calculation-end \u2014 it's contract-signed to model-trusted. Most sites spend 2\u20134 weeks on instrumentation and another 2\u20134 weeks letting the model build a baseline before its first recommendation is trustworthy enough to act on. A payback estimate that ignores this ramp will always look better on paper than it does on your floor.</p>
<h2>A simple way to sanity-check any vendor's number</h2>
<p>Take their promised annual savings, divide by 12, and compare that monthly figure to your platform cost per month. If the ratio implies payback in under a month, ask what recovery rate they assumed \u2014 if it's above 60% in year one, that's the number to push back on. Our own <a href="/tool">Automation Payback Estimator</a> defaults to a 42% downtime recovery rate and a 24% labor recovery rate, which reflects what we've seen hold up across real deployments, not a best-case scenario.</p>`
  },
  {
    slug:'/blog/safety-case-for-physical-ai',
    date:'2026-02-09',
    dateLabel:'February 9, 2026',
    title:'Building the safety case for physical AI before your first pilot',
    excerpt:'If physical AI can trigger a stop or flag a hazard, your safety team needs to sign off before, not after, the pilot starts. Here is how to structure that conversation.',
    body:`
<p>The fastest way to stall a physical AI pilot is to loop safety in after the fact. If a system's outputs can ever influence a stop, a hold, or a maintenance action tied to a hazard, your EHS and safety engineering teams are stakeholders from day one \u2014 not reviewers at the end.</p>
<h2>Separate perception from action, explicitly</h2>
<p>The clearest way to get safety buy-in early is to draw a hard line between what the system perceives and what it's allowed to do about it. In an initial pilot, perception should run in a purely advisory mode: it can flag a risk to an operator or engineer, but nothing physical happens automatically. Only after a defined trust period \u2014 typically measured in weeks of matched predictions against real outcomes \u2014 should any automated action be considered, and even then, only within a scoped safety envelope your team defines, not the vendor's.</p>
<h2>Ask for the evidence trail, not just the alert</h2>
<p>Every flagged event should come with the underlying sensor evidence that triggered it, not just a notification. This matters for two reasons: your team can independently verify whether the flag was correct, and if an incident ever does occur, you have a documented, auditable trail of what the system perceived and when \u2014 which is exactly what an internal investigation or regulator will ask for.</p>
<h2>Define the override path before you need it</h2>
<p>Every automated hold or stop needs a documented, physically accessible override that doesn't depend on the AI vendor's system being reachable. This sounds obvious, but it's the single most common gap we see in early pilots \u2014 teams design the happy path in detail and leave the failure path as an afterthought.</p>
<h2>Bring safety into the vendor conversation directly</h2>
<p>The vendors worth working with will want your safety engineers in the room during scoping, not just procurement and operations. If a vendor resists that conversation, or can't clearly describe how their system fails safe when a sensor goes offline, that's a signal worth taking seriously before you sign anything.</p>`
  }
];

const hero = heroStage({
  heroVideo: 'hero-blog',
  eyebrow: 'BLOG',
  heading: 'Notes from the floor.',
  lede: 'Field-level thinking on physical AI, industrial reliability, and what it actually takes to deploy perception systems that hold up in production.',
  compact: true
});

const sheet = `
<section class="section">
  ${POSTS.map(p => `
  <a href="${p.slug}" class="blog-row" data-reveal="rise" style="display:grid;">
    <time datetime="${p.date}">${p.dateLabel}</time>
    <div><h3>${p.title}</h3><p>${p.excerpt}</p></div>
  </a>`).join('\n')}
</section>
`;

page({
  slug:'/blog',
  title:'Blog \u2014 Emboq AI',
  description:'Field-level writing on physical AI, industrial reliability, safety cases, and the real economics of embodied AI deployments.',
  hero, sheet,
  finaleEyebrow:'NOTES FROM THE FLOOR',
  finaleText:'Written by the people who deploy this, not just market it.'
});

POSTS.forEach((p, i) => {
  const next = POSTS[(i+1) % POSTS.length];
  const articleHero = heroStage({
    heroVideo: 'hero-blog-post',
    eyebrow: 'BLOG \u00b7 ' + p.dateLabel.toUpperCase(),
    heading: p.title,
    lede: p.excerpt,
    compact: true
  });
  const articleSheet = `
<section class="section">
  <article class="prose" data-reveal="fade">
    ${p.body}
  </article>
  <div class="rule" style="margin:var(--sp-6) 0;"></div>
  <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;align-items:center;">
    <span class="hint">Next: ${next.title}</span>
    ${btnText('Read next \u2192', next.slug)}
  </div>
</section>
`;
  page({
    slug:p.slug,
    title:p.title + ' \u2014 Emboq AI',
    description:p.excerpt,
    hero:articleHero, sheet:articleSheet,
    finaleEyebrow:'EMBOQ AI BLOG',
    finaleText:'Back to the floor.'
  });
});
