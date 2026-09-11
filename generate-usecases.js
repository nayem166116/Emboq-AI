const { page, heroStage, btnPrimary, btnGhost } = require('./build.js');

const hero = heroStage({
  heroVideo: 'hero-usecases',
  eyebrow: 'USE CASES',
  heading: 'Physical work, mapped.',
  lede: 'Four verticals where perception failures are the most expensive \u2014 and where Opi Robotics is already in production.',
  ctas: `${btnPrimary('Request access', '/register')}`,
  compact: true
});

function panel(idx, title, challenge, approach, outcome, flip){
  return `
<section class="section">
  <div style="display:grid;grid-template-columns:${flip?'5fr 7fr':'7fr 5fr'};gap:var(--sp-5);align-items:start;" data-reveal="rise">
    <div style="order:${flip?2:1};">
      <p class="eyebrow">${idx} \u2014 ${title}</p>
      <h2 style="margin-top:16px;">${challenge}</h2>
      <p class="lede" style="margin-top:18px;max-width:640px;">${approach}</p>
    </div>
    <div style="order:${flip?1:2};background:var(--surface);border:1px solid var(--border);border-radius:var(--r-md);padding:var(--card-pad);">
      <span class="badge">OUTCOME</span>
      <p style="margin-top:16px;color:var(--text-1);font-size:1.2rem;line-height:1.4;">${outcome}</p>
    </div>
  </div>
</section>`;
}

const p1c = "Torque and alignment drift on fastening cells is often invisible until a downstream defect shows up in quality \u2014 sometimes thousands of units later.";
const p1a = "Opi Robotics watches fastening force curves and alignment tolerances cell-by-cell, flagging drift against the cell\u2019s own baseline rather than a fixed OEM spec.";
const p1o = "A tier-1 supplier running door-module assembly cut downstream torque-related rework by identifying drift an average of 6 shifts before it reached quality control.";

const p2c = "Mixed AMR fleets and conveyor junctions are hard to coordinate safely at scale, and near-misses rarely get logged until there\u2019s a collision.";
const p2a = "A shared spatial model gives every AMR and fixed conveyor junction the same live read of congestion and blocked paths, rather than each robot reasoning alone.";
const p2o = "One regional fulfillment site reduced AMR idle-routing time by 19% and cut logged near-miss events by more than half within the first quarter.";

const p3c = "Bearing and seal wear on high-speed fillers and packaging lines tends to fail suddenly, often mid-shift, with expensive cleanup and changeover cost.";
const p3a = "Vibration and thermal sensing on rotating components builds a wear curve per asset, with lead time on failure typically measured in weeks, not hours.";
const p3o = "A beverage co-packer moved from reactive to scheduled bearing replacement, avoiding an estimated 3\u20134 unplanned line stops per quarter.";

const p4c = "Mixed-age fleets of loaders and excavators are expensive to retrofit with OEM telematics, and structural stress patterns vary heavily by operator.";
const p4a = "Opi Robotics\u2019s sensor-agnostic perception layer reads structural and hydraulic stress patterns from retrofit sensors, without requiring OEM-specific hardware.";
const p4o = "A yard operator with a 40-unit mixed fleet extended average maintenance intervals by 22% after establishing per-unit stress baselines.";

const sheet = `
${panel('01','Automotive final assembly', p1c, p1a, p1o)}
${panel('02','Warehousing & logistics', p2c, p2a, p2o, true)}
${panel('03','Food & beverage lines', p3c, p3a, p3o)}
${panel('04','Heavy equipment yards', p4c, p4a, p4o, true)}

<section class="section" style="text-align:center;">
  <div data-reveal="rise">
    <h2 style="max-width:600px;margin:0 auto;">Don\u2019t see your line above? Most deployments start with one cell.</h2>
    <div style="display:flex;gap:16px;justify-content:center;margin-top:32px;flex-wrap:wrap;">${btnPrimary('Request access', '/register')}${btnGhost('Talk to the team', '/contact')}</div>
  </div>
</section>
`;

page({
  slug:'/use-cases',
  title:'Use cases \u2014 Opi Robotics in production',
  description:'How Opi Robotics is deployed across automotive assembly, warehousing, food & beverage, and heavy equipment yards.',
  hero, sheet,
  finaleEyebrow:'FOUR VERTICALS, ONE STACK',
  finaleText:'The physical world doesn\u2019t change by industry. The failure modes do.'
});
