/* ---------------------------------------------------------------
   Project thumbnails are generated locally as inline SVG data URIs
   — no external stock photos, fully offline & deploy-safe.
--------------------------------------------------------------- */
function hueFromString(str){
  let h=0;for(let i=0;i<str.length;i++){h=(h*31+str.charCodeAt(i))>>>0;}
  return h%360;
}
function initials(name){
  return name.replace(/[^A-Za-z0-9 ]/g,'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
}
/* base gradient card with a monogram + soft geometric pattern */
function abstractThumb(name){
  const h=hueFromString(name);
  const h2=(h+42)%360;
  const id='g'+h;
  const patternId='p'+h;
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='375' viewBox='0 0 600 375'>
    <defs>
      <linearGradient id='${id}' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='hsl(${h},70%,22%)'/>
        <stop offset='1' stop-color='hsl(${h2},75%,14%)'/>
      </linearGradient>
      <pattern id='${patternId}' width='40' height='40' patternUnits='userSpaceOnUse' patternTransform='rotate(20)'>
        <circle cx='20' cy='20' r='1.4' fill='hsla(${h2},90%,75%,.35)'/>
      </pattern>
    </defs>
    <rect width='600' height='375' fill='url(#${id})'/>
    <rect width='600' height='375' fill='url(#${patternId})'/>
    <circle cx='500' cy='60' r='120' fill='hsla(${h2},90%,60%,.10)'/>
    <circle cx='70' cy='330' r='150' fill='hsla(${h},90%,60%,.08)'/>
    <text x='40' y='260' font-family='Space Grotesk,sans-serif' font-size='84' font-weight='700'
      fill='hsla(0,0%,100%,.16)'>${initials(name)}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
}
/* hand-designed icon thumbnails for the verified, real repositories */
function iconThumb(name,glyph,hue){
  const h=hue,h2=(hue+40)%360;
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='375' viewBox='0 0 600 375'>
    <defs>
      <linearGradient id='ig${h}' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='hsl(${h},65%,20%)'/>
        <stop offset='1' stop-color='hsl(${h2},70%,12%)'/>
      </linearGradient>
    </defs>
    <rect width='600' height='375' fill='url(#ig${h})'/>
    <circle cx='300' cy='180' r='96' fill='none' stroke='hsla(${h2},90%,70%,.35)' stroke-width='1.5'/>
    <circle cx='300' cy='180' r='130' fill='none' stroke='hsla(${h2},90%,70%,.18)' stroke-width='1'/>
    <g transform='translate(300,180)' fill='none' stroke='hsl(${h2},90%,78%)' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'>${glyph}</g>
    <text x='40' y='330' font-family='Space Grotesk,sans-serif' font-size='20' letter-spacing='2'
      fill='hsla(0,0%,100%,.5)'>VERIFIED REPOSITORY</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
}

const GH='https://github.com/ucristano37-maker';

const verified=[
  {name:'Quiz Game with Live API',desc:'Interactive quiz application powered by a live trivia API with score tracking.',
   tags:['HTML','CSS','JavaScript','API'],url:GH+'/Quiz-game-with-live-API',
   img:iconThumb('quiz','<circle r="34" cx="0" cy="-8"/><path d="M-14 -20 q14 -22 28 0 q0 16 -14 20 v10"/><circle r="3" cy="34" fill="currentColor" stroke="none"/>',210)},
  {name:'Currency Exchanger',desc:'Real-time currency conversion tool built on live exchange-rate data.',
   tags:['JavaScript','API','CSS'],url:GH+'/Currency-Exchanger',
   img:iconThumb('currency','<path d="M-50 -10 h80 l-16 -16 M30 10 h-80 l16 16" transform="translate(10,0)"/>',150)},
  {name:'PDF Generator',desc:'Generates formatted PDF documents on demand from structured input.',
   tags:['Web','JavaScript'],url:GH+'/PDF-genarator',
   img:iconThumb('pdf','<rect x="-34" y="-46" width="68" height="92" rx="6"/><path d="M-34 -22 h68 M-34 0 h68 M-34 22 h40"/>',30)},
  {name:'Portfolio Website',desc:'Source of this very portfolio — a responsive personal site.',
   tags:['HTML','CSS','JavaScript'],url:GH+'/Portfolio-',
   img:iconThumb('portfolio','<rect x="-46" y="-34" width="92" height="68" rx="8"/><path d="M-46 -14 h92"/><circle r="2.2" cx="-38" cy="-24" fill="currentColor" stroke="none"/><circle r="2.2" cx="-30" cy="-24" fill="currentColor" stroke="none"/>',280)},
];

const concepts=['AI Chatbot','Calculator','Real-Time Currency Up/Down Report','Airplane Ticket Registration System',
'E-Commerce Website','AI Document Summarizer','n8n AI Workflow Automation','Zapier Automation',
'Smart Contact & Lead Automation','AI Productivity Tool','Business Automation Dashboard','Weather Dashboard',
'Task Manager','Expense Tracker','Markdown Editor','Recipe Finder','Movie Search App','GitHub Profile Explorer',
'News Dashboard','AI Prompt Library','Invoice Generator','Booking Dashboard','CRM Mini App','Analytics Dashboard',
'Kanban Board','Notes App','File Converter','URL Shortener UI','Password Generator UI','Responsive Landing Page',
'AI FAQ Assistant','Support Ticket Dashboard','Content Planner','Social Media Scheduler UI',
'Email Campaign Dashboard','Inventory Tracker','Product Comparison App','Study Planner','Code Snippet Manager',
'API Testing Dashboard','AI Resume Assistant','Document Q&A Interface','Workflow Monitor',
'Lead Qualification Assistant','Meeting Notes Assistant','AI Text Formatter','Customer Feedback Dashboard',
'Digital Product Store','Developer Tools Hub'];

const projects=[...verified, ...concepts.map(name=>({
  name,
  desc:'Concept placeholder — replace this entry with the real project details before presenting it as completed work.',
  tags:['Concept','Web','AI'],
  url:'#',
  img:abstractThumb(name),
  placeholder:true
}))];
