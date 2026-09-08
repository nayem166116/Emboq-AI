const { page, heroStage, btnGhost } = require('./build.js');

function authHero(eyebrow, heading){
  return heroStage({ eyebrow, heading, compact:true, heroVideo:'hero-auth' });
}

/* ---------------- REGISTER ---------------- */
const registerSheet = `
<section class="section">
  <div class="auth-grid">
    <div class="auth-card" data-reveal="rise">
      <form id="register-form" novalidate>
        <div class="field" id="field-name">
          <label for="reg-name">Full name</label>
          <input type="text" id="reg-name" name="name" autocomplete="name" placeholder="Jordan Ellis" required>
          <span class="error-msg" role="alert"><i class="fa-solid fa-circle-exclamation"></i> Enter your full name</span>
        </div>
        <div class="field">
          <label for="reg-email">Work email</label>
          <input type="email" id="reg-email" name="email" autocomplete="email" placeholder="you@company.com" required>
          <span class="error-msg" role="alert"><i class="fa-solid fa-circle-exclamation"></i> Enter a valid email address</span>
          <span class="hint" id="reg-email-typo" style="display:none;color:var(--warning);"></span>
        </div>
        <div class="field">
          <label for="reg-password">Password</label>
          <div class="input-wrap">
            <input type="password" id="reg-password" name="password" autocomplete="new-password" placeholder="At least 8 characters" required>
            <button type="button" class="input-toggle" data-toggle-pw aria-label="Show password"><i class="fa-solid fa-eye"></i></button>
          </div>
          <span class="error-msg" role="alert"><i class="fa-solid fa-circle-exclamation"></i> Password must be at least 8 characters</span>
          <div class="strength-meter" data-level="0"><i></i><i></i><i></i></div>
          <div class="strength-label"></div>
          <ul class="pw-checklist">
            <li data-check="len"><span class="dot"></span> At least 8 characters</li>
            <li data-check="upper"><span class="dot"></span> One uppercase letter</li>
            <li data-check="num"><span class="dot"></span> One number</li>
          </ul>
        </div>
        <div class="field">
          <label for="reg-confirm">Confirm password</label>
          <input type="password" id="reg-confirm" name="confirm" autocomplete="new-password" placeholder="Re-enter your password" required>
          <span class="error-msg" role="alert"><i class="fa-solid fa-circle-exclamation"></i> Passwords don't match</span>
        </div>
        <div class="field">
          <label class="checkbox-row"><input type="checkbox" id="reg-terms"> <span>I agree to the <a href="/terms" target="_blank" rel="noopener">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.</span></label>
          <span class="error-msg" role="alert" style="margin-top:4px;"><i class="fa-solid fa-circle-exclamation"></i> You must accept the Terms of Service to continue</span>
        </div>
        <button class="btn btn-primary btn-block" id="reg-submit" type="submit" disabled style="margin-top:12px;">
          <span class="spinner visually-hidden"></span><span class="btn__cell btn__cell--label" style="margin:0 auto;">Create account</span>
        </button>
        <p class="hint" style="margin-top:20px;text-align:center;">Already have an account? <a href="/login" style="color:var(--text-1);text-decoration:underline;">Sign in</a></p>
      </form>
    </div>
    <div class="auth-aside" data-reveal="fade">
      <p class="eyebrow">REQUEST ACCESS</p>
      <h2 style="margin-top:16px;">One account, every site you monitor.</h2>
      <p class="lede" style="margin-top:16px;">Your workspace is provisioned after a short onboarding call so we can scope your first pilot cell correctly.</p>
      <div class="stat"><b>8\u201312 wks</b><span>TYPICAL FIRST PILOT TIMELINE</span></div>
    </div>
  </div>
</section>
`;
page({ slug:'/register', title:'Create your account \u2014 TTA Robotics', description:'Request access to TTA Robotics.', hero:authHero('REGISTER','Create your account.'), sheet:registerSheet, finaleEyebrow:'TTA ROBOTICS', finaleText:'Welcome to the floor.', extraScripts:['/assets/js/auth.js'] });

/* ---------------- VERIFY ---------------- */
const verifySheet = `
<section class="section">
  <div class="auth-grid">
    <div class="auth-card" data-reveal="rise">
      <h2 style="margin-bottom:10px;">Check your email</h2>
      <p class="lede" style="margin-bottom:28px;">We sent a 6-digit code to <strong id="verify-email" style="color:var(--text-1);">your email</strong>. <a href="/register" style="color:var(--text-1);text-decoration:underline;">Use a different email</a></p>
      <form id="verify-form" novalidate>
        <div class="otp-row" role="group" aria-label="6-digit verification code">
          <input class="otp-box" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" aria-label="Digit 1">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 5">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 6">
        </div>
        <p class="error-msg" id="verify-error" role="alert" style="display:none;margin-top:14px;"></p>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:24px;">
          <span class="hint" id="verify-countdown">Resend code in 0:59</span>
          <button type="button" class="btn-text" id="verify-resend" disabled>Resend</button>
        </div>
        <p class="hint" id="verify-resend-note" style="display:none;margin-top:10px;" aria-live="polite"></p>
        <button class="btn btn-primary btn-block" id="verify-submit" type="submit" style="margin-top:24px;">
          <span class="btn__cell" style="margin:0 auto;">Verify</span>
        </button>
      </form>
    </div>
    <div class="auth-aside" data-reveal="fade">
      <p class="eyebrow">ALMOST THERE</p>
      <h2 style="margin-top:16px;">Your workspace is being provisioned.</h2>
      <p class="lede" style="margin-top:16px;">Verifying your email confirms we can reach you for onboarding \u2014 a specialist will follow up to scope your first pilot.</p>
    </div>
  </div>
</section>
`;
page({ slug:'/verify', title:'Verify your email \u2014 TTA Robotics', description:'Verify your email to finish creating your TTA Robotics account.', hero:authHero('VERIFY','Check your email.'), sheet:verifySheet, finaleEyebrow:'TTA ROBOTICS', finaleText:'One code away.', extraScripts:['/assets/js/auth.js'] });

