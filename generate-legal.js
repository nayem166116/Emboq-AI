const { page, heroStage } = require('./build.js');

function legalPage({ slug, title, description, eyebrow, heading, updated, toc, sections }){
  const hero = heroStage({ heroVideo:'hero-legal', eyebrow, heading, lede:`Last updated ${updated}`, compact:true });
  const sheet = `
<section class="section">
  <div style="display:grid;grid-template-columns:220px 1fr;gap:var(--sp-6);align-items:start;">
    <nav class="toc" aria-label="Table of contents" style="position:sticky;top:120px;">
      ${toc.map(t => `<a href="#${t.id}">${t.label}</a>`).join('\n      ')}
    </nav>
    <div class="prose" style="max-width:720px;">
      ${sections.join('\n')}
    </div>
  </div>
</section>
<style>@media (max-width:899px){ .toc{ display:none; } }</style>
`;
  page({ slug, title, description, hero, sheet, finaleEyebrow:'OPI ROBOTICS', finaleText:'Questions about this policy? Write to privacy@opirobotics.com.' });
}

legalPage({
  slug:'/privacy',
  title:'Privacy Policy \u2014 Opi Robotics',
  description:'How Opi Robotics collects, uses, and protects data across our website and industrial monitoring platform.',
  eyebrow:'LEGAL', heading:'Privacy Policy', updated:'September 1, 2026',
  toc:[
    {id:'scope', label:'1. Scope'},
    {id:'data-we-collect', label:'2. Data we collect'},
    {id:'how-we-use-it', label:'3. How we use it'},
    {id:'retention', label:'4. Retention'},
    {id:'sharing', label:'5. Sharing & disclosure'},
    {id:'security', label:'6. Security'},
    {id:'your-rights', label:'7. Your rights'},
    {id:'contact', label:'8. Contact'},
  ],
  sections:[
    `<h2 id="scope">1. Scope</h2><p>This Privacy Policy describes how 21 Robots LLC ("Opi Robotics", "we", "us"), a New Mexico domestic limited liability company (company number 7137575) with its head office at 530-B Harkle Road, Ste 100, Santa Fe, NM 87505, USA, handles personal data collected through our marketing website (opirobotics.com) and through our industrial monitoring platform when deployed at a customer site. It does not cover third-party sites we link to.</p><p>Opi Robotics is the trading brand of 21 Robots LLC. 21 Robots LLC is the data controller for every category of personal data described in this policy, and it is the contracting party named on our order forms, invoices, and data processing agreements. Where this policy says Opi Robotics, the legal obligations sit with 21 Robots LLC.</p>`,
    `<h2 id="data-we-collect">2. Data we collect</h2><p>We collect the following categories of data:</p><ul><li><strong>Account data</strong> \u2014 name, work email, and company you provide when requesting access or creating an account.</li><li><strong>Usage data</strong> \u2014 pages visited, the free tool inputs you choose to submit, and general device/browser information, collected via analytics cookies you can decline.</li><li><strong>Operational data</strong> \u2014 for customers with a deployed platform, sensor and PLC signal data from monitored equipment. This data belongs to the customer and is processed under a separate data processing agreement, not this policy.</li><li><strong>Communications</strong> \u2014 messages you send us via email, including sales and support correspondence.</li></ul>`,
    `<h2 id="how-we-use-it">3. How we use it</h2><p>We use personal data to operate and improve our website and platform, respond to inquiries, provision accounts, send account-related notices, and, where you've given consent via our cookie banner, for analytics and marketing measurement. We do not sell personal data.</p>`,
    `<h2 id="retention">4. Retention</h2><p>Account data is retained for the life of your account plus 24 months. Website usage data collected via analytics cookies is retained for up to 14 months. Operational sensor data retention is configurable per customer contract, typically between 30 and 365 days.</p>`,
    `<h2 id="sharing">5. Sharing & disclosure</h2><p>We share data with infrastructure and analytics subprocessors strictly to operate our services, under contractual confidentiality obligations. We disclose data when required by law, to enforce our agreements, or to protect the rights and safety of Opi Robotics, our customers, or the public.</p>`,
    `<h2 id="security">6. Security</h2><p>We use encryption in transit and at rest, role-based access controls, and audit logging on operational data. No system is perfectly secure, and we encourage you to report any suspected vulnerability to security@opirobotics.com.</p>`,
    `<h2 id="your-rights">7. Your rights</h2><p>Depending on your location, you may have the right to access, correct, delete, or export your personal data, and to withdraw analytics/marketing consent at any time via Cookie Settings in our footer. To exercise these rights, contact privacy@opirobotics.com; we will respond within 30 days.</p>`,
    `<h2 id="contact">8. Contact</h2><p>Questions about this policy can be sent to <a href="mailto:privacy@opirobotics.com" style="text-decoration:underline;">privacy@opirobotics.com</a>.</p>`,
  ]
});

