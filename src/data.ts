// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Mohammad Akram',
  firstName: 'Mohammad',
  lastName: 'Akram',
  title: 'Senior Full Stack Engineer',
  roles: [
    'Senior Full Stack Engineer',
    'AI Agent Builder',
    'Angular & React Specialist',
    'Next.js + Node.js Developer',
    'RAG & Multi-Agent Systems',
  ],
  location: 'Lucknow, India',
  email: 'aakram1708@gmail.com',
  github: 'https://github.com/erakram',
  githubHandle: 'erakram',
  linkedin: 'https://www.linkedin.com/in/er-mohammad-akram/',
  linkedinHandle: 'er-mohammad-akram',
  cv: '/Mohammad_Akram_CV.pdf',
  tagline:
    'I build scalable web & enterprise apps — and lately, AI agents that actually do the work.',
  summary: [
    'Senior Full Stack Engineer with 10+ years of experience building scalable web and enterprise applications with Angular, React, Next.js, TypeScript, JavaScript, Node.js and Vue.js.',
    'Recently I have been building AI agents and LLM applications — including a multi-agent healthcare revenue-cycle platform — with Python, the Claude API (Anthropic), FastAPI, LLM function calling, Retrieval-Augmented Generation (RAG) and hybrid search.',
    'I have delivered AI-powered and multi-cloud lab platforms for investment banking, ESG reporting and cloud training, and I use AI coding agents (Claude Code, OpenAI Codex) and custom sub-agents to speed up delivery.',
  ],
  languages: ['English', 'Hindi', 'Urdu'],
  notice: '30 Days',
}

export const stats = [
  { value: 10, suffix: '+', label: 'Years', sub: 'Full stack engineering' },
  { value: 3, suffix: '', label: 'Live AI Apps', sub: 'Multi-agent, RAG, tool use' },
  { value: 13, suffix: '+', label: 'Products Shipped', sub: 'Enterprise, AI & consumer' },
  { value: 400, suffix: '+', label: 'Tests Written', sub: 'pytest across AI agents' },
]

export const skillGroups = [
  {
    name: 'Frontend',
    icon: 'layout',
    items: ['Angular (9–21)', 'React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Vue.js', 'Nuxt.js', 'jQuery', 'HTML5', 'CSS3', 'NX Monorepo', 'Microsoft Teams Apps'],
  },
  {
    name: 'Backend',
    icon: 'server',
    items: ['Node.js', 'FastAPI', 'REST APIs', 'SQLAlchemy', 'Alembic', 'Server-Sent Events', 'JWT Auth'],
  },
  {
    name: 'AI / LLM',
    icon: 'brain',
    items: ['AI Agents', 'Claude API (Anthropic)', 'Function Calling / Tool Use', 'RAG', 'Agentic RAG', 'Embeddings', 'Vector Search', 'Hybrid Search (BM25 + Semantic)', 'Structured Outputs', 'Prompt Engineering', 'Human-in-the-Loop', 'LLM Evals', 'PHI Masking', 'Prompt-Injection Defence', 'Groq'],
  },
  {
    name: 'AI Dev Tools',
    icon: 'bot',
    items: ['Claude Code', 'OpenAI Codex', 'Agentic Coding', 'AI-Assisted Development', 'Custom Sub-agents', 'Multi-Agent Workflows'],
  },
  {
    name: 'Healthcare',
    icon: 'heart',
    items: ['Revenue Cycle Management', 'X12 EDI (837P, 835, 276/277)', 'FHIR (Da Vinci PAS)', 'ICD-10-CM', 'CPT', 'E/M Coding', 'CARC/RARC Denial Codes', 'Prior Authorization'],
  },
  {
    name: 'Data & Quality',
    icon: 'database',
    items: ['PostgreSQL', 'MongoDB', 'SQLite', 'SQLite FTS5', 'pytest', 'Unit & Integration Testing', 'Structured Logging', 'Observability', 'Caching, Retries & Timeouts'],
  },
]

