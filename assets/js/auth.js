/* OPI ROBOTICS — auth.js
   Frontend-only auth flow. No backend, no database, no email, no tokens.
   Everything else (validation, countdown, resend limits, lockouts, pending
   states) genuinely runs client-side. No copy anywhere says mock/demo/test/
   sample/simulated/prototype. */
(function(){
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var COMMON_TYPOS = { 'gmial.com':'gmail.com', 'gnail.com':'gmail.com', 'gmai.com':'gmail.com', 'yahho.com':'yahoo.com', 'outlok.com':'outlook.com', 'hotmial.com':'hotmail.com' };

  function setError(field, msg){
    field.classList.add('has-error'); field.classList.remove('is-valid');
    var em = field.querySelector('.error-msg');
    if(em) em.textContent = msg;
  }
  function clearError(field){ field.classList.remove('has-error'); }
  function setValid(field){ field.classList.add('is-valid'); field.classList.remove('has-error'); }

  function checkEmailTypo(email){
    var domain = email.split('@')[1];
    if(domain && COMMON_TYPOS[domain.toLowerCase()]) return COMMON_TYPOS[domain.toLowerCase()];
    return null;
  }

  /* ---------------- REGISTER ---------------- */
  var registerForm = document.querySelector('#register-form');
  if(registerForm){
    var name = registerForm.querySelector('#reg-name');
    var email = registerForm.querySelector('#reg-email');
    var pw = registerForm.querySelector('#reg-password');
    var pwConfirm = registerForm.querySelector('#reg-confirm');
    var terms = registerForm.querySelector('#reg-terms');
    var submitBtn = registerForm.querySelector('#reg-submit');
    var toggle = registerForm.querySelector('[data-toggle-pw]');
    var strengthMeter = registerForm.querySelector('.strength-meter');
    var strengthLabel = registerForm.querySelector('.strength-label');
    var typoHint = registerForm.querySelector('#reg-email-typo');

    function fieldOf(el){ return el.closest('.field'); }

    function validateName(showError){
      var v = name.value.trim();
      var ok = v.length >= 2 && /[a-zA-Z]/.test(v);
      if(!ok && showError) setError(fieldOf(name), 'Enter your full name');
      else if(ok) setValid(fieldOf(name)); else clearError(fieldOf(name));
      return ok;
    }
    function validateEmail(showError){
      var v = email.value.trim();
      var ok = EMAIL_RE.test(v);
      var typo = ok ? checkEmailTypo(v) : null;
      if(typoHint) typoHint.style.display = typo ? 'block' : 'none';
      if(typoHint && typo) typoHint.textContent = 'Did you mean ' + v.split('@')[0] + '@' + typo + '?';
      if(!ok && showError) setError(fieldOf(email), 'Enter a valid email address');
      else if(ok) setValid(fieldOf(email)); else clearError(fieldOf(email));
      return ok;
    }
    function pwChecks(v){
      return { len: v.length >= 8, upper: /[A-Z]/.test(v), num: /[0-9]/.test(v) };
    }
    function validatePw(showError){
      var v = pw.value; var c = pwChecks(v);
      var level = (c.len?1:0) + (c.upper?1:0) + (c.num?1:0);
      if(strengthMeter){ strengthMeter.setAttribute('data-level', String(level)); }
      if(strengthLabel){ strengthLabel.textContent = v.length === 0 ? '' : (level <= 1 ? 'Weak' : level === 2 ? 'Fair' : 'Strong'); }
      registerForm.querySelectorAll('.pw-checklist li').forEach(function(li){
        var key = li.getAttribute('data-check');
        li.classList.toggle('met', !!c[key]);
      });
      var ok = c.len && c.upper && c.num;
      if(!ok && showError){
        var msg = !c.len ? 'Password must be at least 8 characters' : !c.upper ? 'Include at least one uppercase letter' : 'Include at least one number';
        setError(fieldOf(pw), msg);
      } else if(ok) setValid(fieldOf(pw)); else clearError(fieldOf(pw));
      return ok;
    }
    function validateConfirm(showError){
      var ok = pwConfirm.value.length > 0 && pwConfirm.value === pw.value;
      if(!ok && showError) setError(fieldOf(pwConfirm), "Passwords don't match");
      else if(ok) setValid(fieldOf(pwConfirm)); else clearError(fieldOf(pwConfirm));
      return ok;
    }
    function validateTerms(showError){
      var ok = terms.checked;
      if(!ok && showError) setError(fieldOf(terms), 'You must accept the Terms of Service to continue');
      else clearError(fieldOf(terms));
      return ok;
    }
    function updateSubmit(){
      var ok = validateName(false) && validateEmail(false) && validatePw(false) && validateConfirm(false) && terms.checked;
      submitBtn.disabled = !ok;
    }

    [ [name,'blur',validateName], [email,'blur',validateEmail], [pw,'blur',validatePw], [pwConfirm,'blur',validateConfirm] ].forEach(function(t){
      t[0].addEventListener(t[1], function(){ t[2](true); updateSubmit(); });
    });
    name.addEventListener('input', function(){ if(fieldOf(name).classList.contains('has-error')) validateName(true); updateSubmit(); });
    email.addEventListener('input', function(){ if(fieldOf(email).classList.contains('has-error')) validateEmail(true); updateSubmit(); });
    pw.addEventListener('input', function(){ validatePw(fieldOf(pw).classList.contains('has-error')); validateConfirm(false); updateSubmit(); });
    pwConfirm.addEventListener('input', function(){ if(fieldOf(pwConfirm).classList.contains('has-error')) validateConfirm(true); updateSubmit(); });
    terms.addEventListener('change', function(){ validateTerms(true); updateSubmit(); });

    if(toggle){
      toggle.addEventListener('click', function(){
        var isPw = pw.type === 'password';
        pw.type = isPw ? 'text' : 'password';
        toggle.innerHTML = isPw ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
      });
    }

    registerForm.addEventListener('submit', function(e){
      e.preventDefault();
      var okName = validateName(true), okEmail = validateEmail(true), okPw = validatePw(true), okConfirm = validateConfirm(true), okTerms = validateTerms(true);
      if(!(okName && okEmail && okPw && okConfirm && okTerms)) return;

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn__cell--label').textContent = 'Creating account\u2026';
      submitBtn.querySelector('.spinner')?.classList.remove('visually-hidden');
      registerForm.querySelectorAll('input').forEach(function(i){ i.disabled = true; });

      setTimeout(function(){
        sessionStorage.setItem('opi_pending_email', email.value.trim());
        window.location.href = '/verify';
      }, 900 + Math.random() * 500);
    });
  }

  /* ---------------- VERIFY ---------------- */
  var verifyForm = document.querySelector('#verify-form');
  if(verifyForm){
    var boxes = Array.prototype.slice.call(verifyForm.querySelectorAll('.otp-box'));
    var emailLabel = document.querySelector('#verify-email');
    var resendBtn = document.querySelector('#verify-resend');
    var countdownLabel = document.querySelector('#verify-countdown');
    var resendNote = document.querySelector('#verify-resend-note');
    var verifySubmit = document.querySelector('#verify-submit');

    var pendingEmail = sessionStorage.getItem('opi_pending_email') || 'your email';
    if(emailLabel) emailLabel.textContent = pendingEmail;

    var waitTimes = [60, 120, 300];
    var resendCount = 0;
    var remaining = waitTimes[0];
    var timer = null;

    function tick(){
      var m = Math.floor(remaining/60), s = remaining % 60;
      if(countdownLabel) countdownLabel.textContent = 'Resend code in ' + m + ':' + (s<10?'0':'')+s;
      if(remaining <= 0){
        clearInterval(timer);
        if(resendBtn){ resendBtn.disabled = false; resendBtn.textContent = 'Resend'; }
        if(countdownLabel) countdownLabel.textContent = "Didn't get the code?";
      } else { remaining--; }
    }
    function startCountdown(seconds){
      remaining = seconds;
      if(resendBtn) resendBtn.disabled = true;
      clearInterval(timer);
      tick();
      timer = setInterval(tick, 1000);
    }
    startCountdown(waitTimes[0]);

    if(resendBtn){
      resendBtn.addEventListener('click', function(){
        if(resendBtn.disabled) return;
        if(resendCount >= 3){
          if(resendNote){ resendNote.textContent = "You've reached the maximum number of resend attempts. Please try again later."; resendNote.style.display='block'; }
          resendBtn.disabled = true;
          return;
        }
        resendBtn.disabled = true;
        var prevText = resendBtn.textContent;
        resendBtn.textContent = 'Sending\u2026';
        setTimeout(function(){
          resendCount++;
          boxes.forEach(function(b){ b.value = ''; });
          boxes[0].focus();
          if(resendNote){ resendNote.textContent = 'A new code has been sent to ' + pendingEmail; resendNote.style.display='block'; }
          resendBtn.textContent = 'Resend';
          startCountdown(waitTimes[Math.min(resendCount, waitTimes.length-1)]);
          if(resendCount >= 3){
            setTimeout(function(){
              if(resendNote){ resendNote.textContent = "You've reached the maximum number of resend attempts. Please try again later."; }
              clearInterval(timer);
              resendBtn.disabled = true;
              if(countdownLabel) countdownLabel.textContent = '';
            }, 300);
          }
        }, 700);
      });
    }

    boxes.forEach(function(box, i){
      box.addEventListener('input', function(){
        box.value = box.value.replace(/[^0-9]/g,'').slice(0,1);
        if(box.value && i < boxes.length - 1) boxes[i+1].focus();
        maybeSubmit();
      });
      box.addEventListener('keydown', function(e){
        if(e.key === 'Backspace' && !box.value && i > 0){ boxes[i-1].focus(); }
        if(e.key === 'ArrowLeft' && i > 0){ boxes[i-1].focus(); }
        if(e.key === 'ArrowRight' && i < boxes.length-1){ boxes[i+1].focus(); }
      });
      box.addEventListener('paste', function(e){
        e.preventDefault();
        var text = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g,'');
        text.split('').slice(0,boxes.length).forEach(function(ch, idx){ boxes[idx].value = ch; });
        var nextEmpty = boxes.findIndex(function(b){ return !b.value; });
        (boxes[nextEmpty === -1 ? boxes.length-1 : nextEmpty]).focus();
        maybeSubmit();
      });
    });

    var errorNote = document.querySelector('#verify-error');
    function maybeSubmit(){
      var code = boxes.map(function(b){ return b.value; }).join('');
      if(code.length === 6) doVerify(code);
    }
    function doVerify(code){
      if(errorNote) errorNote.style.display = 'none';
      boxes.forEach(function(b){ b.disabled = true; b.classList.add('is-verifying'); });
      setTimeout(function(){
        window.location.href = '/loading';
      }, 800 + Math.random()*400);
    }
    verifyForm.addEventListener('submit', function(e){
      e.preventDefault();
      var code = boxes.map(function(b){ return b.value; }).join('');
      if(code.length < 6 || !/^\d{6}$/.test(code)){
        if(errorNote){ errorNote.textContent = 'Enter the 6-digit code'; errorNote.style.display = 'block'; }
        verifyForm.classList.add('shake');
        setTimeout(function(){ verifyForm.classList.remove('shake'); }, 400);
        return;
      }
      doVerify(code);
    });
  }

  /* ---------------- LOGIN ---------------- */
  var loginForm = document.querySelector('#login-form');
  if(loginForm){
    var lEmail = loginForm.querySelector('#login-email');
    var lPw = loginForm.querySelector('#login-password');
    var lSubmit = loginForm.querySelector('#login-submit');
    var lError = loginForm.querySelector('#login-error');
    var lockoutNote = loginForm.querySelector('#login-lockout');
    var attempts = 0;
    var locked = false;

    function fieldOf(el){ return el.closest('.field'); }
    function validateLoginEmail(showError){
      var ok = EMAIL_RE.test(lEmail.value.trim());
      if(!ok && showError) setError(fieldOf(lEmail), lEmail.value.trim() ? 'Enter a valid email address' : 'Enter your email address');
      else if(ok) setValid(fieldOf(lEmail)); else clearError(fieldOf(lEmail));
      return ok;
    }
    function validateLoginPw(showError){
      var ok = lPw.value.length >= 6;
      if(!ok && showError) setError(fieldOf(lPw), 'Enter your password');
      else if(ok) setValid(fieldOf(lPw)); else clearError(fieldOf(lPw));
      return ok;
    }
    lEmail.addEventListener('blur', function(){ validateLoginEmail(true); });
    lPw.addEventListener('blur', function(){ validateLoginPw(true); });

    function startLockout(){
      locked = true;
      lSubmit.disabled = true;
      var seconds = 30;
      lockoutNote.style.display = 'block';
      var t = setInterval(function(){
        lockoutNote.textContent = 'Too many attempts. Try again in ' + seconds + 's.';
        seconds--;
        if(seconds < 0){
          clearInterval(t);
          locked = false;
          attempts = 0;
          lSubmit.disabled = false;
          lockoutNote.style.display = 'none';
        }
      }, 1000);
    }

    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(locked) return;
      var okE = validateLoginEmail(true), okP = validateLoginPw(true);
      if(lError) lError.style.display = 'none';
      if(!(okE && okP)) return;

      lSubmit.disabled = true;
      lSubmit.querySelector('.btn__cell--label').textContent = 'Signing in\u2026';
      setTimeout(function(){
        attempts++;
        lSubmit.disabled = false;
        lSubmit.querySelector('.btn__cell--label').textContent = 'Sign in';
        if(lError){
          lError.textContent = 'We couldn\u2019t find an account with that email and password.';
          lError.style.display = 'block';
        }
        loginForm.classList.add('shake');
        setTimeout(function(){ loginForm.classList.remove('shake'); }, 400);
        if(attempts >= 3) startLockout();
      }, 800 + Math.random()*400);
    });
  }

  /* ---------------- FORGOT PASSWORD ---------------- */
  var forgotForm = document.querySelector('#forgot-form');
  if(forgotForm){
    var fEmail = forgotForm.querySelector('#forgot-email');
    var fSubmit = forgotForm.querySelector('#forgot-submit');
    var fNote = forgotForm.querySelector('#forgot-note');
    forgotForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(!EMAIL_RE.test(fEmail.value.trim())){
        setError(fEmail.closest('.field'), 'Enter a valid email address');
        return;
      }
      fSubmit.disabled = true;
      fSubmit.querySelector('.btn__cell--label').textContent = 'Sending\u2026';
      setTimeout(function(){
        fSubmit.querySelector('.btn__cell--label').textContent = 'Link sent';
        if(fNote){ fNote.style.display='block'; fNote.textContent = 'If an account exists for ' + fEmail.value.trim() + ', a reset link is on its way.'; }
      }, 900);
    });
  }
})();
