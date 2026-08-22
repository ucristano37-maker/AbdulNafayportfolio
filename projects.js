/* Project thumbnails are generated locally as inline SVG data URIs — no external images needed. */
function hueFromString(str){
  let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))>>>0;
  return h%360;
}
function initials(name){
  return name.replace(/[^A-Za-z0-9 ]/g,'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
}
function abstractThumb(name){
  const h=hueFromString(name), h2=(h+42)%360, id='g'+h, patternId='p'+h;
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='375' viewBox='0 0 600 375'>
  <defs><linearGradient id='${id}' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},70%,22%)'/><stop offset='1' stop-color='hsl(${h2},75%,14%)'/></linearGradient><pattern id='${patternId}' width='40' height='40' patternUnits='userSpaceOnUse' patternTransform='rotate(20)'><circle cx='20' cy='20' r='1.4' fill='hsla(${h2},90%,75%,.35)'/></pattern></defs>
  <rect width='600' height='375' fill='url(#${id})'/><rect width='600' height='375' fill='url(#${patternId})'/><circle cx='500' cy='60' r='120' fill='hsla(${h2},90%,60%,.10)'/><circle cx='70' cy='330' r='150' fill='hsla(${h},90%,60%,.08)'/><text x='40' y='260' font-family='Space Grotesk,sans-serif' font-size='84' font-weight='700' fill='hsla(0,0%,100%,.16)'>${initials(name)}</text></svg>`;
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
}

const GH='https://github.com/ucristano37-maker';
const projects=[
  {name:'AI Chatbot Assistant',desc:'A conversational AI assistant built with prompt engineering and a clean responsive chat interface for context-aware conversations.',tags:['AI','Chatbot','Prompt Engineering','JavaScript'],url:'#',img:abstractThumb('AI Chatbot Assistant')},
  {name:'AI Quiz Game',desc:'An interactive quiz game with questions, answer selection, score tracking and a polished learning-focused interface.',tags:['JavaScript','Quiz','UI/UX','Web Development'],url:GH+'/Quiz-game-with-live-API',img:abstractThumb('AI Quiz Game')},
  {name:'Currency Exchange App',desc:'A currency conversion application supporting 25 currencies with a simple responsive interface for quick exchange calculations.',tags:['Python','Currency API','Streamlit','API Integration'],url:GH+'/Currency-Exchanger',img:abstractThumb('Currency Exchange App')},
  {name:'PDF Generator',desc:'A Python PDF generation tool that creates clean downloadable documents from user-provided information.',tags:['Python','PDF','Automation','File Generation'],url:GH+'/PDF-genarator',img:abstractThumb('PDF Generator')},
  {name:'Airplane Ticket Registration System',desc:'A ticket registration application for passenger information and flight booking details with a simple user-friendly workflow.',tags:['Python','Forms','Data Management','UI'],url:'#',img:abstractThumb('Airplane Ticket Registration System')},
  {name:'Real-Time Up & Down Report',desc:'A reporting dashboard that presents changing values and performance information with clear visual up/down indicators.',tags:['Python','Dashboard','Reports','Data Visualization'],url:'#',img:abstractThumb('Real-Time Up & Down Report')},
  {name:'Super Collection — E-Commerce Store',desc:'A premium Pakistani fashion e-commerce experience with products, authentication, cart management, orders and Firebase integration.',tags:['React','Firebase','E-Commerce','JavaScript'],url:'#',img:abstractThumb('Super Collection E-Commerce Store')},
  {name:'Personal AI Engineer Portfolio',desc:'A responsive portfolio showcasing AI engineering, web development, automation skills, projects and professional contact links.',tags:['HTML','CSS','JavaScript','GitHub Pages'],url:GH+'/AbdulNafayportfolio',img:abstractThumb('Personal AI Engineer Portfolio')},
  {name:'n8n AI Workflow Automation',desc:'AI-powered workflow automation connecting apps, APIs and business processes to reduce repetitive manual work.',tags:['n8n','AI Automation','APIs','Workflows'],url:'#',img:abstractThumb('n8n AI Workflow Automation')},
  {name:'Zapier Business Automation',desc:'Multi-step Zapier automation workflows connecting apps, triggers and actions to streamline repetitive business tasks.',tags:['Zapier','Automation','APIs','Workflows'],url:'#',img:abstractThumb('Zapier Business Automation')},
  {name:'AI Document Summarizer',desc:'An AI-powered document tool that turns lengthy text into concise, structured summaries for faster reading and review.',tags:['AI','Python','NLP','Automation'],url:'#',img:abstractThumb('AI Document Summarizer')},
  {name:'Smart Contact & Lead Automation',desc:'An automated lead workflow that captures contact information, organizes submissions and connects follow-up actions through automation.',tags:['n8n','Automation','APIs','Lead Management'],url:'#',img:abstractThumb('Smart Contact Lead Automation')}
];