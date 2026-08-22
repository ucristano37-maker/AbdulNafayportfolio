const certificates=[
  {
    title:'Essentials: Your First Workflows',
    org:'n8n Academy',
    date:'August 19, 2026',
    img:'cert01.jpg',
    desc:'Covers the fundamentals of building automated workflows in n8n — nodes, triggers, data flow between steps, and running a first end-to-end automation.'
  },
  {
    title:'AI Automations — Make & Zapier',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert02.jpg',
    desc:'An 8-lesson course on designing AI-powered automations across Make and Zapier, connecting apps and triggering AI steps inside no-code pipelines. Final exam passed.'
  },
  {
    title:'AI Browsers & Computer Use Agents',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert03.jpg',
    desc:'A 9-lesson course on AI agents that operate a browser or computer directly — planning, clicking, and completing tasks autonomously. Final exam passed.'
  },
  {
    title:'AI Chatbot Building',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert04.jpg',
    desc:'A 6-lesson course on designing and building conversational AI chatbots, from prompt design to deployment. Final exam passed.'
  },
  {
    title:'AI Email Automation',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert05.jpg',
    desc:'A 5-lesson course on automating email workflows with AI — drafting, sorting, and responding at scale. Final exam passed.'
  },
  {
    title:'Automate Boring Tasks',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert06.jpg',
    desc:'A 7-lesson course on identifying repetitive work and automating it with no-code tools and AI. Final exam passed.'
  },
  {
    title:'Build AI Apps — No Code',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert07.jpg',
    desc:'An 18-lesson, in-depth course on building full AI-powered applications without writing traditional code. Final exam passed.'
  },
  {
    title:'Build a Custom GPT',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert08.jpg',
    desc:'A 6-lesson course on designing, configuring and shipping a custom GPT tailored to a specific task or audience. Final exam passed.'
  },
  {
    title:'Build a Website With AI',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert09.jpg',
    desc:'A 9-lesson course on using AI tools to design, generate, and ship a complete website. Final exam passed.'
  },
  {
    title:'Integrations: APIs & Connected Workflows',
    org:'n8n Academy',
    date:'August 20, 2026',
    img:'cert10.jpg',
    desc:'Covers connecting n8n to external APIs and services, authentication, and building multi-step connected workflows.'
  },
  {
    title:'n8n Automation — Beginners',
    org:'FreeAcademy.ai',
    date:'August 21, 2026',
    img:'cert11.jpg',
    desc:'A 7-lesson beginner course on n8n fundamentals — setting up workflows, nodes, and basic automations. Final exam passed.'
  },
  {
    title:'In Practice: AI, Testing & Best Practices',
    org:'n8n Academy',
    date:'August 21, 2026',
    img:'cert12.jpg',
    desc:'Applied practices for building reliable n8n workflows — integrating AI steps, testing automations, and following production best practices.'
  },
  {
    title:'n8n Course: No Code AI Agent Builder',
    org:'Simplilearn SkillUp',
    date:'December 20, 2026',
    img:'cert13.jpg',
    desc:'A complete course on building no-code AI agents in n8n, covering agent design, tool use, and deployment end to end.'
  },
];

/* ============== CERTIFICATE FULL-SIZE IMAGE FIX ============== */
(function(){
  const style=document.createElement('style');
  style.textContent=`
    #certModal .modal-box{
      max-width:min(1100px,96vw);
      width:auto;
      max-height:94vh;
      overflow:auto;
    }
    #certModal #certModalImg{
      width:auto;
      height:auto;
      max-width:100%;
      max-height:72vh;
      object-fit:contain;
      margin:0 auto;
      background:#0d1220;
      border-radius:var(--radius) var(--radius) 0 0;
    }
    @media (max-width:640px){
      #certModal{padding:10px}
      #certModal .modal-box{max-width:98vw;max-height:96vh}
      #certModal #certModalImg{max-height:68vh}
      #certModal .modal-content{padding:20px}
    }
  `;
  document.head.appendChild(style);
})();