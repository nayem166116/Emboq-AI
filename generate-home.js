const { page, heroStage, btnPrimary, btnGhost, btnText, rowCard, mediaVideo } = require('./build.js');

const hero = heroStage({
  heroVideo: 'hero-home',
  eyebrow: 'PHYSICAL AI FOR INDUSTRIAL AUTOMATION',
  heading: 'Machines that read the floor the way your best operator does.',
  lede: 'Emboq AI gives robots, fixed automation, and inspection systems a shared perception and decision layer \u2014 so drift, wear, and risk get caught before they become downtime.',
  ctas: `${btnPrimary('Request access', '/register')}${btnGhost('See how it works', '/features')}`,
  extraStage: `
    <div class="hero-stats">
      <div class="stat"><b>42%</b><span>AVG. REDUCTION IN UNPLANNED DOWNTIME</span></div>
      <div class="stat"><b>9</b><span>INDUSTRIAL VERTICALS IN PRODUCTION</span></div>
      <div class="stat"><b>&lt;40ms</b><span>EDGE PERCEPTION LATENCY</span></div>
    </div>`
});

const sheet = `
<section class="section">
  <div class="section-head" data-reveal="rise">
    <p class="eyebrow">THE PERCEPTION STACK</p>
    <h2 style="margin-top:16px;">Three layers, one continuous read of the physical world.</h2>
  </div>
  ${rowCard('01','Perceive','Fuse vision, vibration, thermal, and PLC signal data into a single spatial model of each machine and cell \u2014 refreshed continuously, not sampled in batches.')}
  ${rowCard('02','Predict','Every asset gets a rolling forecast of wear, drift, and failure risk, trained on your own equipment rather than a generic fleet average.')}
  ${rowCard('03','Act','Recommendations route straight into your MES, CMMS, or PLC logic \u2014 or trigger a supervised stop when a safety envelope is at risk.')}

  <div style="margin-top:var(--sp-5);" data-reveal="fade">
  ${mediaVideo({
    name:'stack',
    shape:'wide',
    caption:'Drop your own footage at /assets/media/stack.mp4 to replace this',
    body:`    <p class="eyebrow">THE STACK, RUNNING</p>
    <h3 style="margin-top:14px;font-size:clamp(1.5rem,1.2rem + 1.2vw,2.1rem);max-width:620px;">One perception layer, every machine on the line.</h3>
    <p class="lede" style="max-width:560px;">Perceive, predict, and act run as a single continuous loop at the edge \u2014 not three tools stitched together after the fact.</p>`
  })}
  </div>
</section>

<section class="section section--light" style="text-align:center;">
  <div data-reveal="mask" style="max-width:760px;margin:0 auto;">
    <p class="eyebrow" style="justify-content:center;">A WORKING PRINCIPLE</p>
    <p class="mask-inner" style="display:block;font-size:clamp(1.4rem,1.1rem+1.6vw,2rem);line-height:1.35;margin-top:20px;color:var(--text-1);">"A machine that can't perceive its own wear can only ever be maintained on a schedule \u2014 never on reality."</p>
  </div>
</section>

<section class="section">
  <div class="section-head" data-reveal="rise">
    <p class="eyebrow">WHERE IT RUNS</p>
    <h2 style="margin-top:16px;">Built for the floor, not the pilot deck.</h2>
  </div>
  ${rowCard('01','Automotive final assembly','Torque, alignment, and fastening cells monitored in real time, with drift flagged before it produces a defect.')}
  ${rowCard('02','Warehousing & logistics','AMR fleets and conveyor junctions get a shared spatial map, cutting collision risk and idle routing time.')}
  ${rowCard('03','Food & beverage lines','Vibration and thermal sensing on fillers and packaging lines catches bearing wear weeks before failure.')}
  ${rowCard('04','Heavy equipment yards','Structural and hydraulic stress patterns tracked across a mixed-age fleet without retrofitting OEM sensors.')}
  <div style="margin-top:32px;">${btnText('See all use cases \u2192', '/use-cases')}</div>
</section>

<section class="section">
  <div data-reveal="fade">
  ${mediaVideo({
    name:'horizon',
    fallback:'hero',
    shape:'wide',
    align:'center',
    body:`    <p class="eyebrow" style="justify-content:center;">THE HORIZON LINE</p>
    <h2 style="margin-top:18px;max-width:720px;">Perception has always had a horizon. We're moving it deeper into the physical world.</h2>
    <p class="lede" style="margin:20px auto 0;max-width:560px;">Every Emboq deployment extends that line a little further \u2014 from a single cell, to a line, to a site, to a fleet.</p>`
  })}
  </div>
</section>

<section class="section">
  <div class="section-head" data-reveal="rise">
    <p class="eyebrow">DEPLOYMENT</p>
    <h2 style="margin-top:16px;">Live on your floor in weeks, not quarters.</h2>
  </div>
  ${rowCard('01','Instrument','We map your existing sensors and PLC tags first \u2014 most sites need little to no new hardware to start.')}
  ${rowCard('02','Calibrate','Models are trained against your equipment\'s own baseline for 2\u20134 weeks before any recommendation goes live.')}
  ${rowCard('03','Operate','Perception runs continuously at the edge, with a supervised rollout of automated actions once trust thresholds are met.')}
</section>

<section class="section section--light">
  <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:var(--sp-5);align-items:center;" class="tool-teaser" data-reveal="rise">
    <div>
      <p class="eyebrow">FREE TOOL</p>
      <h2 style="margin-top:16px;">What would this be worth on your line?</h2>
      <p class="lede" style="margin-top:16px;">Use the Automation Payback Estimator to model monthly savings and payback time from your own downtime and labor numbers.</p>
      <div style="margin-top:28px;">${btnPrimary('Open the estimator', '/tool', 'fa-calculator')}</div>
    </div>
    <div class="tool-panel" style="font-family:var(--font-mono);font-size:13.5px;color:var(--text-2);">
      <div class="result-line"><span>Est. monthly savings</span><b style="color:var(--a);">$18,400</b></div>
      <div class="result-line"><span>Est. payback</span><b>\u007e6 weeks</b></div>
    </div>
  </div>
</section>

<section class="section" style="text-align:center;">
  <div data-reveal="rise">
    <h2 style="max-width:640px;margin:0 auto;">Ready to see your floor differently?</h2>
    <div style="display:flex;gap:16px;justify-content:center;margin-top:32px;flex-wrap:wrap;">${btnPrimary('Request access', '/register')}${btnGhost('Talk to the team', '/contact')}</div>
  </div>
</section>
`;

page({
  slug:'/',
  title:'Emboq AI \u2014 Physical AI for industrial automation',
  description:'Emboq AI gives industrial robots and fixed automation a shared perception and decision layer, catching drift, wear, and risk before it becomes downtime.',
  hero, sheet,
  finaleEyebrow:'EMBOQ AI',
  finaleText:'The horizon keeps moving. So do we.'
});
