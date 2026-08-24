/* ============== HIRE CONTACTS + RESUME DOWNLOAD ============== */
(function(){
  const PHONE='03363016943';
  const EMAIL='a.nafayyyy@gmail.com';

  const icons={
    phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 2.8 9 2.2c.7-.2 1.4.2 1.7.9l1.1 2.7c.3.7.1 1.4-.5 1.8L10 8.9a13.4 13.4 0 0 0 5.1 5.1l1.3-1.3c.5-.5 1.2-.6 1.8-.3l2.7 1.1c.7.3 1.1 1 .9 1.7l-.6 2.4c-.2.8-.9 1.4-1.7 1.4C10.4 19 5 13.6 5 4.5c0-.8.6-1.5 1.4-1.7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const style=document.createElement('style');
  style.textContent=`
    .hire-contact-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:22px 0 4px}
    .hire-contact-card{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:rgba(255,255,255,.035);color:inherit;text-decoration:none;transition:transform .3s ease,border-color .3s ease,background .3s ease,box-shadow .3s ease}
    .hire-contact-card:hover{transform:translateY(-4px);border-color:rgba(34,211,238,.5);background:rgba(34,211,238,.055);box-shadow:0 14px 45px rgba(0,0,0,.25)}
    .hire-contact-card svg{width:23px;height:23px;flex:none;color:#22d3ee}
    .hire-contact-card.email svg{color:#c45cff}
    .hire-contact-card small{display:block;opacity:.62;margin-bottom:3px}
    .hire-contact-card strong{font-size:.96rem;word-break:break-word}
    .resume-section{padding-top:20px}
    .resume-card{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:28px 30px;border:1px solid rgba(255,255,255,.1);border-radius:26px;background:linear-gradient(135deg,rgba(34,211,238,.055),rgba(168,85,247,.07));box-shadow:0 20px 70px rgba(0,0,0,.2)}
    .resume-card small{display:block;letter-spacing:.16em;opacity:.62;margin-bottom:8px}
    .resume-card h3{margin:0 0 6px;font-size:1.5rem}
    .resume-card p{margin:0;opacity:.7}
    .resume-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:190px;padding:14px 20px;border:0;border-radius:14px;color:#fff;text-decoration:none;font:inherit;font-weight:700;background:linear-gradient(110deg,#087cf5,#a72eea);box-shadow:0 10px 35px rgba(76,45,220,.3);cursor:pointer;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease}
    .resume-btn::before{content:'';position:absolute;inset:-2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.32),transparent);transform:translateX(-120%);transition:transform .65s ease}
    .resume-btn:hover{transform:translateY(-3px) scale(1.015);box-shadow:0 16px 45px rgba(76,45,220,.42)}
    .resume-btn:hover::before{transform:translateX(120%)}
    .resume-btn svg{width:20px;height:20px;transition:transform .3s ease}
    .resume-btn:hover svg{transform:translateY(3px)}
    .resume-btn.downloading{pointer-events:none;opacity:.8}
    .resume-btn.downloading svg{animation:resumeBounce .8s ease infinite}
    @keyframes resumeBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
    @media(max-width:720px){.hire-contact-row{grid-template-columns:1fr}.resume-card{flex-direction:column;align-items:flex-start;padding:22px}.resume-btn{width:100%}}
  `;
  document.head.appendChild(style);

  function addNav(){
    const links=document.querySelector('#navLinks');
    if(!links || links.querySelector('a[href="#resume"]')) return;
    const a=document.createElement('a'); a.href='#resume'; a.textContent='Resume';
    const contact=links.querySelector('a[href="#contact"]');
    if(contact) links.insertBefore(a,contact); else links.appendChild(a);
  }

  function addHireContacts(){
    const hire=document.querySelector('#hire .hire');
    if(!hire || hire.querySelector('.hire-contact-row')) return;
    const row=document.createElement('div'); row.className='hire-contact-row';
    row.innerHTML=`<a class="hire-contact-card" href="tel:${PHONE}">${icons.phone}<span><small>Call me</small><strong>${PHONE}</strong></span></a><a class="hire-contact-card email" href="mailto:${EMAIL}">${icons.mail}<span><small>Email me</small><strong>${EMAIL}</strong></span></a>`;
    const actions=hire.querySelector('.hire-actions');
    hire.insertBefore(row,actions || null);
  }

  function addResumeSection(){
    if(document.querySelector('#resume')) return;
    const hire=document.querySelector('#hire');
    const social=document.querySelector('#social');
    if(!hire) return;
    const section=document.createElement('section');
    section.id='resume'; section.className='section resume-section reveal';
    section.innerHTML=`<div class="resume-card glass"><div><small>RESUME</small><h3>Download my CV</h3><p>Get a clean PDF copy of my professional resume.</p></div><button class="resume-btn" id="resumeDownload" type="button">${icons.download}<span>Download Resume</span></button></div>`;
    if(social) social.parentNode.insertBefore(section,social); else hire.parentNode.insertBefore(section,hire.nextSibling);
    section.querySelector('#resumeDownload').addEventListener('click',downloadResume);
  }

  function esc(s){return String(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/\r?\n/g,' ')}
  function makePDF(){
    const lines=[
      'FARHAN AHMED',
      'AI ENGINEER & WEB DEVELOPER',
      'CONTACT',
      'Email: ucristano37@gmail.com  |  Phone: 03363016943  |  Pakistan',
      'LinkedIn: linkedin.com/in/abdulnafay  |  Age: 30 Years',
      '',
      'INTRODUCTION',
      'I am Farhan, a dedicated and ambitious individual with a strong passion for learning,',
      'growth, and making a positive impact in the world. I am constantly exploring new skills,',
      'improving myself, and working towards becoming the best version of myself.',
      'I believe in hard work, discipline, and consistency. My goal is to use my knowledge and',
      'skills to build innovative solutions, help others, and achieve success in every field I pursue.',
      '',
      'EDUCATION',
      'Education in Progress',
      'Currently pursuing education with a focus on building a strong foundation for the future.',
      '',
      'TECHNICAL SKILLS',
      'Programming (All Languages), Web Development, App Development, Software Development,',
      'Game Development, Cyber Security, Ethical Hacking, Networking, Database Management,',
      'AI & Machine Learning, Data Science & Analytics, Cloud Computing, DevOps, Blockchain,',
      'UI/UX Design, Automation & Scripting, Robotics & IoT, CAD Designing, Video Editing,',
      'Image Editing, 3D Modeling & Animation, Sound Editing & Mixing, Graphic Designing,',
      'Troubleshooting.',
      '',
      'BUSINESS SKILLS',
      'Research, Report Writing, Essay Writing, Mathematics, Logical Reasoning, Data Interpretation,',
      'Science, History, Geography, Grammar, Entrepreneurship, Business Management, Digital Marketing,',
      'E-commerce, Dropshipping, Sales & Negotiation, Customer Service, Market Research, Branding,',
      'Advertising, Project Management, Operations Management, Financial Management, Investment,',
      'Stock Market Trading, Crypto Trading, Real Estate Knowledge, Leadership, Team Management,',
      'Time Management, Decision Making, Risk Management.',
      '',
      'CREATIVE & SOCIAL SKILLS',
      'Graphic Design, Logo Design, Poster Design, Flyer Design, Thumbnail Design, Motion Graphics,',
      'Illustration, Calligraphy, Content Creation, Photography, Storytelling, Script Writing, Blog Writing,',
      'Copywriting, Resume Writing, Presentation Design, Animation, Voice Over, Teamwork, Collaboration,',
      'Communication Skills, Public Speaking, Critical Thinking, Problem Solving, Creativity, Adaptability,',
      'Patience, Goal Setting, Positive Thinking, Continuous Learning, Leadership Qualities.',
      '',
      'LANGUAGES',
      'English (Fluent)  |  Urdu (Native)',
      '',
      'INTERESTS',
      'Technology & Innovation, Reading & Learning, Programming, Artificial Intelligence, Fitness & Health,',
      'Travel & Exploring, Helping People & Community, Business & Entrepreneurship.'
    ];
    const pageW=595,pageH=842,left=42,top=800,lineH=13,max=87;
    const pages=[]; let page=[];
    lines.forEach(line=>{if(page.length>=max){pages.push(page);page=[]}page.push(line)}); if(page.length)pages.push(page);
    const objects=[]; const offsets=[0];
    const add=o=>{objects.push(o);return objects.length};
    const font=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    const bold=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
    const pageIds=[];
    pages.forEach((pg,pi)=>{
      let y=top; let content='BT\n';
      pg.forEach((line,idx)=>{const isHead=/^(CONTACT|INTRODUCTION|EDUCATION|TECHNICAL SKILLS|BUSINESS SKILLS|CREATIVE & SOCIAL SKILLS|LANGUAGES|INTERESTS)$/.test(line); const isTitle=idx===0&&pi===0; content+=`/${isHead||isTitle?'F2':'F1'} ${isTitle?'18':isHead?'11':'9'} Tf ${left} ${y} Td (${esc(line)}) Tj 0 -${lineH} Td\n`; y-=lineH+(isHead?3:0)}); content+='ET';
      const stream=add(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
      const page=add(`<< /Type /Page /Parent PAGES /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /Font << /F1 ${font} 0 R /F2 ${bold} 0 R >> >> /Contents ${stream} 0 R >>`); pageIds.push(page);
    });
    const pagesObj=add(`<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map(id=>id+' 0 R').join(' ')}] >>`);
    pageIds.forEach(id=>objects[id-1]=objects[id-1].replace('PAGES',pagesObj+' 0 R'));
    const catalog=add(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);
    let pdf='%PDF-1.4\n'; objects.forEach((o,i)=>{offsets[i+1]=pdf.length;pdf+=`${i+1} 0 obj\n${o}\nendobj\n`}); const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;for(let i=1;i<=objects.length;i++)pdf+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';pdf+=`trailer\n<< /Size ${objects.length+1} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return new Blob([pdf],{type:'application/pdf'});
  }

  function downloadResume(){
    const btn=document.querySelector('#resumeDownload'); if(!btn)return;
    btn.classList.add('downloading'); const span=btn.querySelector('span'); if(span)span.textContent='Preparing Resume…';
    setTimeout(()=>{const blob=makePDF();const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Farhan-AI-Engineer-Resume.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);btn.classList.remove('downloading');if(span)span.textContent='Download Resume';},350);
  }

  function init(){addNav();addHireContacts();addResumeSection();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
