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