/* ---------------- LOGIN ---------------- */
const loginSheet = `
<section class="section">
  <div class="auth-grid">
    <div class="auth-card" data-reveal="rise">
      <form id="login-form" novalidate>
        <div class="field">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" autocomplete="email" placeholder="you@company.com" required>
          <span class="error-msg" role="alert"><i class="fa-solid fa-circle-exclamation"></i> Enter your email address</span>
        </div>
        <div class="field">
          <label for="login-password">Password</label>
          <input type="password" id="login-password" autocomplete="current-password" placeholder="Your password" required>
          <span class="error-msg" role="alert"><i class="fa-solid fa-circle-exclamation"></i> Enter your password</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
          <label class="checkbox-row"><input type="checkbox"> <span>Remember me</span></label>
          <a href="/forgot-password" class="btn-text" style="font-size:13.5px;">Forgot password?</a>
        </div>
        <p class="error-msg" id="login-error" role="alert" style="display:none;margin-bottom:16px;"></p>
        <p class="hint" id="login-lockout" style="display:none;color:var(--warning);margin-bottom:16px;" aria-live="polite"></p>
        <button class="btn btn-primary btn-block" id="login-submit" type="submit">
          <span class="btn__cell btn__cell--label" style="margin:0 auto;">Sign in</span>
        </button>
        <p class="hint" style="margin-top:20px;text-align:center;">New to TTA Robotics? <a href="/register" style="color:var(--text-1);text-decoration:underline;">Request access</a></p>
      </form>
    </div>
    <div class="auth-aside" data-reveal="fade">
      <p class="eyebrow">WELCOME BACK</p>
      <h2 style="margin-top:16px;">Your line, right where you left it.</h2>
    </div>
  </div>
</section>
`;
page({ slug:'/login', title:'Sign in \u2014 TTA Robotics', description:'Sign in to your TTA Robotics account.', hero:authHero('LOGIN','Sign in.'), sheet:loginSheet, finaleEyebrow:'TTA ROBOTICS', finaleText:'Good to see you back.', extraScripts:['/assets/js/auth.js'] });

/* ---------------- FORGOT PASSWORD ---------------- */
const forgotSheet = `
<section class="section">
  <div class="auth-grid">
    <div class="auth-card" data-reveal="rise">
      <h2 style="margin-bottom:10px;">Reset your password</h2>
      <p class="lede" style="margin-bottom:28px;">Enter your account email and we'll send a link to reset your password.</p>
      <form id="forgot-form" novalidate>
        <div class="field">
          <label for="forgot-email">Email</label>
          <input type="email" id="forgot-email" autocomplete="email" placeholder="you@company.com" required>
          <span class="error-msg" role="alert"><i class="fa-solid fa-circle-exclamation"></i> Enter a valid email address</span>
        </div>
        <p class="hint" id="forgot-note" style="display:none;color:var(--success);margin-bottom:16px;" aria-live="polite"></p>
        <button class="btn btn-primary btn-block" id="forgot-submit" type="submit">
          <span class="btn__cell btn__cell--label" style="margin:0 auto;">Send reset link</span>
        </button>
        <p class="hint" style="margin-top:20px;text-align:center;"><a href="/login" style="color:var(--text-1);text-decoration:underline;">Back to sign in</a></p>
      </form>
    </div>
    <div class="auth-aside" data-reveal="fade">
      <p class="eyebrow">ACCOUNT RECOVERY</p>
      <h2 style="margin-top:16px;">We'll get you back in.</h2>
    </div>
  </div>
</section>
`;
page({ slug:'/forgot-password', title:'Reset your password \u2014 TTA Robotics', description:'Reset your TTA Robotics account password.', hero:authHero('ACCOUNT RECOVERY','Reset your password.'), sheet:forgotSheet, finaleEyebrow:'TTA ROBOTICS', finaleText:'Almost back in.', extraScripts:['/assets/js/auth.js'] });

/* ---------------- LOADING ---------------- */
const loadingSheet = `
<section class="section" style="min-height:40vh;display:flex;align-items:center;justify-content:center;">
  <div style="text-align:center;">
    <span class="pulse-dot" style="display:inline-block;"></span>
    <p class="hint" style="margin-top:24px;">Preparing your workspace\u2026</p>
  </div>
</section>
`;
page({ slug:'/loading', title:'TTA Robotics', description:'Preparing your workspace.', hero:heroStage({ eyebrow:'', heading:'', compact:true, heroVideo:'hero-auth' }), sheet:loadingSheet, finaleEyebrow:'', finaleText:'', bodyAttrs:'style="background:var(--bg)"' });
