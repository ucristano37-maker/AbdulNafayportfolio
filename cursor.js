/* ============== MINECRAFT-INSPIRED SWORD CURSOR ============== */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;
  const cursor=document.createElement('div');
  cursor.id='premiumCursor';
  cursor.innerHTML='<div class="sword-cursor" aria-hidden="true"><span class="blade"></span><span class="tip"></span><span class="guard"></span><span class="handle"></span><span class="pommel"></span></div><span class="cursor-glow"></span>';
  document.body.appendChild(cursor);
  const style=document.createElement('style');
  style.textContent=`
    html.cursor-active,html.cursor-active *{cursor:none !important}
    #premiumCursor{position:fixed;inset:0;z-index:10000;pointer-events:none;opacity:0;transition:opacity .18s ease}
    #premiumCursor.visible{opacity:1}
    #premiumCursor .sword-cursor{position:fixed;width:18px;height:54px;transform:translate(-3px,-48px) rotate(-28deg);filter:drop-shadow(0 2px 5px rgba(0,0,0,.55));transition:transform .16s ease}
    #premiumCursor .blade{position:absolute;left:7px;top:0;width:8px;height:34px;background:linear-gradient(90deg,#6b7280 0 20%,#f8fafc 22% 52%,#9ca3af 54% 78%,#475569 80%);clip-path:polygon(0 0,100% 0,100% 82%,50% 100%,0 82%);border:1px solid #111827;box-sizing:border-box}
    #premiumCursor .tip{position:absolute;left:8px;top:0;width:6px;height:7px;background:#f8fafc;clip-path:polygon(50% 0,100% 100%,0 100%)}
    #premiumCursor .guard{position:absolute;left:2px;top:31px;width:18px;height:7px;background:linear-gradient(#facc15,#a16207);border:2px solid #3f2d0b;box-sizing:border-box;box-shadow:0 1px 0 #fde68a inset}
    #premiumCursor .handle{position:absolute;left:7px;top:37px;width:8px;height:13px;background:repeating-linear-gradient(0deg,#5b341c 0 4px,#8b5a2b 4px 7px);border:1px solid #2b1609;box-sizing:border-box}
    #premiumCursor .pommel{position:absolute;left:5px;top:49px;width:12px;height:7px;background:#facc15;border:2px solid #3f2d0b;box-sizing:border-box}
    #premiumCursor .cursor-glow{position:fixed;width:130px;height:130px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(34,211,238,.13),rgba(139,53,255,.07) 36%,transparent 72%);filter:blur(10px);transition:width .2s ease,height .2s ease}
    #premiumCursor.hover .sword-cursor{transform:translate(-3px,-48px) rotate(-20deg) scale(1.12)}
    #premiumCursor.hover .cursor-glow{width:170px;height:170px}
    #premiumCursor.click .sword-cursor{transform:translate(-3px,-48px) rotate(-8deg) scale(.92)}
    @media (prefers-reduced-motion:reduce){#premiumCursor{display:none}html.cursor-active,html.cursor-active *{cursor:auto !important}}
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add('cursor-active');
  let x=innerWidth/2,y=innerHeight/2,glowX=x,glowY=y,raf=0;
  function render(){
    glowX+=(x-glowX)*.09;glowY+=(y-glowY)*.09;
    const sword=cursor.querySelector('.sword-cursor'),glow=cursor.querySelector('.cursor-glow');
    sword.style.left=x+'px';sword.style.top=y+'px';glow.style.left=glowX+'px';glow.style.top=glowY+'px';
    raf=requestAnimationFrame(render);
  }
  window.addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;cursor.classList.add('visible');const target=e.target.closest('a,button,input,textarea,select,.project,.cert,.skill,.about-skill-item');cursor.classList.toggle('hover',!!target)},{passive:true});
  window.addEventListener('mousedown',()=>cursor.classList.add('click'));window.addEventListener('mouseup',()=>cursor.classList.remove('click'));window.addEventListener('mouseleave',()=>cursor.classList.remove('visible'));window.addEventListener('blur',()=>cursor.classList.remove('visible'));window.addEventListener('focus',()=>cursor.classList.add('visible'));cancelAnimationFrame(raf);render();
})();
