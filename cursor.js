/* Modern pixel-sword cursor */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;
  const cursor=document.createElement('div');cursor.id='premiumCursor';
  cursor.innerHTML='<div class="sword-cursor" aria-hidden="true"><span class="blade"></span><span class="edge"></span><span class="guard"></span><span class="handle"></span><span class="pommel"></span></div><span class="cursor-ring"></span>';
  document.body.appendChild(cursor);
  const style=document.createElement('style');style.textContent=`
    html.cursor-active,html.cursor-active *{cursor:none!important}
    #premiumCursor{position:fixed;inset:0;z-index:10000;pointer-events:none;opacity:0;transition:opacity .15s ease}
    #premiumCursor.visible{opacity:1}
    .sword-cursor{position:fixed;width:56px;height:56px;transform:translate(-7px,-8px) rotate(-45deg);filter:drop-shadow(0 4px 8px rgba(0,0,0,.5));transition:transform .14s ease}
    .blade{position:absolute;left:25px;top:2px;width:9px;height:38px;background:linear-gradient(90deg,#64748b 0 18%,#f8fafc 20% 50%,#cbd5e1 52% 78%,#475569 80%);clip-path:polygon(50% 0,100% 15%,82% 100%,18% 100%,0 15%);box-shadow:0 0 10px rgba(34,211,238,.35)}
    .edge{position:absolute;left:29px;top:6px;width:2px;height:31px;background:#fff;opacity:.85}
    .guard{position:absolute;left:12px;top:35px;width:35px;height:7px;border-radius:3px;background:linear-gradient(90deg,#6d28d9,#22d3ee,#6d28d9);box-shadow:0 0 12px rgba(34,211,238,.35)}
    .handle{position:absolute;left:26px;top:41px;width:8px;height:12px;border-radius:2px;background:repeating-linear-gradient(0deg,#18181b 0 3px,#52525b 3px 5px);border:1px solid #09090b}
    .pommel{position:absolute;left:22px;top:50px;width:16px;height:7px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#22d3ee);box-shadow:0 0 9px rgba(139,92,246,.5)}
    .cursor-ring{position:fixed;width:30px;height:30px;border:1px solid rgba(34,211,238,.42);border-radius:50%;transform:translate(-50%,-50%);transition:width .16s ease,height .16s ease,border-color .16s ease,background .16s ease;box-shadow:0 0 16px rgba(34,211,238,.12)}
    #premiumCursor.hover .cursor-ring{width:44px;height:44px;border-color:rgba(139,92,246,.75);background:rgba(139,92,246,.05)}
    #premiumCursor.hover .sword-cursor{transform:translate(-7px,-8px) rotate(-45deg) scale(1.1)}
    #premiumCursor.click .sword-cursor{transform:translate(-7px,-8px) rotate(-45deg) scale(.9)}
    @media(max-width:900px),(pointer:coarse){#premiumCursor{display:none}html.cursor-active,html.cursor-active *{cursor:auto!important}}
    @media(prefers-reduced-motion:reduce){#premiumCursor{display:none}html.cursor-active,html.cursor-active *{cursor:auto!important}}
  `;document.head.appendChild(style);document.documentElement.classList.add('cursor-active');
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y,raf=0;
  function render(){rx+=(x-rx)*.2;ry+=(y-ry)*.2;const s=cursor.querySelector('.sword-cursor'),r=cursor.querySelector('.cursor-ring');s.style.left=x+'px';s.style.top=y+'px';r.style.left=rx+'px';r.style.top=ry+'px';raf=requestAnimationFrame(render)}
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;cursor.classList.add('visible');cursor.classList.toggle('hover',!!e.target.closest('a,button,input,textarea,select,.project,.cert,.skill,.about-skill-item'))},{passive:true});
  addEventListener('mousedown',()=>cursor.classList.add('click'));addEventListener('mouseup',()=>cursor.classList.remove('click'));addEventListener('blur',()=>cursor.classList.remove('visible'));addEventListener('focus',()=>cursor.classList.add('visible'));document.addEventListener('mouseleave',()=>cursor.classList.remove('visible'));cancelAnimationFrame(raf);render();
})();
