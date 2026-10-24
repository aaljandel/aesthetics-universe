/**
 * Aesthetics Universe | Cloudflare Pages Functions private review gate.
 * Configured exclusively with encrypted Pages environment secrets:
 * REVIEW_PASSWORD, REVIEW_SESSION_KEY (minimum 32 random bytes).
 * No front-end code includes the password or an unlock shortcut.
 */
const COOKIE = '__Host-au_review';
const cookieName = (request) => new URL(request.url).protocol === 'https:' ? COOKIE : 'au_review_local'; // only the local HTTP simulator uses this fallback
const TTL_SECONDS = 60 * 60 * 48;
const ENC = new TextEncoder();

const htmlEscape = (value) => String(value).replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const base64url = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', ENC.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign','verify']);
}
async function sign(claim, secret) {
  return base64url(new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(secret), ENC.encode(claim))));
}
function timingSafeEqual(a, b) {
  // Both strings are digested first, so comparisons always work on 32 bytes.
  if (typeof a !== 'string' || typeof b !== 'string') return Promise.resolve(false);
  return Promise.all([crypto.subtle.digest('SHA-256', ENC.encode(a)),crypto.subtle.digest('SHA-256', ENC.encode(b))])
    .then(([aa,bb])=>{const x=new Uint8Array(aa),y=new Uint8Array(bb);let diff=0;for(let i=0;i<32;i++)diff |= x[i]^y[i];return diff===0;});
}
function getCookie(header, name) {
  for (const part of (header || '').split(';')) {
    const pair = part.trim();
    if (pair.startsWith(name+'=')) return pair.slice(name.length+1);
  }
  return null;
}
async function isAuthorised(request, secret) {
  if (!secret || secret.length < 32) return false;
  const cookie = getCookie(request.headers.get('cookie'), cookieName(request));
  const match = cookie?.match(/^v1\.(\d{10,})\.([a-f0-9]{32})\.([A-Za-z0-9_-]{43})$/);
  if (!match) return false;
  const expiry = Number(match[1]);
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isSafeInteger(expiry) || expiry <= now || expiry > now + TTL_SECONDS) return false;
  const expected = await sign(`v1.${match[1]}.${match[2]}`, secret);
  return timingSafeEqual(match[3], expected);
}
async function sessionCookie(request, secret) {
  const expiry = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16))).map(n=>n.toString(16).padStart(2,'0')).join('');
  const claim = `v1.${expiry}.${nonce}`;
  const signature = await sign(claim, secret);
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : ''; // HTTP only in local simulator.
  return `${cookieName(request)}=${claim}.${signature}; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=${TTL_SECONDS}`;
}
function clearCookie(request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${cookieName(request)}=; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=0`;
}
function securityHeaders(extra={}) {
  return {
    'Cache-Control': 'private, no-store, max-age=0',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options':'nosniff',
    'X-Frame-Options':'DENY',
    'X-Robots-Tag':'noindex, nofollow, noarchive',
    ...extra,
  };
}
function safeNext(next) {
  if (typeof next !== 'string' || next.length > 500 || !next.startsWith('/') || next.startsWith('//') || /[\\\x00-\x1F\x7F]/.test(next) || next.startsWith('/__preview/')) return '/';
  return next;
}
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" role="img" aria-label="Aesthetics Universe icon"><circle cx="36" cy="36" r="16" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="36" cy="36" rx="32" ry="13" transform="rotate(-25 36 36)" fill="none" stroke="currentColor" stroke-width="1.45"/><circle cx="59" cy="24" r="3" fill="currentColor"/></svg>`;
function comingSoon(error, next='/', maintenance=false) {
  const year = new Date().getUTCFullYear();
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#f7f0e5"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="Aesthetics Universe — something beautiful is coming."><title>Coming Soon | Aesthetics Universe</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Italiana&display=swap" rel="stylesheet">
<style>
:root{--brown:#403127;--espresso:#30231c;--cream:#fbf7f0;--linen:#f1e7d9;--gold:#c4a16b;--deepgold:#927044;--border:#ddcdb8;--muted:#746758;font-family:'DM Sans',Arial,sans-serif}
*{box-sizing:border-box}body{margin:0;color:var(--brown);background:var(--cream);-webkit-font-smoothing:antialiased}a{color:inherit}button,input{font:inherit}.shell{min-height:100svh;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}.content{padding:clamp(27px,3.2vw,63px) clamp(24px,6vw,115px) 28px;display:flex;flex-direction:column;position:relative;z-index:1;min-width:0}.brand{display:inline-flex;align-items:center;gap:14px;text-decoration:none;color:var(--brown);width:max-content}.brand svg{width:50px;height:50px;color:var(--deepgold)}.brand-text{font-size:12px;letter-spacing:.27em;line-height:1.45;font-weight:700}.brand-text span{display:block;font-size:10px;letter-spacing:.44em;color:var(--deepgold)}.topbar{display:flex;justify-content:space-between;align-items:center;gap:18px}.entry-link{display:inline-flex;align-items:center;justify-content:center;gap:9px;flex-shrink:0;padding:13px 16px;background:var(--brown);color:#fff4e1;text-decoration:none;font-size:11px;letter-spacing:.11em;font-weight:700;transition:background .2s}.entry-link:hover{background:#6b4e33}.entry-link:focus-visible{outline:3px solid var(--gold);outline-offset:3px}.access-card{scroll-margin-top:24px}.copy{margin:auto 0;max-width:650px;padding:82px 0 62px}.eyebrow{font-size:10px;font-weight:700;letter-spacing:.33em;text-transform:uppercase;color:var(--deepgold);display:flex;align-items:center;gap:15px;margin:0 0 33px}.eyebrow:before{content:'';height:1px;width:35px;background:var(--gold)}h1{font-family:'Italiana',Georgia,serif;font-weight:400;line-height:.95;letter-spacing:-.052em;font-size:clamp(66px,6vw,112px);margin:0 0 35px}h1 em{font-style:normal;color:#ad8756}.intro{line-height:1.9;max-width:465px;font-size:15px;color:#74675b;margin:0 0 42px}.rule{width:75px;height:1px;background:var(--gold);margin-bottom:35px}.access-card{background:rgba(255,255,255,.53);border:1px solid var(--border);padding:clamp(20px,2vw,32px);max-width:485px;box-shadow:0 14px 45px #a8896111}.access-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:15px}.access-label{font-size:10px;font-weight:700;letter-spacing:.2em;color:var(--deepgold)}.lock{display:inline-flex;gap:5px;align-items:center;font-size:10px;color:var(--muted)}.lock svg{width:14px;height:14px}.access-card h2{font-family:'Italiana',Georgia,serif;font-size:36px;font-weight:400;margin:0 0 9px}.access-card p{font-size:12px;line-height:1.7;margin:0 0 20px;color:var(--muted)}label{display:block;font-size:11px;font-weight:700;letter-spacing:.08em;margin-bottom:9px}input{width:100%;padding:16px 15px;border:1px solid #ceb99b;background:#fffdfa;border-radius:0;color:var(--brown);outline:0;min-height:52px}input:focus{border-color:var(--deepgold);box-shadow:0 0 0 3px #c4a16b33}button{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:54px;background:var(--brown);color:#fff4e1;border:1px solid var(--brown);padding:15px 18px;cursor:pointer;font-size:11px;font-weight:700;letter-spacing:.17em;text-transform:uppercase;margin-top:12px;transition:background .2s,transform .2s}button:hover{background:#6b4e33;transform:translateY(-1px)}button:focus-visible{outline:3px solid var(--gold);outline-offset:3px}button span{font-size:18px;font-weight:400}.error{border-left:3px solid #96503d;background:#f7e5df;padding:11px 12px;margin-bottom:15px!important;color:#813c31!important}.footer{font-size:10px;letter-spacing:.14em;color:#8d7a65;line-height:2;display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;border-top:1px solid var(--border);padding-top:19px}.visual{min-height:100svh;position:relative;overflow:hidden;background:#bda589 url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1300&q=85') center 35%/cover no-repeat}.visual:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(43,28,20,.66),transparent 52%),linear-gradient(90deg,rgba(91,65,43,.17),rgba(128,99,65,.05))}.visual:before{content:'';position:absolute;inset:0;background:linear-gradient(125deg,#b68b59,#f1dbc0 70%);mix-blend-mode:color;opacity:.12}.visual-overlay{position:absolute;inset:0;z-index:2;pointer-events:none;display:flex;align-items:center;justify-content:center}.orbit-one,.orbit-two,.orbit-three{position:absolute;border:1px solid rgba(249,223,175,.64);border-radius:50%;transform:rotate(-28deg);box-shadow:0 0 45px #ffffff12}.orbit-one{width:min(80vw,760px);height:min(45vw,440px)}.orbit-two{width:min(96vw,940px);height:min(55vw,550px);border-color:rgba(253,230,189,.36)}.orbit-three{width:min(60vw,580px);height:min(60vw,580px);border-color:rgba(253,230,189,.24);transform:rotate(15deg)}.visual-caption{position:absolute;z-index:3;left:clamp(20px,4vw,60px);right:clamp(20px,4vw,60px);bottom:49px;color:white;display:flex;align-items:flex-end;justify-content:space-between;gap:20px}.visual-caption p{margin:0;font-family:'Italiana',Georgia,serif;font-size:clamp(28px,3vw,48px);line-height:1.15}.visual-caption small{font-size:10px;letter-spacing:.25em}.visual-top{position:absolute;top:50px;right:50px;z-index:3;color:#fff6e6;font-size:10px;letter-spacing:.27em}.star{font-size:20px;color:#f2d2a1;margin-bottom:7px;display:block}.maintenance{font-size:13px;color:#8b3a30;line-height:1.7}.sr-only{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
@media(max-width:980px){.shell{grid-template-columns:1fr 0.75fr}.content{padding-left:35px;padding-right:35px}h1{font-size:clamp(62px,6.6vw,85px)}}
@media(max-width:760px){.shell{grid-template-columns:1fr}.content{padding:25px 22px 26px}.topbar{gap:12px}.entry-link{padding:12px 11px;font-size:10px;text-align:center;max-width:145px}.copy{padding:28px 0 35px}.brand svg{width:42px;height:42px}.brand-text{font-size:11px}.copy{padding:55px 0 45px}.eyebrow{margin-bottom:25px}h1{font-size:clamp(65px,12.5vw,96px);margin-bottom:22px}.intro{font-size:14px;line-height:1.8;margin-bottom:28px}.rule{margin-bottom:23px}.access-card{max-width:none}.visual{min-height:320px;height:43vh;max-height:450px;order:2}.visual-top{top:25px;right:24px}.visual-caption{bottom:27px}.visual-caption p{font-size:34px}.visual-caption small{display:none}.orbit-one{width:100%;height:65%}.orbit-two{width:120%;height:90%}.footer{padding-top:16px}}
@media(max-width:390px){h1{font-size:60px}.access-card{padding:18px}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important}}
</style></head>
<body><div class="shell"><section class="content" aria-label="Coming soon"><div class="topbar"><a class="brand" href="/" aria-label="Aesthetics Universe home">${icon}<span class="brand-text">AESTHETICS<span>UNIVERSE</span></span></a><a class="entry-link" href="#preview-access" aria-label="Jump to client password form">CLIENT ACCESS ↓</a></div><div class="copy"><p class="eyebrow">An exclusive first look</p><h1>Something<br><em>beautiful</em><br>is coming.</h1><p class="intro">A new perspective on beauty is taking shape. A carefully curated universe of skin, confidence and modern aesthetics awaits.</p><div class="rule"></div><div class="access-card" id="preview-access"><div class="access-top"><span class="access-label">PRIVATE PREVIEW ACCESS</span><span class="lock" aria-label="Password protected"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="1"/><path d="M8 10V7a4 4 0 018 0v3"/></svg> INVITATION ONLY</span></div><h2>Welcome, you're invited.</h2><p>Enter your preview password to step inside and explore the website before it launches.</p>${maintenance?'<p class="maintenance" role="alert">Private preview is temporarily unavailable. Please try again later.</p>':`<form action="/__preview/unlock" method="post"><input type="hidden" name="next" value="${htmlEscape(safeNext(next))}">${error?'<p class="error" role="alert">That password doesn’t look right. Please try again.</p>':''}<label for="password">Your invitation password</label><input id="password" name="password" type="password" required autocomplete="off" spellcheck="false" placeholder="Enter your password" maxlength="150"><button type="submit">ENTER THE UNIVERSE <span aria-hidden="true">↗</span></button></form>`}</div></div><div class="footer"><span>© ${year} AESTHETICS UNIVERSE</span><span>A CONCEPT IN THE MAKING · PRIVATE PREVIEW</span></div></section><aside class="visual" aria-label="Luxury editorial portrait"><div class="visual-top">BEAUTY, REIMAGINED ✳</div><div class="visual-overlay"><div class="orbit-one"></div><div class="orbit-two"></div><div class="orbit-three"></div></div><div class="visual-caption"><div><span class="star">✳</span><p>Your beauty.<br>Your universe.</p></div><small>THE ART OF POSSIBILITY — 001</small></div></aside></div></body></html>`;
}
function landing(error, path, status=200, maintenance=false) {
  return new Response(comingSoon(error, path, maintenance), { status, headers: securityHeaders({
    'Content-Type':'text/html; charset=utf-8',
    'Content-Security-Policy': "default-src 'none'; img-src https://images.unsplash.com data:; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; form-action 'self'; connect-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  }) });
}
function redirect(path, cookie) {
  const headers = securityHeaders({'Location':path});
  if (cookie) headers['Set-Cookie'] = cookie;
  return new Response(null, {status:303,headers});
}
export async function onRequest(context) {
  const {request, env}=context;
  const url = new URL(request.url);
  // Always use TLS on real domains; the local simulator alone may use HTTP.
  if (url.protocol !== 'https:' && !['localhost','127.0.0.1'].includes(url.hostname)) {
    const secureUrl = new URL(url); secureUrl.protocol = 'https:';
    return new Response(null,{status:308,headers:securityHeaders({'Location':secureUrl.toString()})});
  }
  const path = url.pathname;
  const isConfigured = typeof env.REVIEW_PASSWORD==='string' && env.REVIEW_PASSWORD.length>=12 && typeof env.REVIEW_SESSION_KEY==='string' && env.REVIEW_SESSION_KEY.length>=32;
  if (!isConfigured) return landing(false, '/', 503, true); // fail closed, including all static paths
  if (path==='/robots.txt' && request.method==='GET') return new Response('User-agent: *\nDisallow: /\n',{headers:securityHeaders({'Content-Type':'text/plain; charset=utf-8'})});
  if (path==='/__preview/logout' && request.method==='POST') return redirect('/',clearCookie(request));
  if (path==='/__preview/unlock' && request.method==='POST') {
    const len = Number(request.headers.get('content-length') || 0);
    if (len>2048) return new Response('Request too large',{status:413,headers:securityHeaders()});
    if (!(request.headers.get('content-type')||'').startsWith('application/x-www-form-urlencoded')) return new Response('Unsupported request',{status:415,headers:securityHeaders()});
    let fields;
    try {fields=await request.formData();} catch {return landing(true,'/',400);}
    const password=fields.get('password');
    const next=safeNext(fields.get('next'));
    if (typeof password!=='string' || password.length>150 || !(await timingSafeEqual(password,env.REVIEW_PASSWORD))) return landing(true,next,401);
    return redirect(next,await sessionCookie(request,env.REVIEW_SESSION_KEY));
  }
  if (path.startsWith('/__preview/')) return redirect('/');
  if (await isAuthorised(request, env.REVIEW_SESSION_KEY)) {
    // Pages _redirects rules do not run for Function-handled routes. Explicitly
    // serve the SPA shell for authorised clean URLs while keeping assets private.
    const isSpaRoute = path!=='/' && !path.includes('.') && request.method==='GET';
    const shellUrl = new URL('/index.html',request.url);
    const res = isSpaRoute && env.ASSETS ? await env.ASSETS.fetch(new Request(shellUrl,request)) : await context.next();
    const headers = new Headers(res.headers);
    for(const [key,value] of Object.entries(securityHeaders())) headers.set(key,value);
    return new Response(res.body,{status:res.status,statusText:res.statusText,headers});
  }
  // Do not return login HTML as a JavaScript/CSS/image response.
  if (/\.(?:js|css|svg|png|jpe?g|webp|gif|ico|woff2?|json|map|txt|xml)$/i.test(path)) return new Response('Private preview — password required',{status:401,headers:securityHeaders({'Content-Type':'text/plain; charset=utf-8'})});
  if (request.method!=='GET' && request.method!=='HEAD') return new Response('Method not allowed',{status:405,headers:securityHeaders()});
  return landing(false, path);
}
