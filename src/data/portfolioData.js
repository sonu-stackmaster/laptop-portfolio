export const portfolioData = {
  personalInfo: {
    name: "Sonu Kumar Kapar",
    title: "Senior Full Stack & AI Developer",
    experienceYears: "4+",
    location: "Gurugram, India",
    email: "sonkum8640@gmail.com",
    phone: "+91-9899237236",
    github: "https://github.com/sonu-stackmaster",
    leetcode: "https://leetcode.com/sk0611",
    summary: "Senior Full Stack Developer with 4+ years of experience designing and delivering scalable cloud-native and AI-powered applications. Proven track record of building production systems end-to-end, optimizing performance & infrastructure costs, and deploying LLM-based solutions at scale.",
    stats: [
      { label: "Projects Delivered", value: "20+" },
      { label: "Daily Active Users", value: "50,000+" },
      { label: "Cost Reduction", value: "25%" },
      { label: "Response Latency", value: "<200ms" }
    ]
  },
  skills: {
    "Frontend": [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "JavaScript (ES6+)", level: 98 },
      { name: "Tailwind CSS", level: 95 }
    ],
    "Backend": [
      { name: "Node.js", level: 95 },
      { name: "Express.js / NestJS", level: 90 },
      { name: "Django / FastAPI", level: 88 },
      { name: "GraphQL", level: 85 }
    ],
    "Databases & Cache": [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 92 },
      { name: "Redis", level: 90 },
      { name: "Elasticsearch", level: 82 },
      { name: "Prisma / Drizzle", level: 88 }
    ],
    "AI / ML & Agents": [
      { name: "OpenAI & Anthropic", level: 94 },
      { name: "LangChain & LangGraph", level: 90 },
      { name: "Pinecone / Weaviate", level: 86 },
      { name: "Hugging Face", level: 84 },
      { name: "MCP Servers", level: 88 }
    ],
    "Cloud & DevOps": [
      { name: "AWS (Lambda, S3, EC2, SQS)", level: 90 },
      { name: "Docker", level: 88 },
      { name: "Google Cloud (GCP)", level: 84 },
      { name: "CI/CD & Jenkins", level: 86 }
    ],
    "Automation & Realtime": [
      { name: "n8n / Make / Zapier", level: 92 },
      { name: "WebRTC & Socket.IO", level: 88 },
      { name: "Twilio", level: 85 }
    ]
  },
  experience: [
    {
      role: "Senior Consultant Development",
      company: "Oodles Technologies",
      location: "Gurugram, India",
      period: "Mar 2023 – Present",
      achievements: [
        "Led end-to-end architecture and delivery of scalable production systems serving 1M+ users with high reliability.",
        "Mentored junior engineers and drove technical decisions across backend, cloud infrastructure, and sprint execution.",
        "Built event-driven microservices using Node.js and AWS (Lambda, API Gateway, SQS), reducing infrastructure costs by 25%.",
        "Optimized system performance using Redis caching & query tuning, lowering API response time to <200ms and deployment time by 40%."
      ]
    },
    {
      role: "Programming Lab Instructor",
      company: "Indian Institute of Computer Education",
      location: "Delhi, India",
      period: "Feb 2021 – Feb 2022",
      achievements: [
        "Conducted hands-on lab sessions on programming fundamentals, data structures, and algorithms in C++, Java, and Python.",
        "Mentored 20–40 students per semester on code debugging, clean code practices, and real-world system design.",
        "Designed coding assignments and collaborated with faculty to align training with modern software industry standards."
      ]
    }
  ],
  projects: [
    {
      title: "Future AGI",
      url: "https://app.futureagi.com",
      description: "Scalable platform for interacting with AI-driven tools & insights. Engineered seamless REST/GraphQL integration serving AI content to 50,000+ daily users.",
      highlights: [
        "Streamlined content updates saving 20 hours/week",
        "Built reusable component libraries with Storybook",
        "Drove product launch & performance optimization"
      ],
      tags: ["Django", "React.js", "AWS", "LLMs", "Redis", "PostgreSQL", "HuggingFace"]
    },
    {
      title: "MicroGPT Ecosystem",
      url: "https://microgpt.io",
      description: "Multi-platform AI developer ecosystem across VS Code, JetBrains, Chrome Extensions, and Cloud Web IDE with real-time code summaries.",
      highlights: [
        "Built Crypto Telegram Bot for real-time blockchain insights",
        "Designed admin analytics dashboard for adoption tracking",
        "Deployed serverless backend on AWS Lambda & GCP"
      ],
      tags: ["Python", "TypeScript", "AWS Lambda", "GCP", "Telegram Bot API", "VS Code Ext"]
    },
    {
      title: "AI Automation & Video Systems",
      url: "#",
      description: "AI-powered customer support agents built with LangChain & OpenAI, alongside real-time video streaming infrastructure and low-code automated pipelines.",
      highlights: [
        "Automated customer query resolution",
        "Real-time video calling using WebRTC & Socket.IO",
        "Reduced manual effort by 50% using n8n & Zapier"
      ],
      tags: ["LangChain", "OpenAI", "WebRTC", "Socket.IO", "n8n", "Make"]
    }
  ],
  resumeFile: "/docs/Sonu-CV.pdf"
};
