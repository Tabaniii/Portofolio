/**
 * Edit / hapus item di sini.
 * - slug: id Simple Icons (https://simpleicons.org) untuk logo
 * - color: hex tanpa # untuk warna brand saat hover
 * Kalau slug kosong, badge hanya menampilkan nama.
 */
export const STACK_CATEGORIES = [
  {
    id: "ai-workflow",
    number: "01",
    title: "AI, Integrations & Modern Workflow",
    description: "AI-assisted development that accelerates cycles without sacrificing craft.",
    caption:
      "Leveraging AI to accelerate development cycles, focusing on architecture, visual harmony, and efficient execution.",
    items: [
      // AI Coding Assistants
      { name: "Cursor AI", slug: "cursor", color: "FFFFFF" },
      { name: "GitHub Copilot", slug: "githubcopilot", color: "FFFFFF" },
      { name: "Windsurf", slug: "", color: "0EA5E9" },
      { name: "Claude Code", slug: "anthropic", color: "D4A27F" },
      // LLMs & APIs
      { name: "OpenAI API", slug: "openai", color: "FFFFFF" },
      { name: "ChatGPT", slug: "openai", color: "FFFFFF" },
      { name: "Gemini API", slug: "googlegemini", color: "8E75B2" },
      { name: "Anthropic (Claude)", slug: "anthropic", color: "D4A27F" },
      { name: "Ollama (Local AI)", slug: "ollama", color: "FFFFFF" },
      { name: "Groq", slug: "groq", color: "F55036" },
      { name: "DeepSeek", slug: "", color: "4D6BFE" },
      { name: "Perplexity", slug: "perplexity", color: "1FB8CD" },
      { name: "Grok (xAI)", slug: "x", color: "FFFFFF" },
      // AI Development Tools
      { name: "Vercel AI SDK", slug: "vercel", color: "FFFFFF" },
      { name: "Hugging Face", slug: "huggingface", color: "FFD21E" },
      { name: "OpenRouter", slug: "", color: "6366F1" },
      { name: "Lovable", slug: "", color: "EC4899" },
      // Prompt Engineering & Workflows
      { name: "Advanced Prompting", slug: "", color: "A1A1AA" },
      { name: "AI-Driven Refactoring", slug: "", color: "A1A1AA" },
      { name: "Code Generation", slug: "", color: "A1A1AA" },
      { name: "AI Pair Programming", slug: "", color: "A1A1AA" },
      { name: "Spec-Driven Development", slug: "", color: "A1A1AA" },
      { name: "AI Code Review", slug: "", color: "A1A1AA" },
      { name: "RAG Workflows", slug: "", color: "A1A1AA" },
      { name: "Agentic Workflows", slug: "", color: "A1A1AA" },
      // Automation & Integrations
      { name: "n8n", slug: "n8n", color: "EA4B71" },
    ],
  },
  {
    id: "frontend",
    number: "02",
    title: "Front-end & UI",
    description: "Interfaces, motion, and design systems that stay clear under pressure.",
    items: [
      { name: "HTML5", slug: "html5", color: "E34F26" },
      { name: "CSS3", slug: "css", color: "663399" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "React.js", slug: "react", color: "61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
      { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
      { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
      { name: "Sass/SCSS", slug: "sass", color: "CC6699" },
      { name: "GSAP", slug: "greensock", color: "88CE02" },
      { name: "Radix UI", slug: "radixui", color: "FFFFFF" },
      { name: "Shadcn UI", slug: "shadcnui", color: "FFFFFF" },
    ],
  },
  {
    id: "backend",
    number: "03",
    title: "Back-end & Frameworks",
    description: "APIs, domain logic, and systems that stay secure and maintainable.",
    items: [
      { name: "PHP", slug: "php", color: "777BB4" },
      { name: "Laravel", slug: "laravel", color: "FF2D20" },
      { name: "Filament", slug: "filament", color: "FDAE4B" },
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "NestJS", slug: "nestjs", color: "E0234E" },
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "FastAPI", slug: "fastapi", color: "009688" },
      { name: "C# (.NET)", slug: "dotnet", color: "512BD4" },
    ],
  },
  {
    id: "database",
    number: "04",
    title: "Database & ORM",
    description: "Data models, persistence, and query layers shaped for real workloads.",
    items: [
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "SQLite", slug: "sqlite", color: "003B57" },
      { name: "Redis", slug: "redis", color: "FF4438" },
      { name: "Supabase", slug: "supabase", color: "3FCF8E" },
    ],
  },
  {
    id: "infra",
    number: "05",
    title: "Infrastructure, Tools & Deployment",
    description: "Shipping, hosting, and the tooling that keeps releases predictable.",
    items: [
      { name: "Git", slug: "git", color: "F05032" },
      { name: "GitHub", slug: "github", color: "FFFFFF" },
      { name: "Nginx", slug: "nginx", color: "009639" },
      { name: "Apache", slug: "apache", color: "D22128" },
      { name: "Vercel", slug: "vercel", color: "FFFFFF" },
      { name: "AWS", slug: "amazonwebservices", color: "232F3E" },
      { name: "DigitalOcean", slug: "digitalocean", color: "0080FF" },
      { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
      { name: "CI/CD Pipelines", slug: "githubactions", color: "2088FF" },
    ],
  },
];
