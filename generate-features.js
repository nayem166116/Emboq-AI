const { page, heroStage, btnPrimary, btnGhost, rowCard, mediaVideo } = require('./build.js');

const hero = heroStage({
  heroVideo: 'hero-features',
  eyebrow: 'FEATURES',
  heading: 'Every layer between raw sensor data and a safe decision.',
  lede: 'TTA Robotics is built as one continuous stack \u2014 not a dashboard bolted onto someone else\'s sensors.',
  ctas: `${btnPrimary('Request access', '/register')}`,
  compact: true
});

const sheet = `
<section class="section">
  <div class="section-head" data-reveal="rise"><p class="eyebrow">CORE CAPABILITIES</p></div>
  ${rowCard('01','Perception fusion','Vision, vibration, thermal, acoustic, and existing PLC/OT tags are fused into a single, continuously updated spatial model of each cell \u2014 no separate dashboards per sensor type.')}
  ${rowCard('02','Predictive wear modeling','Component-level degradation curves trained against your own equipment\'s operating history, not a generic OEM duty cycle.')}
  ${rowCard('03','Safety envelope enforcement','Defines physical and operational limits per cell; when perception detects a boundary risk, TTA Robotics can trigger a supervised hold before a person or part is at risk.')}
  ${rowCard('04','Fleet-wide learning','Patterns learned on one line \u2014 a bearing signature, a fastening drift \u2014 propagate to comparable equipment across your other sites, with your review before rollout.')}
  ${rowCard('05','Integration layer','Native connectors for OPC-UA, Modbus TCP, PROFINET, and MQTT, plus a REST API for MES and CMMS systems you already run.')}
  ${rowCard('06','Audit & compliance trail','Every recommendation and automated action is logged with the perception evidence behind it \u2014 built for plants that answer to quality and safety audits.')}
</section>

<section class="section">
  <div data-reveal="fade">
  ${mediaVideo({
    name:'product-features',
    shape:'wide',
    caption:'Continuous tracking of parts, tooling, and people inside a single work envelope.',
    body:`    <p class="eyebrow">THE PRODUCT</p>
    <h3 style="margin-top:14px;font-size:clamp(1.5rem,1.2rem + 1.2vw,2.1rem);max-width:620px;">See the floor the way TTA Robotics sees it.</h3>
    <p class="lede" style="max-width:560px;">Every cell, asset, and decision surfaced in one live spatial view \u2014 built for operators, not dashboards.</p>`
  })}
  </div>
</section>

<section class="section section--light">
  <div class="section-head" data-reveal="rise">
    <p class="eyebrow">UNDER THE HOOD</p>
    <h2 style="margin-top:16px;">Runs at the edge. Reports to the cloud.</h2>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden;" data-reveal="stagger">
    <div style="background:var(--surface);padding:24px;"><span class="badge">LATENCY</span><p style="margin-top:14px;color:var(--text-1);font-size:1.1rem;">&lt; 40ms</p><p class="hint" style="margin-top:6px;">Edge inference, per frame</p></div>
    <div style="background:var(--surface);padding:24px;"><span class="badge">DEPLOYMENT</span><p style="margin-top:14px;color:var(--text-1);font-size:1.1rem;">Cloud, on-prem, or hybrid</p><p class="hint" style="margin-top:6px;">No forced data egress</p></div>
    <div style="background:var(--surface);padding:24px;"><span class="badge">PROTOCOLS</span><p style="margin-top:14px;color:var(--text-1);font-size:1.1rem;">OPC-UA \u00b7 Modbus \u00b7 PROFINET</p><p class="hint" style="margin-top:6px;">Plus MQTT and REST</p></div>
    <div style="background:var(--surface);padding:24px;"><span class="badge">RETENTION</span><p style="margin-top:14px;color:var(--text-1);font-size:1.1rem;">Configurable, 30\u2013365 days</p><p class="hint" style="margin-top:6px;">Sensor + decision logs</p></div>
  </div>
</section>

<section class="section" style="text-align:center;">
  <div data-reveal="rise">
    <h2 style="max-width:600px;margin:0 auto;">See which capabilities fit your line first.</h2>
    <div style="display:flex;gap:16px;justify-content:center;margin-top:32px;flex-wrap:wrap;">${btnPrimary('Request access', '/register')}${btnGhost('View pricing', '/pricing')}</div>
  </div>
</section>
`;

page({
  slug:'/features',
  title:'Features \u2014 TTA Robotics perception stack',
  description:'Perception fusion, predictive wear modeling, safety envelope enforcement, fleet-wide learning, and OT integrations \u2014 the full TTA Robotics stack.',
  hero, sheet,
  finaleEyebrow:'BUILT AS ONE STACK',
  finaleText:'Not a dashboard. A nervous system for the floor.'
});
