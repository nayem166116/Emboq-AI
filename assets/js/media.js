/* TTA ROBOTICS — media.js
   Video layers for the hero and the product/perception sections.

   Design goals:
   - Videos are referenced by FIXED paths under /assets/media/, so replacing a
     file in that folder swaps the video with no code change (see the folder's
     README.md).
   - A missing, blocked, or undecodable file must never leave a hole in the
     layout: we drop the video element and let the CSS gradient / poster carry
     the section instead.
   - Respect prefers-reduced-motion: show the poster frame, don't autoplay.
*/
(function(){
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var videos = document.querySelectorAll('video[data-media]');
  if(!videos.length) return;

  function drop(video){
    // Mark the stage so the scrim can lighten, then remove the dead element.
    var stage = video.closest('.hero-stage') || video.closest('.media-frame');
    if(stage) stage.classList.add('no-video');
    if(video.parentNode) video.parentNode.removeChild(video);
  }

  function ready(video){
    video.classList.add('is-ready');
  }

  // Poster images follow the same drop-in rule as the videos, so accept any
  // common still format: <name>-poster.jpg | .jpeg | .png | .webp | .avif.
  // The markup asks for .jpg; if that 404s we probe the alternatives.
  function resolvePoster(video){
    var slots = (video.getAttribute('data-media-slots') ||
                 video.getAttribute('data-media') || '')
      .split(',').filter(Boolean);
    if(!slots.length) return;

    var exts = ['jpg','jpeg','png','webp','avif'];
    var candidates = [];
    slots.forEach(function(slot){
      exts.forEach(function(ext){
        candidates.push('/assets/media/' + slot + '-poster.' + ext);
      });
    });

    var i = 0;
    function tryNext(){
      if(i >= candidates.length){ video.removeAttribute('poster'); return; }
      var candidate = candidates[i++];
      var probe = new Image();
      probe.onload = function(){ video.setAttribute('poster', candidate); };
      probe.onerror = tryNext;
      probe.src = candidate;
    }
    tryNext();
  }

  Array.prototype.forEach.call(videos, function(video){
    resolvePoster(video);

    // `error` fires when every <source> failed (missing file, bad codec, 404).
    video.addEventListener('error', function(){ drop(video); });
    Array.prototype.forEach.call(video.querySelectorAll('source'), function(src){
      src.addEventListener('error', function(){
        // Only give up once there is no remaining playable source.
        if(video.networkState === video.NETWORK_NO_SOURCE) drop(video);
      });
    });

    if(video.readyState >= 3){ ready(video); }
    video.addEventListener('canplay', function(){ ready(video); });

    if(reduceMotion){
      // Keep the poster, skip the loop entirely.
      video.removeAttribute('autoplay');
      video.pause();
      ready(video);
      return;
    }

    // Some browsers reject autoplay even when muted; that promise rejection is
    // not a failure of the file, so fall back to the poster rather than drop.
    var attempt = video.play();
    if(attempt && typeof attempt.catch === 'function'){
      attempt.catch(function(){ ready(video); });
    }
  });

  // Don't burn CPU/battery decoding video that is scrolled out of view.
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var v = entry.target;
        if(!v.isConnected) return;
        if(entry.isIntersecting){
          if(v.paused){ var p = v.play(); if(p && p.catch) p.catch(function(){}); }
        } else if(!v.paused){
          v.pause();
        }
      });
    }, { rootMargin: '200px 0px' });
    Array.prototype.forEach.call(videos, function(v){ io.observe(v); });
  }
})();
