/* Premium Resume tab + real uploaded CV download */
(function(){

const PHONE = '03363016943';
const EMAIL = 'a.nafayyyy@gmail.com';

/* GitHub Pages par uploaded PDF ka exact path */
const RESUME_URL =
  'https://ucristano37-maker.github.io/AbdulNafayportfolio/assets/AbdulNafay-Resume.pdf';

const css = `
.resume-section{
  padding-top:20px
}

.resume-card{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  padding:28px 30px;
  border:1px solid rgba(255,255,255,.12);
  border-radius:26px;
  background:linear-gradient(
    135deg,
    rgba(34,211,238,.07),
    rgba(168,85,247,.09)
  );
  box-shadow:0 20px 70px rgba(0,0,0,.25)
}

.resume-card small{
  display:block;
  letter-spacing:.16em;
  opacity:.65;
  margin-bottom:8px
}

.resume-card h3{
  margin:0 0 6px;
  font-size:1.5rem
}

.resume-card p{
  margin:0;
  opacity:.7
}

.resume-btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  min-width:200px;
  padding:15px 22px;
  border:0;
  border-radius:14px;
  color:#fff;
  font:inherit;
  font-weight:700;
  background:linear-gradient(110deg,#087cf5,#a72eea);
  box-shadow:0 10px 35px rgba(76,45,220,.35);
  cursor:pointer;
  transition:.3s
}

.resume-btn:hover{
  transform:translateY(-3px);
  box-shadow:0 16px 45px rgba(76,45,220,.5)
}

.resume-btn svg{
  width:20px;
  height:20px
}

.resume-btn.downloading{
  opacity:.8;
  transform:scale(.98)
}

.hire-contact-row{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px;
  margin:22px 0 4px
}

.hire-contact-card{
  display:flex;
  align-items:center;
  gap:14px;
  padding:16px 18px;
  border:1px solid rgba(255,255,255,.1);
  border-radius:18px;
  background:rgba(255,255,255,.035);
  color:inherit;
  text-decoration:none;
  transition:.3s
}

.hire-contact-card:hover{
  transform:translateY(-4px);
  border-color:rgba(34,211,238,.5)
}

.hire-contact-card svg{
  width:23px;
  height:23px;
  color:#22d3ee
}

.hire-contact-card.email svg{
  color:#c45cff
}

.hire-contact-card small{
  display:block;
  opacity:.62;
  margin-bottom:3px
}

.hire-contact-card strong{
  font-size:.96rem
}

@media(max-width:720px){

  .hire-contact-row{
    grid-template-columns:1fr
  }

  .resume-card{
    flex-direction:column;
    align-items:flex-start
  }

  .resume-btn{
    width:100%
  }

}
`;

const icons = {

  phone:
  '<svg viewBox="0 0 24 24">' +
  '<path d="M6.6 2.8 9 2.2c.7-.2 1.4.2 1.7.9l1.1 2.7c.3.7.1 1.4-.5 1.8L10 8.9a13.4 13.4 0 0 0 5.1 5.1l1.3-1.3c.5-.5 1.2-.6 1.8-.3l2.7 1.1c.7.3 1.1 1 .9 1.7l-.6 2.4c-.2.8-.9 1.4-1.7 1.4C10.4 19 5 13.6 5 4.5c0-.8.6-1.5 1.4-1.7Z" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
  '</svg>',

  mail:
  '<svg viewBox="0 0 24 24">' +
  '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
  '<path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
  '</svg>',

  download:
  '<svg viewBox="0 0 24 24">' +
  '<path d="M12 3v11m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
  '</svg>'

};

function addUI(){

  if(document.getElementById('resume')) return;

  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  const hire = document.querySelector('#hire .hire');

  if(!hire) return;

  /* Phone + Email */
  const row = document.createElement('div');

  row.className = 'hire-contact-row';

  row.innerHTML = `
    <a
      class="hire-contact-card"
      href="tel:${PHONE}"
    >
      ${icons.phone}
      <span>
        <small>Call me</small>
        <strong>${PHONE}</strong>
      </span>
    </a>

    <a
      class="hire-contact-card email"
      href="mailto:${EMAIL}"
    >
      ${icons.mail}
      <span>
        <small>Email me</small>
        <strong>${EMAIL}</strong>
      </span>
    </a>
  `;

  const hireActions = hire.querySelector('.hire-actions');

  if(hireActions){
    hire.insertBefore(row, hireActions);
  }else{
    hire.appendChild(row);
  }

  /* Resume section */
  const sec = document.createElement('section');

  sec.id = 'resume';
  sec.className = 'section resume-section';

  sec.innerHTML = `
    <div class="resume-card glass">

      <div>
        <small>RESUME</small>
        <h3>Download my CV</h3>
        <p>Download my uploaded CV as a PDF.</p>
      </div>

      <button
        id="resumeDownload"
        class="resume-btn"
        type="button"
      >
        ${icons.download}
        <span class="resume-label">Download Resume</span>
      </button>

    </div>
  `;

  const social = document.getElementById('social');

  if(social){
    social.parentNode.insertBefore(sec, social);
  }else{
    hire.parentNode.insertBefore(sec, hire.nextSibling);
  }

  /* Resume navigation tab */
  const links = document.getElementById('navLinks');

  if(
    links &&
    !links.querySelector('a[href="#resume"]')
  ){

    const a = document.createElement('a');

    a.href = '#resume';
    a.textContent = 'Resume';

    const contactLink =
      links.querySelector('a[href="#contact"]');

    if(contactLink){
      links.insertBefore(a, contactLink);
    }else{
      links.appendChild(a);
    }
  }

  const downloadButton =
    document.getElementById('resumeDownload');

  if(downloadButton){
    downloadButton.addEventListener(
      'click',
      download
    );
  }

}

/* Download CV */
function download(){

  const btn =
    document.getElementById('resumeDownload');

  if(!btn) return;

  const label =
    btn.querySelector('.resume-label');

  btn.classList.add('downloading');

  if(label){
    label.textContent = 'Downloading…';
  }

  const a = document.createElement('a');

  a.href = RESUME_URL;
  a.download = 'Abdul-Nafay-Resume.pdf';
  a.target = '_blank';
  a.rel = 'noopener';

  document.body.appendChild(a);

  a.click();

  a.remove();

  setTimeout(function(){

    btn.classList.remove('downloading');

    if(label){
      label.textContent = 'Download Resume';
    }

  },1000);

}

/* Start */
if(document.readyState === 'loading'){

  document.addEventListener(
    'DOMContentLoaded',
    addUI
  );

}else{

  addUI();

}

})();