export const marquee = [
  'Angular', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Vue.js', 'Nuxt.js', 'Python', 'FastAPI',
  'Claude API', 'RAG', 'PostgreSQL', 'MongoDB', 'Docker', 'NX Monorepo', 'Claude Code', 'Groq', 'FHIR',
]

export const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Spektra Systems, Bengaluru',
    note: 'on payroll of IMAClouds, Lucknow',
    period: 'Nov 2020 — Present',
    current: true,
    stack: ['Angular 21', 'NX Monorepo', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Nuxt.js'],
    points: [
      'Develop the CloudLabs Admin Portal (Angular 21) and Experience & Learner portals (Angular 9–14, NX).',
      'Deliver provisioning, access control, reporting and monitoring for multi-cloud lab environments.',
      'Build reusable UI components and NX monorepo libraries; integrate REST APIs and MongoDB-backed services.',
      'In parallel for IMAClouds: built GreenFi ESG (React/Next.js), Nexme AI (Vue/Nuxt), Klynt AI (Angular 21) for sell-side M&A, and Melville AI podcast app (Angular 14).',
      'Use AI coding agents (Claude Code, OpenAI Codex) and custom sub-agents to automate development tasks and speed up delivery.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'IMAClouds, Lucknow',
    period: 'May 2018 — Oct 2020',
    stack: ['Angular', 'React', 'Vue.js', 'Node.js'],
    points: ['Developed full stack web applications for IMAClouds clients using Angular, React, Vue.js, Node.js and JavaScript.'],
  },
  {
    role: 'Software Engineer',
    company: 'VLogic Labs, Lucknow',
    period: 'Sep 2016 — Feb 2018',
    stack: ['Ruby on Rails', 'Node.js', 'Angular', 'Vue.js'],
    points: ['Developed web applications using Ruby on Rails, Node.js, Angular, Vue.js and JavaScript.'],
  },
  {
    role: 'Software Engineer',
    company: 'Akaruilabs India, Lucknow',
    period: 'Mar 2016 — Aug 2016',
    stack: ['Ruby on Rails', 'Node.js'],
    points: ['Developed application features using Ruby on Rails, Node.js and JavaScript.'],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Omninet Technologies, Lucknow',
    period: 'Sep 2015 — Feb 2016',
    stack: ['.NET', 'JavaScript'],
    points: ['Developed web applications using .NET and JavaScript.'],
  },
]

export const aiProjects = [
  {
    name: 'HealthOps AI',
    subtitle: 'Multi-Agent Healthcare Operations Platform',
    url: 'https://healthops-ai-2.onrender.com',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js 15', 'React 19', 'Claude API', 'Groq', 'Docker'],
    gradient: 'from-fuchsia-500 via-violet-500 to-cyan-400',
    metrics: [
      { k: '74,719', v: 'ICD-10-CM codes' },
      { k: '350', v: 'pytest tests' },
      { k: '12/12', v: 'prior-auth evals' },
      { k: '95%', v: 'routing accuracy' },
    ],
    points: [
      'Hospital workflow run by specialist AI agents — front desk, claim intake, prior auth, coding, denials & appeals, A/R, billing and bank reconciliation — with a human approving every decision.',
      'Intake Agent reads complaints in English, Hinglish & Hindi; red-flag rules the model can never clear.',
      'Real X12 837P/835/276/277 and FHIR Da Vinci PAS; appeal letters cite only verified evidence.',
      'PHI masking on every LLM call, role-based access, hash-chained audit trail and prompt-injection defence.',
    ],
  },
  {
    name: 'Document Research Agent',
    subtitle: 'Agentic RAG with Hybrid Search',
    url: 'https://document-research-agent.onrender.com/',
    stack: ['Python', 'FastAPI', 'Groq', 'model2vec', 'SQLite FTS5', 'NumPy', 'Docker'],
    gradient: 'from-cyan-400 via-sky-500 to-indigo-500',
    metrics: [
      { k: 'BM25 + Vector', v: 'hybrid retrieval' },
      { k: 'RRF', v: 'rank fusion' },
      { k: '36', v: 'pytest tests' },
    ],
    points: [
      'Upload PDFs and ask questions — the agent searches, rephrases queries and answers with citations to exact passages and pages.',
      'Semantic vector search plus BM25 keyword search, merged with Reciprocal Rank Fusion.',
      'Every citation is validated against retrieved passages, so no source is ever invented.',
    ],
  },
  {
    name: 'Employee Support Agent',
    subtitle: 'Tool-Calling HR Assistant',
    url: 'https://employee-support-agent.onrender.com/',
    stack: ['Python', 'FastAPI', 'Groq LLM', 'SQLite', 'Docker'],
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    metrics: [
      { k: 'Tool use', v: 'function calling' },
      { k: 'TTL/LRU', v: 'caching' },
      { k: '26', v: 'pytest tests' },
    ],
    points: [
      'Answers employee questions (reporting lines, leave, HR policies) by calling tools that query a company database instead of guessing.',
      'Agent loop with argument validation, parameterised SQL and a step limit; the UI shows which tools produced each answer.',
      'Privacy by design — salary data is never exposed to tools. Retries with backoff, timeouts and latency logging.',
    ],
  },
]