legalPage({
  slug:'/terms',
  title:'Terms of Service \u2014 Opi Robotics',
  description:'The terms that govern use of the Opi Robotics website and platform.',
  eyebrow:'LEGAL', heading:'Terms of Service', updated:'September 1, 2026',
  toc:[
    {id:'agreement', label:'1. Agreement'},
    {id:'accounts', label:'2. Accounts'},
    {id:'acceptable-use', label:'3. Acceptable use'},
    {id:'the-platform', label:'4. The platform'},
    {id:'fees', label:'5. Fees & payment'},
    {id:'liability', label:'6. Liability'},
    {id:'termination', label:'7. Termination'},
    {id:'changes', label:'8. Changes'},
  ],
  sections:[
    `<h2 id="agreement">1. Agreement</h2><p>These Terms of Service are an agreement between you and 21 Robots LLC, a New Mexico domestic limited liability company (company number 7137575) with its head office at 530-B Harkle Road, Ste 100, Santa Fe, NM 87505, USA, trading as Opi Robotics. They are governed by the laws of the State of New Mexico, excluding its conflict-of-law rules, and they govern your use of the Opi Robotics website and, where applicable, our industrial monitoring platform. By creating an account or using our services, you agree to these terms. Enterprise customers with a signed order form are additionally governed by that agreement, which controls in the event of a conflict.</p>`,
    `<h2 id="accounts">2. Accounts</h2><p>You must provide accurate information when creating an account and are responsible for activity under your credentials. Notify us immediately at support@opirobotics.com if you suspect unauthorized access.</p>`,
    `<h2 id="acceptable-use">3. Acceptable use</h2><p>You may not use our services to violate applicable law, attempt to bypass safety envelope controls, reverse-engineer the platform, or interfere with other customers' deployments. We may suspend access for violations of this section.</p>`,
    `<h2 id="the-platform">4. The platform</h2><p>Our platform provides perception, predictive, and decision-support capabilities for industrial equipment. It is a tool to support, not replace, your operational and safety judgment. Any automated action capability is scoped and enabled per your safety envelope configuration, agreed with your team before activation.</p>`,
    `<h2 id="fees">5. Fees & payment</h2><p>Paid plans are billed per the order form or plan selected at signup, in advance on an annual or monthly basis as agreed. Fees are non-refundable except as required by law or expressly stated in your order form.</p>`,
    `<h2 id="liability">6. Liability</h2><p>To the maximum extent permitted by law, Opi Robotics's aggregate liability arising from these terms is limited to the fees paid in the 12 months preceding the claim. Nothing in these terms limits liability that cannot be limited under applicable law.</p>`,
    `<h2 id="termination">7. Termination</h2><p>You may cancel a self-serve account at any time from your account settings. We may suspend or terminate accounts for material breach of these terms, with notice where reasonably practicable.</p>`,
    `<h2 id="changes">8. Changes</h2><p>We may update these terms from time to time. Material changes will be notified via email or an in-product notice at least 14 days before taking effect.</p>`,
  ]
});

legalPage({
  slug:'/cookies',
  title:'Cookie Policy \u2014 Opi Robotics',
  description:'How Opi Robotics uses cookies on our website, and how to manage your preferences.',
  eyebrow:'LEGAL', heading:'Cookie Policy', updated:'September 1, 2026',
  toc:[
    {id:'what-are-cookies', label:'1. What are cookies'},
    {id:'categories', label:'2. Categories we use'},
    {id:'third-party', label:'3. Third-party cookies'},
    {id:'managing', label:'4. Managing your preferences'},
  ],
  sections:[
    `<h2 id="what-are-cookies">1. What are cookies</h2><p>Cookies are small text files stored on your device that let a website remember information between visits, such as your preferences or session state.</p>`,
    `<h2 id="categories">2. Categories we use</h2><p>We use three categories of cookies, matching the choices in our cookie banner:</p><ul><li><strong>Essential</strong> \u2014 required for core site functionality, such as remembering your cookie choice itself. These cannot be disabled.</li><li><strong>Analytics</strong> \u2014 help us understand aggregate site usage, such as which pages are visited most. Disabled by default until you opt in.</li><li><strong>Marketing</strong> \u2014 used to measure the performance of campaigns that brought you to our site. Disabled by default until you opt in.</li></ul>`,
    `<h2 id="third-party">3. Third-party cookies</h2><p>When enabled, analytics and marketing cookies may be set by third-party service providers acting on our behalf, under contractual confidentiality and data protection terms.</p>`,
    `<h2 id="managing">4. Managing your preferences</h2><p>You can change your cookie preferences at any time using the "Cookie Settings" link in the footer of any page. Your choice is stored in your browser's local storage and is not shared with third parties beyond the category preference itself.</p>`,
  ]
});
