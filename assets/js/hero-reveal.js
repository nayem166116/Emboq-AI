/* OPI ROBOTICS — hero-reveal.js
   The .finale band is intentionally transparent so the hero CANVAS (starfield,
   gradient, video) can reappear as an "ending" reveal after the sheet scrolls
   past. But .hero-stage is position:fixed, so its TEXT content bled through
   that transparent band too and collided with the finale copy.

   Once the sheet has climbed over the hero band we fade the hero TEXT out and
   leave the canvas alone — preserving the intended reveal without the clash. */
(function(){
  var stage = document.querySelector('.hero-stage');
  if(!stage) return;
  var content = stage.querySelector('.hero-content');
  var spacer = document.querySelector('.hero-spacer');
  if(!content) return;

  var ticking = false;

  function update(){
    ticking = false;

    // On very short viewports the stage is NOT fixed — it scrolls away as a
    // normal block, so the text must stay visible the whole time.
    if(window.getComputedStyle(stage).position !== 'fixed'){
      stage.classList.remove('is-past-hero');
      return;
    }

    // The spacer mirrors the hero's on-screen height. Hide the text once the
    // sheet has covered most of it.
    var band = (spacer && spacer.offsetHeight) || window.innerHeight;
    if(window.scrollY > band * 0.6){
      stage.classList.add('is-past-hero');
    }else{
      stage.classList.remove('is-past-hero');
    }
  }

  function onScroll(){
    if(ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  window.addEventListener('pageshow', update);
  update();
})();