export const projects = [
  { name: 'Klynt AI', stack: 'Angular 21', desc: 'AI platform automating repetitive sell-side M&A deal tasks for investment banks and advisory firms.', tag: 'AI' },
  { name: 'CloudLabs Admin Portal', stack: 'Angular 21', desc: 'Admin platform for cloud labs: users, provisioning, access control and monitoring.', tag: 'Enterprise' },
  { name: 'GreenFi ESG Platform', stack: 'React · Next.js', desc: 'ESG data collection and sustainability reporting platform.', tag: 'Enterprise' },
  { name: 'Nexme AI', stack: 'Vue.js · Nuxt.js', desc: 'AI platform for career and growth decisions with personalised insights and AI-agent workflows.', tag: 'AI' },
  { name: 'Melville App', stack: 'Angular 14', desc: 'AI podcast show notes: transcripts, key points, keywords and audio generation.', tag: 'AI' },
  { name: 'CloudLabs Experience Portal', stack: 'Angular 9/12/14 · NX', desc: 'Virtual labs for demos, product trials, POCs and workshops.', tag: 'Enterprise' },
  { name: 'CloudLabs Learner Portal', stack: 'Angular 9/12/14 · NX', desc: 'Virtual labs, certifications, automated validations and progress tracking.', tag: 'Enterprise' },
  { name: 'CloudLabs Practice Test', stack: 'Angular 9–12 · MS Teams', desc: 'Microsoft Cloud certification practice tests on web and as a Microsoft Teams app.', tag: 'Enterprise' },
  { name: 'Oddup', stack: 'Ruby on Rails', desc: 'Startup intelligence and investment analytics platform.', tag: 'Web' },
  { name: 'Telephone Installer', stack: 'Ruby on Rails', desc: 'Stripe subscriptions and Stripe webhooks.', tag: 'Web' },
  { name: 'ScootQ', stack: 'Vue.js · Node.js · MongoDB', desc: 'Scan in-store products and find lower prices elsewhere.', tag: 'Web' },
  { name: 'Space War', stack: 'Vue.js · Node.js', desc: 'Fast-paced strategic two-player card game.', tag: 'Web' },
  { name: 'Cosmo Wards', stack: 'jQuery · MongoDB', desc: 'Consumer and merchant food ordering apps with promos and coupons.', tag: 'Web' },
]

export const education = [
  { degree: 'Master of Computer Applications (MCA)', school: 'Shri Ramswaroop Memorial College of Engineering and Management (UPTU), Lucknow', period: '' },
  { degree: 'Bachelor of Science (B.Sc.)', school: 'Lucknow University, Lucknow', period: '2012 — 2015' },
]
