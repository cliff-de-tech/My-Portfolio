/* ====== AI CHATBOT FOR PORTFOLIO - PAGE-AWARE VERSION ====== */
(function () {
  // Detect current page
  const currentPage = (() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('playground')) return 'playground';
    if (path.includes('about')) return 'about';
    if (path.includes('skills')) return 'skills';
    if (path.includes('portfolio') || path.includes('project')) return 'portfolio';
    if (path.includes('contact')) return 'contact';
    return 'home';
  })();

  // Knowledge base about Clifford - BACKEND ENGINEER FOCUS
  const knowledgeBase = {
    name: "Clifford Opoku-Sarkodie",
    nickname: "Cliff-De-Tech",
    title: "Backend Software Engineer",
    subtitle: "DevSecOps Specialist & Creative Technologist",
    location: "Accra, Ghana",
    timezone: "GMT+0",
    email: "cliffdetech@gmail.com",
    phone: "+233 54 709 2289",
    whatsapp: "+233 20 709 6991",

    skills: {
      languages: ["Python", "JavaScript", "TypeScript", "SQL", "C", "Bash"],
      backend: ["FastAPI", "Node.js", "Django", "Express.js", "REST APIs", "GraphQL"],
      devops: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions", "CI/CD"],
      databases: ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
      security: ["JWT", "OAuth2", "RBAC", "API Security", "OWASP"],
      creative: ["Figma", "UI/UX Design", "Photoshop", "Illustrator"]
    },

    services: [
      "Backend Architecture",
      "API Development & Integration",
      "DevSecOps & CI/CD Pipelines",
      "Fintech Systems & Payment APIs",
      "Cloud Infrastructure (AWS)",
      "Database Design & Optimization"
    ],

    projects: {
      postbot: {
        name: "LinkedIn Content Automation Bot",
        description: "AI-powered content pipeline using Groq LLM for professional post generation with scheduling and analytics",
        tech: ["Python", "FastAPI", "Groq LLM", "Next.js", "PostgreSQL", "Docker"],
        github: "https://github.com/cliff-de-tech/Post-Bot",
        category: "Automation & AI"
      },
      authforge: {
        name: "AuthForge",
        description: "Centralized auth microservice with RBAC, JWT refresh tokens, and audit logging",
        tech: ["TypeScript", "Node.js", "JWT", "PostgreSQL", "Docker", "RBAC"],
        github: "https://github.com/cliff-de-tech/AuthForge",
        category: "Backend Security"
      },
      eventflow: {
        name: "EventFlow",
        description: "Event-driven pipeline with Redis Streams, circuit breakers, and Prometheus/Grafana observability",
        tech: ["Python", "FastAPI", "Redis Streams", "Prometheus", "Grafana", "Docker"],
        github: "https://github.com/cliff-de-tech/EventFlow",
        category: "Cloud & DevSecOps"
      }
    },

    social: {
      linkedin: "linkedin.com/in/clifford-opoku-sarkodie-377505369",
      github: "github.com/cliff-de-tech",
      twitter: "x.com/cliffdetech",
      instagram: "instagram.com/cliffdetech"
    },

    availability: "Open to opportunities",
    responseTime: "24-48 hours"
  };

  // Page-specific welcome messages
  const pageWelcomes = {
    home: [
      `👋 Welcome! I'm Cliff's AI assistant. He's a **Backend Engineer** specializing in secure APIs, DevSecOps, and fintech systems. What would you like to know?`,
      `Hey there! Looking to learn about Cliff's backend engineering work? I can help with services, projects, or hiring info!`
    ],
    about: [
      `📖 Curious about Cliff's journey from **Designer → Engineer**? Ask me about his background, education, or experience!`,
      `👋 Welcome to Cliff's story! He bridges design intuition with backend engineering. What would you like to explore?`
    ],
    skills: [
      `💻 Checking out Cliff's tech stack? Ask me about any technology here — **Python, Docker, Kubernetes, AWS**, and more!`,
      `🛠️ Want details on any skill? I can tell you about proficiency levels, projects using that tech, or related tools!`
    ],
    portfolio: [
      `🔍 Exploring projects? Ask me about **Post-Bot**, **AuthForge**, **EventFlow**, or any other system architecture!`,
      `🏗️ Each project has a story! Ask about the challenge, solution, or tech stack for any project here.`
    ],
    contact: [
      `📬 Ready to collaborate? I can answer questions about availability, pricing, response times, or project scope!`,
      `👋 Thinking about hiring Cliff? Ask about his process, availability, or what info to include in your message!`
    ],
    playground: [
      `🎮 Welcome to the **API Playground**! I'm your API assistant. Ask me about **REST best practices**, **authentication**, **endpoints**, or try the mock APIs above!`,
      `🔧 Hey! Ready to explore APIs? I can explain **JWT tokens**, **HTTP methods**, **status codes**, or help you test the endpoints!`
    ]
  };

  // Page-specific quick replies (3rd person - asking about Cliff)
  const pageQuickReplies = {
    home: [
      { label: "Services", message: "What services does Cliff offer?" },
      { label: "Skills", message: "What are his main skills?" },
      { label: "Projects", message: "Show me his projects" },
      { label: "Hire", message: "How can I hire him?" }
    ],
    about: [
      { label: "Journey", message: "Tell me about his journey" },
      { label: "Education", message: "What's his education?" },
      { label: "Experience", message: "Where has he worked?" },
      { label: "Certifications", message: "Does he have certifications?" }
    ],
    skills: [
      { label: "Python", message: "Tell me about his Python skills" },
      { label: "DevOps", message: "What DevOps tools does he use?" },
      { label: "Cloud", message: "What cloud experience does he have?" },
      { label: "Security", message: "Tell me about his security skills" }
    ],
    portfolio: [
      { label: "Post-Bot", message: "Tell me about Post-Bot" },
      { label: "AuthForge", message: "Tell me about AuthForge" },
      { label: "EventFlow", message: "Tell me about EventFlow" },
      { label: "All Projects", message: "Show me all his projects" }
    ],
    contact: [
      { label: "Availability", message: "Is Cliff available for work?" },
      { label: "Pricing", message: "What are his rates?" },
      { label: "Response Time", message: "How fast does he respond?" },
      { label: "Process", message: "What's his hiring process?" }
    ],
    playground: [
      { label: "Endpoints", message: "What endpoints are available?" },
      { label: "REST Tips", message: "Give me REST API best practices" },
      { label: "JWT", message: "How does JWT authentication work?" },
      { label: "Status Codes", message: "Explain HTTP status codes" }
    ]
  };

  // Response patterns with intelligent follow-up suggestions
  const responses = {
    greeting: () => pageWelcomes[currentPage][Math.floor(Math.random() * pageWelcomes[currentPage].length)],

    about: [
      `Clifford Opoku-Sarkodie (Cliff-De-Tech) is a **Backend Software Engineer** based in ${knowledgeBase.location}. He transitioned from graphic design to engineering — combining creative intuition with technical precision.\n\n💡 **His approach:**\n• Scalability First — Systems that grow\n• Security by Design — Zero-trust mindset\n• Developer-Friendly APIs — Clean endpoints devs love\n\n💡 **Want to know more?**\n• His <span class="clickable-suggestion">education</span>\n• His <span class="clickable-suggestion">experience</span>\n• View <span class="clickable-suggestion">projects</span>`
    ],

    journey: [
      `**Designer → Engineer** 🎨➡️💻\n\nCliff started as a **Graphic Designer** creating brand identities and marketing materials. Over time, he discovered his passion for building the systems behind the visuals.\n\nNow he architects **backend systems, DevSecOps pipelines, and fintech APIs** — but still brings that design intuition to API ergonomics.\n\n💡 **Learn more:**\n• His <span class="clickable-suggestion">education</span>\n• His <span class="clickable-suggestion">experience</span>\n• <span class="clickable-suggestion">What he does</span> now`
    ],

    location: [
      `Cliff is from Ghana 🇬🇭, based in **${knowledgeBase.location}** (${knowledgeBase.timezone}).\n\nHe works with clients globally and is available for remote opportunities!\n\n💡 **Connect:**\n• Get his <span class="clickable-suggestion">contact info</span>\n• Check <span class="clickable-suggestion">availability</span>\n• View <span class="clickable-suggestion">social media</span>`
    ],

    whatHeDoes: [
      `As a **Backend Software Engineer**, Cliff builds:\n\n⚙️ **Backend Architecture** — Scalable APIs & microservices\n🔒 **DevSecOps** — CI/CD pipelines with security scanning\n💳 **Fintech Systems** — Payment APIs, transaction processing\n☁️ **Cloud Solutions** — AWS, containerization, IaC\n\n💡 **See it in action:**\n• View <span class="clickable-suggestion">projects</span>\n• Check <span class="clickable-suggestion">skills</span>\n• <span class="clickable-suggestion">Hire him</span>`
    ],

    education: [
      `Cliff's education:\n\n🎓 **University of the People** — Computer Science\n🎓 **ALX Africa** — Software Engineering\n\nHe also holds certifications in cloud & security. Check the <a href="about.html">About Page</a> for certificates!\n\n💡 **Related:**\n• His <span class="clickable-suggestion">experience</span>\n• His <span class="clickable-suggestion">skills</span>\n• <span class="clickable-suggestion">Projects</span>`
    ],

    experience: [
      `Work experience:\n\n🏢 **ALX Africa** — Software Engineering & Learner Success Champion\n🏢 **Ike Media GH** — Design & Development\n\nSee his work on the <a href="portfolio.html">Projects Page</a>!\n\n💡 **Explore:**\n• View <span class="clickable-suggestion">projects</span>\n• Check <span class="clickable-suggestion">skills</span>\n• <span class="clickable-suggestion">Hire him</span>`
    ],

    endpoints: [
      `**Available Endpoints:**\n\n🟢 \`GET /api/users\` — List specific users\n🟢 \`GET /api/users/:id\` — Get user details\n🟢 \`GET /api/projects\` — Cliff's project portfolio\n🟠 \`POST /api/auth/login\` — Test authentication\n🟢 \`GET /api/health\` — System status check\n\n💡 **Try it:** Select an endpoint in the dropdown and click Send!`
    ],

    rest: [
      `**REST API Best Practices:**\n\n1. **Use Nouns:** \`/users\` not \`/getUsers\`\n2. **HTTP Methods:** GET (read), POST (create), PUT (update), DELETE (remove)\n3. **Status Codes:** Return correct codes (200 OK, 201 Created, 400 Bad Request)\n4. **Versioning:** Use \`/api/v1/...\`\n5. **Pagination:** Limit results for large lists\n\n💡 **Try:** Ask about <span class="clickable-suggestion">status codes</span> or <span class="clickable-suggestion">JWT</span>!`
    ],

    jwt: [
      `**JWT (JSON Web Tokens):**\n\nStateless auth token with 3 parts:\n1. **Header:** Algo & type\n2. **Payload:** User data (claims)\n3. **Signature:** Verifies integrity\n\n**Flow:** User logins → Server signs JWT → Client sends JWT in \`Authorization: Bearer <token>\` header for requests.\n\n💡 **Try:** The \`POST /api/auth/login\` endpoint returns a mock JWT!`
    ],

    statusCodes: [
      `**Common HTTP Status Codes:**\n\n✅ **200 OK:** Success\n✅ **201 Created:** Resource created (POST)\n⛔ **400 Bad Request:** Invalid input\n⛔ **401 Unauthorized:** Missing/invalid token\n⛔ **403 Forbidden:** Valid token but no permission\n⛔ **404 Not Found:** Resource doesn't exist\n🔥 **500 Server Error:** It's not you, it's me\n\n💡 **Try:** Trigger a 404 by using an invalid ID!`
    ],

    nationality: [
      `Clifford is **Ghanaian** 🇬🇭 — from Ghana, West Africa!\n\nBased in Accra, representing Ghanaian tech talent on the global stage.\n\n💡 **Connect:**\n• Get <span class="clickable-suggestion">contact info</span>\n• View <span class="clickable-suggestion">social media</span>`
    ],

    phone: [
      `Reach Cliff at:\n\n📱 **${knowledgeBase.phone}**\n💬 WhatsApp: **${knowledgeBase.whatsapp}**\n\n💡 **Other options:**\n• 📧 <span class="clickable-suggestion">Email</span>\n• 💼 <span class="clickable-suggestion">LinkedIn</span>\n• 📝 <a href="contact.html">Contact Form</a>`
    ],

    email: [
      `Email Cliff at:\n\n📧 **${knowledgeBase.email}**\n\nOr use the <a href="contact.html">Contact Form</a>!\n\n💡 **Response time:** ${knowledgeBase.responseTime}\n\n💡 **Before emailing:**\n• Check <span class="clickable-suggestion">services</span>\n• View <span class="clickable-suggestion">projects</span>\n• Ask about <span class="clickable-suggestion">pricing</span>`
    ],

    services: [
      `Cliff offers **backend engineering services**:\n\n⚙️ **Backend Architecture** — APIs, microservices, system design\n🔒 **DevSecOps & CI/CD** — Pipelines, security, automation\n💳 **Fintech Solutions** — Payment APIs, transaction systems\n☁️ **Cloud Infrastructure** — AWS, Docker, Kubernetes\n🗄️ **Database Design** — PostgreSQL, Redis, optimization\n🔐 **API Security** — JWT, OAuth2, RBAC implementation\n\n💡 **Next steps:**\n• View <span class="clickable-suggestion">projects</span>\n• Check <span class="clickable-suggestion">pricing</span>\n• <span class="clickable-suggestion">Hire him</span>`
    ],

    skills: [
      `Cliff's technical stack:\n\n💻 **Languages:** ${knowledgeBase.skills.languages.join(', ')}\n\n🔧 **Backend:** ${knowledgeBase.skills.backend.join(', ')}\n\n🐳 **DevOps:** ${knowledgeBase.skills.devops.join(', ')}\n\n🗄️ **Databases:** ${knowledgeBase.skills.databases.join(', ')}\n\n🔒 **Security:** ${knowledgeBase.skills.security.join(', ')}\n\n💡 **See skills in action:**\n• View <span class="clickable-suggestion">projects</span>\n• Check <a href="skills.html">Skills Page</a>`
    ],

    python: [
      `**Python** is Cliff's primary language (90% proficiency):\n\n🐍 **Frameworks:** FastAPI, Django, Flask\n📦 **Libraries:** SQLAlchemy, Pydantic, Celery, pytest\n🤖 **AI/ML:** LangChain, Groq integration\n\n💡 **Python projects:**\n• <span class="clickable-suggestion">Post-Bot</span> — AI content automation\n• <span class="clickable-suggestion">EventFlow</span> — Event-driven pipeline\n\n💡 Ask about <span class="clickable-suggestion">other skills</span>`
    ],

    devops: [
      `Cliff's **DevOps & Cloud** toolkit:\n\n🐳 **Containers:** Docker, Kubernetes, Helm\n☁️ **Cloud:** AWS (EC2, ECS, Lambda, S3)\n🏗️ **IaC:** Terraform, CloudFormation\n🔄 **CI/CD:** GitHub Actions, GitLab CI\n📊 **Monitoring:** Prometheus, Grafana\n\n💡 **DevOps projects:**\n• <span class="clickable-suggestion">EventFlow</span> — Observability stack\n• View <a href="portfolio.html">all projects</a>`
    ],

    security: [
      `**Security** is built into everything Cliff creates:\n\n🔐 **Auth:** JWT, OAuth2, RBAC, session management\n🛡️ **API Security:** Rate limiting, input validation, OWASP\n📝 **Audit:** Logging, access tracking, compliance\n🔒 **DevSecOps:** Security scanning in CI/CD\n\n💡 **Security project:**\n• <span class="clickable-suggestion">AuthForge</span> — Enterprise auth microservice`
    ],

    cloud: [
      `Cliff's **cloud experience** (AWS-focused):\n\n☁️ **Compute:** EC2, ECS, Lambda, Fargate\n🗄️ **Storage:** S3, RDS, DynamoDB\n🌐 **Networking:** VPC, CloudFront, Route53\n🔧 **IaC:** Terraform, CloudFormation\n📦 **Containers:** EKS, ECR\n\n💡 **Related:**\n• <span class="clickable-suggestion">DevOps skills</span>\n• View <span class="clickable-suggestion">projects</span>`
    ],

    contact: [
      `Reach Clifford:\n\n📧 **Email:** ${knowledgeBase.email}\n📱 **Phone:** ${knowledgeBase.phone}\n💬 **WhatsApp:** ${knowledgeBase.whatsapp}\n📍 **Location:** ${knowledgeBase.location}\n⏰ **Timezone:** ${knowledgeBase.timezone}\n\nOr use the <a href="contact.html">Contact Page</a>!\n\n💡 **Before reaching out:**\n• View <span class="clickable-suggestion">projects</span>\n• Check <span class="clickable-suggestion">services</span>`
    ],

    social: [
      `Connect with Cliff:\n\n🐙 <a href="https://${knowledgeBase.social.github}" target="_blank">GitHub</a> — Code & projects\n💼 <a href="https://${knowledgeBase.social.linkedin}" target="_blank">LinkedIn</a> — Professional network\n📸 <a href="https://${knowledgeBase.social.instagram}" target="_blank">Instagram</a> — Creative work\n🐦 <a href="https://${knowledgeBase.social.twitter}" target="_blank">Twitter/X</a> — Tech thoughts\n\n💡 **Also:**\n• <span class="clickable-suggestion">Contact info</span>\n• <span class="clickable-suggestion">Hire him</span>`
    ],

    projects: [
      `Cliff's featured projects:\n\n🤖 **<span class="clickable-suggestion">Post-Bot</span>** — LinkedIn AI automation\n🔐 **<span class="clickable-suggestion">AuthForge</span>** — Auth microservice\n📡 **<span class="clickable-suggestion">EventFlow</span>** — Event-driven pipeline\n\nSee all projects on the <a href="portfolio.html">Projects Page</a>!\n\n💡 **Want details?** Click any project name above!`
    ],

    postbot: [
      `**LinkedIn Content Automation Bot** 🤖\n\n${knowledgeBase.projects.postbot.description}\n\n**Tech Stack:**\n${knowledgeBase.projects.postbot.tech.join(' • ')}\n\n🔗 <a href="${knowledgeBase.projects.postbot.github}" target="_blank">View on GitHub</a>\n\n💡 **Other projects:**\n• <span class="clickable-suggestion">AuthForge</span>\n• <span class="clickable-suggestion">EventFlow</span>`
    ],

    authforge: [
      `**AuthForge** 🔐\n\n${knowledgeBase.projects.authforge.description}\n\n**Tech Stack:**\n${knowledgeBase.projects.authforge.tech.join(' • ')}\n\n🔗 <a href="${knowledgeBase.projects.authforge.github}" target="_blank">View on GitHub</a>\n\n💡 **Other projects:**\n• <span class="clickable-suggestion">Post-Bot</span>\n• <span class="clickable-suggestion">EventFlow</span>`
    ],

    eventflow: [
      `**EventFlow** 📡\n\n${knowledgeBase.projects.eventflow.description}\n\n**Tech Stack:**\n${knowledgeBase.projects.eventflow.tech.join(' • ')}\n\n🔗 <a href="${knowledgeBase.projects.eventflow.github}" target="_blank">View on GitHub</a>\n\n💡 **Other projects:**\n• <span class="clickable-suggestion">Post-Bot</span>\n• <span class="clickable-suggestion">AuthForge</span>`
    ],

    hire: [
      `Great! Here's how to work with Cliff:\n\n1. 📝 **Describe your project** on the <a href="contact.html">Contact Page</a>\n2. 📧 Or email: ${knowledgeBase.email}\n3. 📱 Call/WhatsApp: ${knowledgeBase.phone}\n\n⏰ **Response time:** ${knowledgeBase.responseTime}\n✅ **Status:** ${knowledgeBase.availability}\n\n💡 **Before hiring:**\n• View <span class="clickable-suggestion">projects</span>\n• Check <span class="clickable-suggestion">pricing</span>\n• Learn about <span class="clickable-suggestion">services</span>`
    ],

    availability: [
      `✅ **Status:** ${knowledgeBase.availability}\n\n📍 Based in ${knowledgeBase.location} (${knowledgeBase.timezone})\n🌍 Available for **remote work globally**\n⏰ Response time: ${knowledgeBase.responseTime}\n\n💡 **Ready to start?**\n• <span class="clickable-suggestion">Hire him</span>\n• Check <span class="clickable-suggestion">pricing</span>\n• View <span class="clickable-suggestion">services</span>`
    ],

    pricing: [
      `💰 Pricing varies by **project scope and complexity**.\n\nFor an accurate quote, please share:\n• Project description\n• Timeline requirements\n• Estimated scope\n\n📝 Use the <a href="contact.html">Contact Form</a>\n📧 Or email: ${knowledgeBase.email}\n\n💡 **Helpful info:**\n• View <span class="clickable-suggestion">services</span>\n• Check <span class="clickable-suggestion">projects</span>`
    ],

    process: [
      `Cliff's **hiring process**:\n\n1️⃣ **Discovery** — Describe your project needs\n2️⃣ **Discussion** — Technical consultation call\n3️⃣ **Proposal** — Scope, timeline, pricing\n4️⃣ **Agreement** — Contract & kickoff\n5️⃣ **Development** — Iterative delivery\n\n💡 **Start now:**\n• <a href="contact.html">Contact Page</a>\n• Check <span class="clickable-suggestion">availability</span>`
    ],

    responseTime: [
      `⏰ **Response Time:** ${knowledgeBase.responseTime}\n\nCliff typically responds within 24-48 hours during weekdays.\n\n📧 Email: ${knowledgeBase.email}\n📱 WhatsApp: ${knowledgeBase.whatsapp} (faster)\n\n💡 **Also:**\n• Check <span class="clickable-suggestion">availability</span>\n• Ready to <span class="clickable-suggestion">hire</span>?`
    ],

    certifications: [
      `Cliff holds certifications in:\n\n📜 Software Engineering (ALX Africa)\n📜 Cloud & DevOps fundamentals\n📜 Python development\n\nView certificates on the <a href="about.html">About Page</a>!\n\n💡 **Related:**\n• His <span class="clickable-suggestion">education</span>\n• His <span class="clickable-suggestion">skills</span>`
    ],

    thanks: [
      `You're welcome! 😊 Anything else about Cliff's backend engineering work?\n\n💡 **Popular topics:**\n• <span class="clickable-suggestion">Projects</span>\n• <span class="clickable-suggestion">Services</span>\n• <span class="clickable-suggestion">Hire him</span>`
    ],

    fallback: [
      `I'm not quite sure about that, but I can help with:\n\n• Cliff's **<span class="clickable-suggestion">services</span>** & **<span class="clickable-suggestion">skills</span>**\n• His **<span class="clickable-suggestion">projects</span>** (Post-Bot, AuthForge, EventFlow)\n• **<span class="clickable-suggestion">Contact info</span>** & **<span class="clickable-suggestion">hiring</span>**\n• **<span class="clickable-suggestion">Availability</span>** & **<span class="clickable-suggestion">pricing</span>**\n\nWhat would you like to know?`
    ],

    help: [
      `Here's what I can help with:\n\n🔹 **<span class="clickable-suggestion">services</span>** — Backend, DevSecOps, Fintech\n🔹 **<span class="clickable-suggestion">skills</span>** — Python, Docker, AWS, etc.\n🔹 **<span class="clickable-suggestion">projects</span>** — Post-Bot, AuthForge, EventFlow\n🔹 **<span class="clickable-suggestion">contact info</span>** — Phone, email, location\n🔹 **<span class="clickable-suggestion">hire</span>** — Work with Cliff\n🔹 **<span class="clickable-suggestion">pricing</span>** — Rates & quotes\n🔹 **<span class="clickable-suggestion">availability</span>** — Current status\n🔹 **<span class="clickable-suggestion">about</span>** — Designer → Engineer journey\n\nJust click any suggestion or type your question!`
    ]
  };

  // Intent detection - comprehensive pattern matching
  function detectIntent(message) {
    const msg = message.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|howdy|greetings|yo|sup|good\s*(morning|afternoon|evening)|hola|bonjour)/.test(msg)) {
      return 'greeting';
    }

    // Help
    if (/^(help|menu|options|commands|\?|what can you (do|help))/.test(msg)) {
      return 'help';
    }

    // Thanks
    if (/(thank|thanks|thx|appreciate|cheers|grateful|awesome|great|perfect|nice)/.test(msg) && msg.length < 30) {
      return 'thanks';
    }

    // Project-specific (NEW)
    if (/(post-?bot|linkedin.*bot|content.*automation|ai.*automation)/.test(msg)) {
      return 'postbot';
    }
    if (/(authforge|auth.*forge|authentication.*service|auth.*microservice)/.test(msg)) {
      return 'authforge';
    }
    if (/(eventflow|event.*flow|event.*driven|redis.*stream)/.test(msg)) {
      return 'eventflow';
    }

    // PLAYGROUND SPECIFIC INTENTS
    // Endpoints
    if (/(endpoint|url|route|path|available.*api|what.*can.*test)/.test(msg)) {
      return 'endpoints';
    }

    // REST Best Practices
    if (/(rest.*api|restful|best.*practic|naming.*convention|http.*method)/.test(msg)) {
      return 'rest';
    }

    // JWT/Auth
    if (/(jwt|json.*web.*token|token|auth|bearer|header)/.test(msg) && !/(security|secure)/.test(msg)) {
      return 'jwt';
    }

    // Status Codes
    if (/(status.*code|200|201|400|404|500|error.*code|http.*code)/.test(msg)) {
      return 'statusCodes';
    }

    // Journey/Story
    if (/(journey|story|transition|designer.*engineer|how.*start|background|career.*path)/.test(msg)) {
      return 'journey';
    }

    // Certifications
    if (/(certif|badge|credential|award|achievement)/.test(msg)) {
      return 'certifications';
    }

    // Availability
    if (/(availab|free|open.*to|looking.*work|status|bandwidth|capacity)/.test(msg)) {
      return 'availability';
    }

    // Response time
    if (/(response.*time|how.*fast|how.*long|when.*respond|reply.*time)/.test(msg)) {
      return 'responseTime';
    }

    // Process
    if (/(process|how.*work.*with|workflow|method|approach|how.*hire)/.test(msg)) {
      return 'process';
    }

    // Python
    if (/(python|django|fastapi|flask)/.test(msg) && !/(all|every|list)/.test(msg)) {
      return 'python';
    }

    // DevOps
    if (/(devops|devSecops|docker|kubernetes|k8s|terraform|ci\/cd|pipeline|container)/.test(msg)) {
      return 'devops';
    }

    // Security
    if (/(security|secure|jwt|oauth|rbac|authentication|owasp|protect)/.test(msg)) {
      return 'security';
    }

    // Cloud
    if (/(cloud|aws|azure|gcp|lambda|ec2|s3|serverless)/.test(msg)) {
      return 'cloud';
    }

    // Phone/WhatsApp
    if (/(phone|number|call|whatsapp|mobile|telephone|gimme.*number|give.*number|get.*number|his.*number|your.*number)/.test(msg)) {
      return 'phone';
    }

    // Email
    if (/(email|mail|e-mail|send.*email|his.*email|your.*email|email.*address|gimme.*email|give.*email)/.test(msg) && !/(social|media)/.test(msg)) {
      return 'email';
    }

    // Location
    if (/(where.*(from|come|based|live|located|stay)|which\s*(country|city|place)|what\s*country|what\s*city)/.test(msg)) {
      return 'location';
    }

    // Nationality
    if (/(nationality|national|ghanaian|african|ethnicity)/.test(msg)) {
      return 'nationality';
    }

    // What does he do
    if (/(what.*(do(es)?|work|speciali[sz]e)|what\s*is\s*(his|your|cliff).*(job|work|profession|role|field|expertise)|tell.*about.*(work|job))/.test(msg)) {
      return 'whatHeDoes';
    }

    // Education
    if (/(education|study|studied|school|university|college|degree|qualification|alx|where.*learn|academic|graduated)/.test(msg)) {
      return 'education';
    }

    // Experience
    if (/(experience|work.*experience|previous\s*work|worked|where.*(work|employ)|background|career|years|companies|resume|cv|employment|job\s*history)/.test(msg) && !/portfolio.*page|view.*portfolio|show.*portfolio|work\s*with\s*(you|him|cliff)/.test(msg)) {
      return 'experience';
    }

    // About
    if (/(who\s*(is|are)|about|tell\s*me\s*about|tell.*more|bio|introduce|info.*about|learn.*about)/.test(msg) &&
      /(cliff|you|him|himself|yourself)/.test(msg)) {
      return 'about';
    }
    if (/^about$/i.test(msg)) return 'about';

    // Services
    if (/(service|offer|provide|can\s*(you|he)\s*help|what\s*can\s*(he|you)|do\s*you\s*(do|offer))/.test(msg)) {
      return 'services';
    }
    if (/^services?$/i.test(msg)) return 'services';

    // Skills
    if (/(skill|tech|stack|proficien|expert|know|language|framework|tool|capabilit|technolog|programming)/.test(msg)) {
      return 'skills';
    }
    if (/^skills?$/i.test(msg)) return 'skills';

    // Projects/Portfolio
    if (/(project|portfolio|work\s*(sample|example)|example|sample|showcase|case\s*study|previous\s*work|see\s*your\s*work|show.*work|view.*work)/.test(msg)) {
      return 'projects';
    }

    // Contact (general)
    if (/(contact|reach|get\s*in\s*touch|talk\s*to|speak\s*with|communicate|how\s*(can|do)\s*i\s*(reach|contact))/.test(msg)) {
      return 'contact';
    }

    // Hire
    if (/(hire|employ|freelance|commission|work\s*with|collaborate|engage|book|need\s*(you|him))/.test(msg)) {
      return 'hire';
    }

    // Pricing
    if (/(price|pricing|cost|rate|charge|fee|quote|budget|how\s*much|afford|expensive|cheap|payment)/.test(msg)) {
      return 'pricing';
    }

    // Social
    if (/(social|linkedin|github|twitter|instagram|facebook|youtube|follow|social\s*media|find\s*(him|you)\s*on)/.test(msg)) {
      return 'social';
    }

    // Specific tech mentions without detailed questions
    if (/(web\s*(dev|design|site)|website|frontend|backend|html|css|javascript|react|node|api|rest|graphql)/.test(msg)) {
      return 'services';
    }

    return 'fallback';
  }

  // Get response (handle functions vs arrays)
  function getResponse(intent) {
    const response = responses[intent] || responses.fallback;
    if (typeof response === 'function') {
      return response();
    }
    return response[Math.floor(Math.random() * response.length)];
  }

  // Format message with markdown-like syntax
  function formatMessage(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // Chat state
  let isOpen = false;
  let isFirstOpen = true;

  // Page-specific popup messages (the bubble that appears on page load)
  const pagePopupMessages = {
    home: { emoji: '👋', title: 'Hi there!', text: 'Ask me about backend engineering services!' },
    about: { emoji: '📖', title: 'Curious?', text: 'Ask about my Designer → Engineer journey!' },
    skills: { emoji: '💻', title: 'Tech questions?', text: 'Ask about any skill in the stack!' },
    portfolio: { emoji: '🔍', title: 'Project details?', text: 'Ask about Post-Bot, AuthForge, or any project!' },
    contact: { emoji: '📬', title: 'Ready to connect?', text: 'Ask about availability, pricing, or process!' },
    playground: { emoji: '🎮', title: 'API Assistant!', text: 'Ask about REST, JWT, status codes, or test endpoints!' }
  };

  // Create chat widget HTML with page-specific quick replies
  function createChatWidget() {
    const quickReplies = pageQuickReplies[currentPage];
    const quickRepliesHTML = quickReplies.map(q =>
      `<button class="quick-reply" data-message="${q.message}">${q.label}</button>`
    ).join('');

    const popup = pagePopupMessages[currentPage];

    const chatHTML = `
      <div class="chatbot-container" id="chatbot">
        <div class="chatbot-welcome-popup" id="chatbot-welcome">
          <div class="welcome-content">
            <span class="welcome-emoji">${popup.emoji}</span>
            <div class="welcome-text">
              <strong>${popup.title}</strong>
              <p>${popup.text}</p>
            </div>
          </div>
          <button class="welcome-close" aria-label="Close welcome message">×</button>
        </div>
        <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open chat assistant">
          <i class='bx bx-bot chatbot-icon-open'></i>
          <i class='bx bx-x chatbot-icon-close'></i>
        </button>
        
        <div class="chatbot-window" id="chatbot-window">
          <div class="chatbot-header">
            <div class="chatbot-header-info">
              <div class="chatbot-avatar">
                <img src="assets/logo.webp" alt="Cliff-De-Tech" width="40" height="40">
                <span class="chatbot-status"></span>
              </div>
              <div class="chatbot-header-text">
                <h4>Cliff's AI Assistant</h4>
                <span>Backend Engineering • DevSecOps</span>
              </div>
            </div>
            <div class="chatbot-header-actions">
              <button class="chatbot-action-btn" id="chatbot-new" aria-label="New chat" title="New Chat">
                <i class='bx bx-plus'></i>
              </button>
              <button class="chatbot-action-btn" id="chatbot-clear" aria-label="Clear chat" title="Clear Chat">
                <i class='bx bx-trash'></i>
              </button>
              <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">
                <i class='bx bx-x'></i>
              </button>
            </div>
          </div>
          
          <div class="chatbot-messages" id="chatbot-messages">
            <!-- Messages will be inserted here -->
          </div>
          
          <div class="chatbot-quick-replies" id="chatbot-quick">
            ${quickRepliesHTML}
          </div>
          
          <form class="chatbot-input" id="chatbot-form">
            <input type="text" id="chatbot-input-field" placeholder="Ask about services, projects, or hiring..." autocomplete="off">
            <button type="submit" aria-label="Send message">
              <i class='bx bx-send'></i>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  // Add message to chat
  function addMessage(content, isUser = false, skipAnimation = false) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}${skipAnimation ? '' : ' animate'}`;

    if (!isUser) {
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <img src="assets/logo.webp" alt="Bot" width="28" height="28">
        </div>
        <div class="message-content">${formatMessage(content)}</div>
      `;
} else {
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = content;
  messageDiv.appendChild(contentDiv);
}

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Add click listeners to suggestions
    if (!isUser) {
      setTimeout(() => {
        messageDiv.querySelectorAll('.clickable-suggestion').forEach(suggestion => {
          suggestion.style.cursor = 'pointer';
          suggestion.style.textDecoration = 'underline';
          suggestion.style.color = 'var(--accent)';
          suggestion.addEventListener('click', () => {
            handleMessage(suggestion.textContent);
          });
        });
      }, 100);
    }
  }

  // Show typing indicator
  function showTyping() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">
        <img src="assets/logo.webp" alt="Bot" width="28" height="28">
      </div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Remove typing indicator
  function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }

  // Handle user message
  function handleMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, true);

    // Show typing indicator
    showTyping();

    // Simulate thinking delay
    const delay = 500 + Math.random() * 1000;
    setTimeout(() => {
      removeTyping();
      const intent = detectIntent(message);
      const response = getResponse(intent);
      addMessage(response);
    }, delay);
  }

  // Toggle chat window
  function toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    const welcomePopup = document.getElementById('chatbot-welcome');

    isOpen = !isOpen;
    chatWindow.classList.toggle('open', isOpen);
    toggleBtn.classList.toggle('active', isOpen);

    if (isOpen) {
      if (welcomePopup) {
        welcomePopup.style.display = 'none';
      }
      document.getElementById('chatbot-input-field').focus();

      // Send page-specific welcome message on first open
      if (isFirstOpen) {
        isFirstOpen = false;
        setTimeout(() => {
          addMessage(getResponse('greeting'));
        }, 300);
      }
    }
  }

  // Clear chat messages
  function clearChat() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML = '';

    // Show confirmation message
    setTimeout(() => {
      addMessage('Chat cleared! 🧹 How can I help you today?', false, true);
    }, 200);
  }

  // Start new chat (clear and reset)
  function newChat() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML = '';

    // Send fresh page-specific greeting
    setTimeout(() => {
      addMessage(getResponse('greeting'), false, true);
    }, 200);
  }

  // Initialize chatbot
  function init() {
    createChatWidget();

    // Toggle button
    document.getElementById('chatbot-toggle').addEventListener('click', toggleChat);

    // Close button
    document.getElementById('chatbot-close').addEventListener('click', toggleChat);

    // New chat button
    document.getElementById('chatbot-new').addEventListener('click', () => {
      newChat();
    });

    // Clear chat button
    document.getElementById('chatbot-clear').addEventListener('click', () => {
      if (confirm('Clear all messages? This cannot be undone.')) {
        clearChat();
      }
    });

    // Form submit
    document.getElementById('chatbot-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chatbot-input-field');
      handleMessage(input.value);
      input.value = '';
    });

    // Quick replies
    document.querySelectorAll('.quick-reply').forEach(btn => {
      btn.addEventListener('click', () => {
        handleMessage(btn.dataset.message);
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat();
      }
    });

    // Welcome popup handling
    const welcomePopup = document.getElementById('chatbot-welcome');
    const welcomeClose = welcomePopup ? welcomePopup.querySelector('.welcome-close') : null;

    // Show welcome popup after delay
    setTimeout(() => {
      if (welcomePopup && !isOpen) {
        welcomePopup.classList.add('show');
      }
    }, 3000);

    // Close welcome popup
    if (welcomeClose) {
      welcomeClose.addEventListener('click', (e) => {
        e.stopPropagation();
        welcomePopup.classList.remove('show');
      });
    }

    // Click welcome popup to open chat
    if (welcomePopup) {
      welcomePopup.addEventListener('click', () => {
        if (!isOpen) {
          toggleChat();
        }
      });
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
