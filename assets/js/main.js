/* EMBOQ AI — main.js
   Handles: page-transition fade + top progress bar (App Feel layer, Section 1.4),
   current-year injection, generic helpers. This is a REAL MPA — every route is
   a real HTML file; this layer only adds a cosmetic transition on top. */
(function(){
  var bar = document.querySelector('.route-progress');

  function isInternal(a){
    if(!a || !a.getAttribute) return false;
    var href = a.getAttribute('href');
    if(!href || href.charAt(0) === '#') return false;
    if(a.target === '_blank') return false;
    if(href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return false;
    try{
      var url = new URL(href, window.location.href);
      return url.origin === window.location.origin;
    }catch(e){ return false; }
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a');
    if(!a || !isInternal(a)) return;
    var url = new URL(a.getAttribute('href'), window.location.href);
    if(url.href === window.location.href) return;
    e.preventDefault();
    if(bar){ bar.classList.add('is-active'); bar.style.width = '70%'; }
    document.body.classList.add('is-leaving');
    setTimeout(function(){ window.location.href = url.href; }, 180);
  });

  window.addEventListener('pageshow', function(){
    document.body.classList.remove('is-leaving');
    document.body.classList.add('is-entering');
    // The pageIn keyframe animates `transform`, and `animation-fill-mode: both`
    // would otherwise leave a resolved (identity) transform on <body> forever.
    // A transform on body creates a new containing block for any fixed-position
    // descendant (like .hero-stage), silently breaking the sticky hero effect.
    // Removing the class once the animation finishes restores transform:none.
    document.body.addEventListener('animationend', function onEnd(ev){
      if(ev.animationName === 'pageIn'){
        document.body.classList.remove('is-entering');
        document.body.removeEventListener('animationend', onEnd);
      }
    });
    if(bar){
      bar.style.width = '100%';
      setTimeout(function(){ bar.classList.remove('is-active'); bar.style.width='0%'; }, 260);
    }
  });

  var yearEls = document.querySelectorAll('[data-year]');
  var y = new Date().getFullYear();
  yearEls.forEach(function(el){ el.textContent = y; });
})();
