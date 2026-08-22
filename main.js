const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

/* ============== PRELOADER ============== */
window.addEventListener('load',()=>{
  const pl=$('#preloader');
  setTimeout(()=>{pl.classList.add('hide');document.body.classList.remove('locked');startTypewriter();},1900);
});
document.body.classList.add('locked');
setTimeout(()=>{const pl=$('#preloader');if(pl&&!pl.classList.contains('hide')){pl.classList.add('hide');document.body.classList.remove('locked');startTypewriter();}},4500);

/* ============== TYPEWRITER ============== */
function startTypewriter(){
  const el=$('#twText'); if(!el)return;
  const full='Hi, I am Abdul Nafay. I am 17 years old.'; let i=0;
  (function tick(){if(i<=full.length){el.textContent=full.slice(0,i);i++;setTimeout(tick,34);}})();
}

/* ============== HEADER SHOW ON SCROLL ============== */
const header=$('#siteHeader');
window.addEventListener('scroll',()=>{header.classList.toggle('show',window.scrollY>window.innerHeight*0.5);});

/* ============== HERO STATS ============== */
(function(){
  const stats=$$('.stats div');
  const values=[['4+','Years Coding'],['100+','Projects Built'],['100+','Automations'],['100%','Passion']];
  stats.forEach((el,i)=>{
    if(values[i]){
      el.querySelector('b').textContent=values[i][0];
      el.querySelector('small').textContent=values[i][1];
    }
  });
})();

/* ============== ABOUT SKILLS MARQUEE ============== */
(function(){
  const about=document.querySelector('#about');
  if(!about)return;
  const marquee=document.createElement('div');
  marquee.className='about-skills-marquee';
  const track=document.createElement('div');
  track.className='about-skills-track';
  const names=skills.map(([name])=>name);
  const items=[...names,...names];
  track.innerHTML=items.map(name=>`<span class="about-skill-item">${name}</span>`).join('');
  marquee.appendChild(track);
  about.insertAdjacentElement('afterend',marquee);

  const style=document.createElement('style');
  style.textContent=`
    .about-skills-marquee{
      position:relative;
      z-index:2;
      width:100%;
      overflow:hidden;
      padding:22px 0;
      border-top:1px solid rgba(255,255,255,.06);
      border-bottom:1px solid rgba(255,255,255,.06);
      background:rgba(7,10,18,.55);
    }
    .about-skills-track{
      display:flex;
      width:max-content;
      gap:14px;
      padding-left:14px;
      animation:aboutSkillsMove 32s linear infinite;
      will-change:transform;
    }
    .about-skill-item{
      display:inline-flex;
      align-items:center;
      white-space:nowrap;
      padding:9px 17px;
      border:1px solid rgba(255,255,255,.09);
      border-radius:999px;
      background:rgba(255,255,255,.035);
      color:var(--text-dim);
      font-family:var(--font-display);
      font-size:.82rem;
      transition:color .2s,border-color .2s,background .2s;
      cursor:default;
    }
    .about-skill-item::before{
      content:'✦';
      color:var(--accent2);
      margin-right:8px;
      font-size:.7rem;
    }
    .about-skill-item:hover{
      color:var(--text);
      border-color:rgba(34,211,238,.45);
      background:rgba(34,211,238,.08);
    }
    .about-skills-marquee:hover .about-skills-track{
      animation-play-state:paused;
    }
    @keyframes aboutSkillsMove{
      from{transform:translateX(0)}
      to{transform:translateX(calc(-50% - 7px))}
    }
    @media(max-width:720px){
      .about-skills-marquee{padding:18px 0}
      .about-skills-track{gap:10px;animation-duration:26s}
      .about-skill-item{font-size:.76rem;padding:8px 14px}
    }
    @media(prefers-reduced-motion:reduce){
      .about-skills-track{animation:none}
    }
  `;
  document.head.appendChild(style);
})();

/* ============== SKILLS ============== */
let skillCount=10;
function renderSkills(){
  const g=$('#skillsGrid');
  g.innerHTML=skills.slice(0,skillCount).map(([n,p])=>`<div class="skill glass"><div><b>${n}</b><span>${p}%</span></div><div class="bar"><i style="width:${p}%"></i></div></div>`).join('');
  observeBars();
}
$('#skillMore').onclick=()=>{
  skillCount=skillCount===10?skills.length:10;
  renderSkills();
  $('#skillMore').textContent=skillCount===10?'Show More 10 ＋':'Show Less −';
};

