const fs = require('fs');
const path = require('path');
const { nav, footer, cookieUI, headTags, scripts, heroStage, finale } = require('./build.js');

const hero = heroStage({ heroVideo:'hero-404', eyebrow:'404', heading:'This part of the floor isn\u2019t mapped.', lede:'The page you\u2019re looking for doesn\u2019t exist, or has moved.', compact:true });

const html = `<!doctype html>
<html lang="en">
<head>
${headTags({ slug:'/404', title:'Page not found \u2014 TTA Robotics', description:'The page you are looking for does not exist.' })}
</head>
<body>
<a href="#main" class="skip-link">Skip to content</a>
<div class="route-progress"></div>
${nav()}
${hero}
<main id="main" class="peel-sheet">
  <div class="container">
    <section class="section">
      <div class="notfound" data-reveal="rise">
        <span class="code">ERROR 404</span>
        <h2>We couldn\u2019t find that page.</h2>
        <p class="lede">It may have been moved or the link may be out of date.</p>
        <a href="/" class="btn btn-primary" style="margin-top:16px;"><span class="btn__cell">Back to home</span><span class="btn__cell"><i class="fa-solid fa-arrow-right"></i></span></a>
      </div>
    </section>
  </div>
</main>
${finale('Even off the map, the horizon is still there.', 'TTA ROBOTICS')}
${footer()}
${cookieUI()}
${scripts()}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '404.html'), html);
console.log('wrote 404.html');
