const { page, heroStage } = require('./build.js');

const hero = heroStage({
  heroVideo: 'hero-tool',
  eyebrow: 'FREE TOOL',
  heading: 'How fast does this pay for itself?',
  lede: 'The Automation Payback Estimator models monthly savings and payback time from your own downtime and labor numbers \u2014 no account required.',
  compact: true
});

const sheet = `
<section class="section">
  <div class="tool-grid" data-reveal="rise">
    <form id="roi-form" class="tool-panel">
      <h3 style="margin-bottom:24px;">Your line, in numbers</h3>

      <div class="range-row"><label for="in-machines">Machines monitored</label><output id="out-machines">12</output></div>
      <input type="range" id="in-machines" min="1" max="200" value="12" step="1">

      <div class="range-row" style="margin-top:20px;"><label for="in-downtime">Unplanned downtime</label><output id="out-downtime">6 hrs/mo</output></div>
      <input type="range" id="in-downtime" min="0" max="60" value="6" step="1">

      <div class="range-row" style="margin-top:20px;"><label for="in-cost">Cost per downtime hour</label><output id="out-cost">$420/hr</output></div>
      <input type="range" id="in-cost" min="50" max="5000" value="420" step="10">

      <div class="range-row" style="margin-top:20px;"><label for="in-labor">Manual inspection labor cost</label><output id="out-labor">$9,000/mo</output></div>
      <input type="range" id="in-labor" min="0" max="100000" value="9000" step="250">

      <button class="btn btn-primary btn-block" id="roi-submit" type="submit" style="margin-top:28px;">
        <span class="btn__cell btn__cell--label" style="margin:0 auto;">Calculate payback</span>
      </button>
    </form>

    <div>
      <div id="roi-skeleton" style="display:none;">
        <div class="skeleton" style="height:24px;width:60%;margin-bottom:16px;"></div>
        <div class="skeleton" style="height:56px;margin-bottom:12px;"></div>
        <div class="skeleton" style="height:56px;margin-bottom:12px;"></div>
        <div class="skeleton" style="height:56px;"></div>
      </div>
      <div id="roi-result" class="tool-panel" style="display:none;">
        <h3 style="margin-bottom:8px;">Estimated impact</h3>
        <p class="hint" style="margin-bottom:20px;">Directional estimate based on typical recovery rates across comparable deployments.</p>
        <div class="result-line"><span>Estimated monthly savings</span><b id="res-monthly">\u2014</b></div>
        <div class="result-line"><span>Estimated annual savings</span><b id="res-annual">\u2014</b></div>
        <div class="result-line"><span>Estimated platform cost</span><b id="res-platform">\u2014</b></div>
        <div class="result-line"><span>Net monthly impact</span><b id="res-net">\u2014</b></div>
        <div class="result-line"><span>Estimated payback</span><b id="res-payback">\u2014</b></div>
      </div>
      <div id="roi-placeholder" style="color:var(--text-3);font-size:14px;">Adjust the sliders and calculate to see your estimate here.</div>
    </div>
  </div>
  <p class="hint" style="margin-top:28px;max-width:640px;">Estimates are directional. They're based on downtime and labor recovery rates observed across comparable industrial deployments; your results will vary with equipment mix, current maintenance maturity, and site conditions.</p>
</section>
`;

page({
  slug:'/tool',
  title:'Automation Payback Estimator \u2014 Emboq AI',
  description:'Estimate monthly savings and payback time for physical AI monitoring on your own line, free and instant.',
  hero, sheet,
  finaleEyebrow:'YOUR NUMBERS, NOT OURS',
  finaleText:'Directional today. Precise once we\'ve seen your floor.',
  extraScripts:['/assets/js/tool.js']
});
