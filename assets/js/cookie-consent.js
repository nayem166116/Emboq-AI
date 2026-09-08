/* EMBOQ AI — cookie-consent.js
   Slide-up banner + preferences modal. Stored in localStorage only — no backend. */
(function(){
  var KEY = 'emboq_cookie_prefs_v1';
  var banner = document.querySelector('.cookie-banner');
  var modal = document.querySelector('.cookie-modal');
  if(!banner) return;

  function getPrefs(){
    try{ return JSON.parse(localStorage.getItem(KEY)); }catch(e){ return null; }
  }
  function setPrefs(p){
    localStorage.setItem(KEY, JSON.stringify(p));
    banner.classList.remove('is-visible');
    if(modal) modal.classList.remove('is-open');
  }

  var existing = getPrefs();
  if(!existing){
    setTimeout(function(){ banner.classList.add('is-visible'); }, 500);
  }

  var acceptAll = document.querySelector('[data-cookie="accept-all"]');
  var rejectAll = document.querySelector('[data-cookie="reject"]');
  var manage = document.querySelectorAll('[data-cookie="manage"]');
  var savePrefs = document.querySelector('[data-cookie="save"]');
  var analyticsToggle = document.querySelector('#pref-analytics');
  var marketingToggle = document.querySelector('#pref-marketing');

  if(acceptAll) acceptAll.addEventListener('click', function(){ setPrefs({ essential:true, analytics:true, marketing:true, ts:Date.now() }); });
  if(rejectAll) rejectAll.addEventListener('click', function(){ setPrefs({ essential:true, analytics:false, marketing:false, ts:Date.now() }); });
  manage.forEach(function(btn){
    btn.addEventListener('click', function(){
      if(!modal) return;
      var prefs = getPrefs() || { analytics:false, marketing:false };
      if(analyticsToggle) analyticsToggle.checked = !!prefs.analytics;
      if(marketingToggle) marketingToggle.checked = !!prefs.marketing;
      modal.classList.add('is-open');
      banner.classList.remove('is-visible');
    });
  });
  if(savePrefs) savePrefs.addEventListener('click', function(){
    setPrefs({
      essential:true,
      analytics: analyticsToggle ? analyticsToggle.checked : false,
      marketing: marketingToggle ? marketingToggle.checked : false,
      ts:Date.now()
    });
  });
  document.querySelectorAll('[data-cookie="close-modal"]').forEach(function(btn){
    btn.addEventListener('click', function(){ if(modal) modal.classList.remove('is-open'); });
  });
})();
