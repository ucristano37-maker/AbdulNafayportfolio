/* ============== PREMIUM CUSTOM CURSOR ============== */
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
    #premiumCursor .cursor-dot{position:fixed;width:7px;height:7px;border-radius:50%;background:#fff;box-shadow:0 0 12px rgba(34,211,238,.9),0 0 28px rgba(59,107,255,.55);transform:translate(-50%,-50%)}
    #premiumCursor .cursor-ring{position:fixed;width:38px;height:38px;border:1px solid rgba(255,255,255,.55);border-radius:50%;transform:translate(-50%,-50%);transition:width .22s ease,height .22s ease,border-color .22s ease,background .22s ease}
    #premiumCursor .cursor-glow{position:fixed;width:180px;height:180px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(34,211,238,.10),rgba(59,107,255,.055) 35%,transparent 72%);filter:blur(8px);mix-blend-mode:screen}
    #premiumCursor.hover .cursor-ring{width:58px;height:58px;border-color:rgba(34,211,238,.8);background:rgba(34,211,238,.045)}
    #premiumCursor.click .cursor-ring{width:30px;height:30px;border-color:#fff}
    body{--cursor-x:50vw;--cursor-y:50vh}
    body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(circle 360px at var(--cursor-x) var(--cursor-y),rgba(34,211,238,.075),rgba(59,107,255,.035) 38%,transparent 72%);transition:background .08s linear}
    @media (prefers-reduced-motion:reduce){#premiumCursor{display:none}html.cursor-active,html.cursor-active *{cursor:auto !important}body::before{display:none}}
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add('cursor-active');

  let mouseX=window.innerWidth/2,mouseY=window.innerHeight/2;
  let ringX=mouseX,ringY=mouseY;
  let glowX=mouseX,glowY=mouseY;
  let raf=0;

  function render(){
    ringX+=(mouseX-ringX)*.16;
    ringY+=(mouseY-ringY)*.16;
    glowX+=(mouseX-glowX)*.07;
    glowY+=(mouseY-glowY)*.07;
    const dot=cursor.querySelector('.cursor-dot');
    const ring=cursor.querySelector('.cursor-ring');
    const glow=cursor.querySelector('.cursor-glow');
    dot.style.left=mouseX+'px';dot.style.top=mouseY+'px';
    ring.style.left=ringX+'px';ring.style.top=ringY+'px';
    glow.style.left=glowX+'px';glow.style.top=glowY+'px';
    document.body.style.setProperty('--cursor-x',mouseX+'px');
    document.body.style.setProperty('--cursor-y',mouseY+'px');
    raf=requestAnimationFrame(render);
  }

  window.addEventListener('mousemove',e=>{
    mouseX=e.clientX;mouseY=e.clientY;cursor.classList.add('visible');
    const target=e.target.closest('a,button,input,textarea,select,.project,.cert,.skill,.about-skill-item');
    cursor.classList.toggle('hover',!!target);
  },{passive:true});

  window.addEventListener('mousedown',()=>cursor.classList.add('click'));
  window.addEventListener('mouseup',()=>cursor.classList.remove('click'));
  document.addEventListener('mouseleave',()=>cursor.classList.remove('visible'));
  document.addEventListener('mouseenter',()=>cursor.classList.add('visible'));
  window.addEventListener('blur',()=>cursor.classList.remove('visible'));
  window.addEventListener('focus',()=>cursor.classList.add('visible'));

  cancelAnimationFrame(raf);
  render();
})();
