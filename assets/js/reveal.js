/* TTA ROBOTICS — reveal.js
   IntersectionObserver based reveal, plays once. Supports data-reveal types:
   rise | mask | line | stagger | fade (see motion.css). */
(function(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('[data-reveal]').forEach(function(el){ el.classList.add('is-revealed'); });
    return;
  }
  var els = document.querySelectorAll('[data-reveal]');
  var groups = {};
  els.forEach(function(el, i){
    var delayGroup = el.getAttribute('data-reveal-group');
    if(delayGroup){
      groups[delayGroup] = groups[delayGroup] || 0;
      el.style.transitionDelay = (groups[delayGroup] * 90) + 'ms';
      groups[delayGroup]++;
    }
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.18, rootMargin:'0px 0px -40px 0px' });
  els.forEach(function(el){ io.observe(el); });

  // Hero parallax fade/scale on scroll (max 6%), respects reduced motion
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroContent = document.querySelector('.hero-content');
  if(heroContent && !reduce){
    window.addEventListener('scroll', function(){
      var p = Math.min(window.scrollY / window.innerHeight, 1);
      heroContent.style.opacity = String(1 - p * 0.85);
      heroContent.style.transform = 'scale(' + (1 - p * 0.06) + ')';
    }, { passive:true });
  }
})();
