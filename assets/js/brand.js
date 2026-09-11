/* OPI ROBOTICS — brand.js
   Drop-in logo swapping.

   The shipped logo is written straight into the HTML
   (src="/assets/brand/logo.svg"), so it paints on the first frame — there is
   no flash of the CSS fallback mark.

   This script only handles overrides: whatever you drop into /assets/brand/
   named logo.<png|webp|avif|jpg|jpeg> replaces the shipped logo with no code
   change and no rebuild. Dropping your own logo.svg simply overwrites the
   shipped file, so it needs no script at all.

   The CSS gradient mark + "Opi Robotics" text stays as a safety net: it is
   only revealed (via the .no-logo class) if no image can be decoded, so the
   header never renders empty or with a broken-image icon.
*/
(function(){
  var BRAND_DIR = '/assets/brand/';
  // Raster only: the shipped default is already the vector logo.svg.
  var OVERRIDE_EXTS = ['png','webp','avif','jpg','jpeg'];
  var FAVICON_EXTS = ['png','webp','avif','jpg','jpeg','svg'];

  function candidates(name, exts){
    var list = [];
    for(var i = 0; i < exts.length; i++){
      list.push(BRAND_DIR + name + '.' + exts[i]);
    }
    return list;
  }

  // Walk the candidate list and hand back the first URL that actually decodes.
  function probe(list, onFound, onFail){
    var i = 0;
    (function next(){
      if(i >= list.length){ if(onFail) onFail(); return; }
      var url = list[i++];
      var img = new Image();
      img.onload = function(){
        if(img.naturalWidth > 0){ onFound(url); } else { next(); }
      };
      img.onerror = next;
      img.src = url;
    })();
  }

  var slots = document.querySelectorAll('img[data-brand]');
  Array.prototype.forEach.call(slots, function(node){
    var name = node.getAttribute('data-brand');
    var holder = (node.closest && node.closest('.wordmark')) || node.parentNode;

    function fail(){ if(holder) holder.classList.add('no-logo'); }
    function ok(){ if(holder) holder.classList.remove('no-logo'); }

    // If the shipped image is missing or fails to decode, show the CSS mark.
    node.addEventListener('error', fail);
    if(node.complete && node.naturalWidth === 0){ fail(); }
    if(!node.getAttribute('src')){ fail(); }

    // Then look for a dropped-in raster override and use it if present.
    probe(candidates(name, OVERRIDE_EXTS), function(url){
      node.setAttribute('src', url);
      ok();
    });
  });

  // The tab icon follows the same drop-in rule: favicon.<ext> wins, and a
  // dropped logo-mark.<ext> is used when there is no dedicated favicon.
  probe(candidates('favicon', FAVICON_EXTS).concat(candidates('logo-mark', FAVICON_EXTS)), function(url){
    var link = document.querySelector('link[rel="icon"]');
    if(!link){
      link = document.createElement('link');
      link.setAttribute('rel', 'icon');
      document.head.appendChild(link);
    }
    if(link.getAttribute('href') !== url){ link.setAttribute('href', url); }
  });
})();