/* ============== PROJECTS ============== */
let projectCount=6;
function renderProjects(){
  const g=$('#projectGrid');
  g.innerHTML=projects.slice(0,projectCount).map((p,i)=>`<article class="project glass" data-i="${i}">
    <img class="thumb" loading="lazy" src="${p.img}" alt="${p.name}">
    <div><small>${p.url==='#'?'PROJECT':'VIEW PROJECT'}</small><h3>${p.name}</h3><p>${p.desc}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><span class="project-link">View project</span></div>
  </article>`).join('');
  $$('.project').forEach(x=>x.onclick=()=>openProject(+x.dataset.i));
}
$('#projectMore').onclick=()=>{
  projectCount=projectCount<projects.length?projects.length:6;
  renderProjects();
  $('#projectMore').textContent=projectCount>=projects.length?'Show Less −':'Show More';
};
function openProject(i){
  const p=projects[i];
  $('#modalImg').src=p.img;$('#modalImg').alt=p.name;$('#modalTitle').textContent=p.name;$('#modalDesc').textContent=p.desc;$('#modalStatus').textContent='PROJECT';$('#modalTags').innerHTML=p.tags.map(t=>`<span>${t}</span>`).join('');
  $('#modalLink').href=p.url;$('#modalLink').style.display=p.url==='#'?'none':'inline-flex';openModal('#modal');
}

/* ============== CERTIFICATES ============== */
function renderCerts(){
  const g=$('#certGrid');
  g.innerHTML=certificates.map((c,i)=>`<article class="cert glass" data-i="${i}"><div class="thumb-wrap"><img loading="lazy" src="${c.img}" alt="${c.title}"><span class="badge">VERIFIED</span></div><div><small>${c.org}</small><h3>${c.title}</h3><p>${c.date}</p></div></article>`).join('');
  $$('.cert').forEach(x=>x.onclick=()=>openCert(+x.dataset.i));
}
function openCert(i){const c=certificates[i];$('#certModalImg').src=c.img;$('#certModalImg').alt=c.title;$('#certModalOrg').textContent=c.org;$('#certModalTitle').textContent=c.title;$('#certModalDesc').textContent=c.desc;$('#certModalDate').textContent=c.date;openModal('#certModal');}

/* ============== MODALS ============== */
function openModal(sel){$(sel).classList.add('open');$(sel).setAttribute('aria-hidden','false');document.body.classList.add('locked');}
function closeModal(sel){$(sel).classList.remove('open');$(sel).setAttribute('aria-hidden','true');document.body.classList.remove('locked');}
$('#closeModal').onclick=()=>closeModal('#modal');$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal('#modal')};
$('#closeCertModal').onclick=()=>closeModal('#certModal');$('#certModal').onclick=e=>{if(e.target.id==='certModal')closeModal('#certModal')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal('#modal');closeModal('#certModal');}});

/* ============== NAV ============== */
$('#menuBtn').onclick=()=>$('#navLinks').classList.toggle('open');
$$('.links a').forEach(a=>a.onclick=()=>$('#navLinks').classList.remove('open'));
const sections=$$('section[id]'),navA=$$('.links a');
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)navA.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));});},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>sectionObserver.observe(s));

/* ============== SCROLL REVEAL ============== */
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revealObserver.unobserve(e.target);}});},{threshold:.12});
$$('.reveal').forEach(el=>revealObserver.observe(el));

/* ============== SKILL BAR ANIMATION ============== */
function observeBars(){
  const barObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');barObserver.unobserve(e.target);}});},{threshold:.3});
  $$('.skill').forEach(el=>barObserver.observe(el));
}

/* ============== CONTACT FORM ============== */
$('#contactForm').addEventListener('submit',async e=>{
  e.preventDefault();const form=e.target,status=$('#status');
  const name=$('#name').value.trim(),email=$('#email').value.trim(),message=$('#message').value.trim();
  if(!name||!email||!message||!$('#email').checkValidity()){status.textContent='Please enter a valid name, email and message.';status.classList.add('error');return;}
  status.classList.remove('error');status.textContent='Sending your message…';const btn=form.querySelector('button[type="submit"]');btn.disabled=true;
  try{const res=await fetch(form.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});const data=await res.json();if(data.success){status.textContent='Message sent — thank you! I will get back to you soon.';form.reset();}else{status.textContent='Something went wrong. Please try again or email me directly.';status.classList.add('error');}}catch(err){status.textContent='Network error — please try again or email me directly.';status.classList.add('error');}finally{btn.disabled=false;}
});

renderSkills();renderProjects();renderCerts();