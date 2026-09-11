const { page, heroStage, btnPrimary, btnGhost } = require('./build.js');

const hero = heroStage({
  heroVideo: 'hero-pricing',
  eyebrow: 'PRICING',
  heading: 'Priced for the floor, not the seat count.',
  lede: 'Every plan is priced per monitored node \u2014 a cell, line, or asset \u2014 because that\'s what actually scales your risk.',
  ctas: `${btnPrimary('Request access', '/register')}`,
  compact: true
});

const rows = [
  ['Perception nodes included', '25 nodes', '150 nodes', 'Unlimited'],
  ['Predictive wear models', 'Standard library', 'Standard + custom tuning', 'Fully custom, per asset'],
  ['Safety envelope tooling', '<span class="no">\u2014</span>', '<span class="yes">Included</span>', '<span class="yes">Included</span>'],
  ['Fleet-wide learning', '<span class="no">\u2014</span>', 'Single site', 'Multi-site'],
  ['Integration connectors', 'OPC-UA, MQTT', '+ Modbus, PROFINET', '+ Custom OT/MES connectors'],
  ['Deployment model', 'Cloud', 'Cloud or hybrid', 'On-prem available'],
  ['Support SLA', 'Business hours, email', '24/5, priority queue', '24/7, named engineer'],
  ['Audit & compliance export', '<span class="no">\u2014</span>', '<span class="yes">Included</span>', '<span class="yes">Included</span>'],
];

const sheet = `
<section class="section">
  <div class="matrix-scroll">
    <table class="matrix" data-reveal="fade">
      <thead>
        <tr>
          <th></th>
          <th class="plan-head">Starter<span class="plan-price">From $340/node/mo</span></th>
          <th class="plan-head">Scale<span class="plan-price">From $260/node/mo</span></th>
          <th class="plan-head">Enterprise<span class="plan-price">Custom pricing</span></th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('\n        ')}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>${btnGhost('Start with Starter', '/register')}</td>
          <td>${btnPrimary('Start with Scale', '/register')}</td>
          <td>${btnGhost('Talk to sales', '/contact')}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <p class="hint" style="margin-top:20px;">Scale is the right starting point for most multi-line facilities. Node pricing decreases at volume \u2014 talk to sales for a site-wide quote.</p>
</section>

<section class="section section--light">
  <div class="section-head" data-reveal="rise"><p class="eyebrow">FREQUENTLY ASKED</p></div>
  <div data-reveal="stagger">
    <div class="row-card" style="grid-template-columns:1fr;"><h3>What counts as a "node"?</h3><p style="color:var(--text-2);margin-top:8px;">A node is one monitored cell, machine, or fixed asset \u2014 not a user seat. A single line with 6 monitored stations counts as 6 nodes regardless of how many people log in.</p></div>
    <div class="row-card" style="grid-template-columns:1fr;"><h3>Do we need new sensors?</h3><p style="color:var(--text-2);margin-top:8px;">Most sites start with existing PLC tags and a light sensor add-on. A site walk during onboarding determines exactly what, if anything, needs to be added.</p></div>
    <div class="row-card" style="grid-template-columns:1fr;"><h3>Can we run this on-prem?</h3><p style="color:var(--text-2);margin-top:8px;">Yes, on Enterprise. Perception inference already runs at the edge on every plan \u2014 on-prem adds a fully local control plane for sites with strict data residency needs.</p></div>
    <div class="row-card" style="grid-template-columns:1fr;"><h3>How long is a typical contract?</h3><p style="color:var(--text-2);margin-top:8px;">Annual terms are standard. Pilots are scoped per-cell over 8\u201312 weeks before a site-wide rollout \u2014 talk to sales for a scoped pilot quote.</p></div>
  </div>
</section>
`;

page({
  slug:'/pricing',
  title:'Pricing \u2014 Opi Robotics',
  description:'Opi Robotics pricing plans compared by capability: Starter, Scale, and Enterprise, priced per monitored node.',
  hero, sheet,
  finaleEyebrow:'NODE-BASED PRICING',
  finaleText:'You pay for what you monitor \u2014 not who logs in.'
});
