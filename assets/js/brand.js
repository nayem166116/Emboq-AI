/* OPI ROBOTICS — brand.js
   Drop-in logo swapping.

   The rule matches /assets/media/: whatever you put in /assets/brand/ named
   logo.<ext> becomes the site logo — no code change, no rebuild.

   Resolution order is raster-first, vector-last, because the *shipped* default
   is logo.svg. So dropping logo.png (or .webp/.avif/.jpg) beats the default,
   and dropping your own logo.svg simply overwrites the default file.

   If nothing at all loads, the CSS gradient mark + "Opi Robotics" text is used,
   so the header never renders empty or with a broken-image icon.
*/
(function(){
  var BRAND_DIR = '/assets/brand/';
  var EXTS = ['png','webp','avif','jpg','jpeg','svg'];

  function candidates(name){
    var list = [];
    for(var i = 0; i < EXTS.length; i++){
      list.push(BRAND_DIR + name + '.' + EXTS[i]);
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

    probe(candidates(name), function(url){
      node.setAttribute('src', url);
      if(holder) holder.classList.add('has-logo');
      // If the file dies after loading (cache eviction, bad decode), fall back.
      node.addEventListener('error', function(){
        if(holder) holder.classList.remove('has-logo');
      });
    }, function(){
      if(holder) holder.classList.add('no-logo');
    });
  });

  // The tab icon follows the same drop-in rule: favicon.<ext> wins, and a
  // dropped logo-mark.<ext> is used when there is no dedicated favicon.
  probe(candidates('favicon').concat(candidates('logo-mark')), function(url){
    var link = document.querySelector('link[rel="icon"]');
    if(!link){
      link = document.createElement('link');
      link.setAttribute('rel', 'icon');
      document.head.appendChild(link);
    }
    if(link.getAttribute('href') !== url){ link.setAttribute('href', url); }
  });
})();
