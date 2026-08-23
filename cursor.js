/* ============== PREMIUM CUSTOM CURSOR + COLOR FLOW ============== */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;
  const cursor=document.createElement('div');
  cursor.id='premiumCursor';
  cursor.innerHTML='<span class="cursor-dot"></span><span class="cursor-ring"></span><span class="cursor-glow"></span>';
  document.body.appendChild(cursor);
  const style=document.createElement('style');
  style.textContent=`
    html.cursor-active,html.cursor-active *{cursor:none !important}
    #premiumCursor{position:fixed;inset:0;z-index:10000;pointer-events:none;opacity:0;transition:opacity .25s ease}
    #premiumCursor.visible{opacity:1}
    #premiumCursor .cursor-dot{position:fixed;width:7px;height:7px;border-radius:50%;background:#fff;box-shadow:0 0 12px rgba(34,211,238,.95),0 0 28px rgba(255,40,150,.55);transform:translate(-50%,-50%)}
    #premiumCursor .cursor-ring{position:fixed;width:38px;height:38px;border:1px solid rgba(255,255,255,.62);border-radius:50%;transform:translate(-50%,-50%);transition:width .22s ease,height .22s ease,border-color .22s ease,background .22s ease}
    #premiumCursor .cursor-glow{position:fixed;width:220px;height:220px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(0,234,255,.18),rgba(139,53,255,.10) 30%,rgba(255,22,143,.08) 48%,rgba(255,134,23,.04) 62%,transparent 74%);filter:blur(11px);mix-blend-mode:screen}
    #premiumCursor.hover .cursor-ring{width:58px;height:58px;border-color:rgba(34,211,238,.9);background:rgba(34,211,238,.055)}
    #premiumCursor.click .cursor-ring{width:30px;height:30px;border-color:#fff}
    body{--cursor-x:50vw;--cursor-y:50vh}
    body::before{content:'';position:fixed;inset:-5%;z-index:0;pointer-events:none;background-image:url('color-bg.svg');background-size:cover;background-position:center;background-repeat:no-repeat;mix-blend-mode:screen;opacity:.72;filter:saturate(1.2) contrast(1.06);animation:nebulaDrift 24s ease-in-out infinite alternate;}
    body::after{content:'';position:fixed;inset:-12%;z-index:0;pointer-events:none;background:
      radial-gradient(circle 560px at var(--cursor-x) var(--cursor-y),rgba(0,234,255,.18),transparent 64%),
      radial-gradient(circle 480px at calc(var(--cursor-x) + 170px) calc(var(--cursor-y) - 120px),rgba(139,53,255,.13),transparent 68%),
      radial-gradient(circle 500px at calc(var(--cursor-x) - 190px) calc(var(--cursor-y) + 150px),rgba(255,22,143,.12),transparent 70%),
      radial-gradient(circle 460px at calc(var(--cursor-x) + 130px) calc(var(--cursor-y) + 180px),rgba(255,134,23,.09),transparent 70%);
      mix-blend-mode:screen;filter:blur(28px);opacity:.9;transition:background .16s ease;animation:colourFlow 14s ease-in-out infinite alternate;}
    @keyframes nebulaDrift{0%{transform:scale(1) translate3d(-1%,0,0)}50%{transform:scale(1.045) translate3d(1%,-1%,0)}100%{transform:scale(1.02) translate3d(-1%,1%,0)}}
    @keyframes colourFlow{0%{transform:translate3d(-2%,1%,0) scale(1)}50%{transform:translate3d(2%,-2%,0) scale(1.05)}100%{transform:translate3d(-1%,2%,0) scale(1.02)}}
    body>*{position:relative;z-index:1}
    #premiumCursor{z-index:10000}
    @media (max-width:900px),(pointer:coarse){body::before{opacity:.42}body::after{opacity:.45}}
    @media (prefers-reduced-motion:reduce){#premiumCursor{display:none}html.cursor-active,html.cursor-active *{cursor:auto !important}body::before,body::after{animation:none}}
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add('cursor-active');
  let mouseX=innerWidth/2,mouseY=innerHeight/2,ringX=mouseX,ringY=mouseY,glowX=mouseX,glowY=mouseY,raf=0;
  function render(){
    ringX+=(mouseX-ringX)*.16;ringY+=(mouseY-ringY)*.16;glowX+=(mouseX-glowX)*.055;glowY+=(mouseY-glowY)*.055;
    const dot=cursor.querySelector('.cursor-dot'),ring=cursor.querySelector('.cursor-ring'),glow=cursor.querySelector('.cursor-glow');
    dot.style.left=mouseX+'px';dot.style.top=mouseY+'px';ring.style.left=ringX+'px';ring.style.top=ringY+'px';glow.style.left=glowX+'px';glow.style.top=glowY+'px';
    document.body.style.setProperty('--cursor-x',mouseX+'px');document.body.style.setProperty('--cursor-y',mouseY+'px');raf=requestAnimationFrame(render);
  }
  window.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY;cursor.classList.add('visible');const target=e.target.closest('a,button,input,textarea,select,.project,.cert,.skill,.about-skill-item');cursor.classList.toggle('hover',!!target)},{passive:true});
  window.addEventListener('mousedown',()=>cursor.classList.add('click'));window.addEventListener('mouseup',()=>cursor.classList.remove('click'));document.addEventListener('mouseleave',()=>cursor.classList.remove('visible'));window.addEventListener('blur',()=>cursor.classList.remove('visible'));window.addEventListener('focus',()=>cursor.classList.add('visible'));cancelAnimationFrame(raf);render();
})();
