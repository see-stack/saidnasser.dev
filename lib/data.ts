export const profile = {
  name: "Said Nasser",
  role: "Product Engineer (Full-Stack)",
  location: "Oslo, Norway",
  summary:
    "Product engineer building and deploying production software. Backend systems, server infrastructure, and full-stack web applications for day-to-day business operations.",
  email: "sdnssr001@gmail.com",
  github: "https://github.com/see-stack",
  linkedin: "https://linkedin.com/in/said-nasser",
};

export const projects = [
  {
    title: "Obsidian Agent Workflow",
    description: "Obsidian memory context setup",
    tech: ["Obsidian", "Claude Code", "TypeScript", "Python", "Gmail API"],
  },
  {
    title: "Pivot",
    description: "Fitness coaching app",
    tech: ["Swift", "React", "Next.js", "PostgreSQL"],
  },
  {
    title: "StackMCP",
    description: "MCP tooling",
    tech: ["TypeScript", "Node.js", "MCP"],
  },
];

export const experience = [
  {
    title: "System Developer",
    org: "ibreezglobal — POS system",
    date: "2025 – 2026",
    points: [
      "Maintain and extend a production Laravel POS system handling dine-in/takeaway order flow, kitchen display, and table management across restaurant stations.",
      "Manage server configuration, database administration, SSL renewal, firewall rules, and SSH hardening on production Ubuntu servers.",
      "Set up CI/CD pipelines via GitHub Actions for automated build and deploy.",
    ],
  },
];

export const education = [
  {
    degree: "B.Sc. Computer Engineering",
    school: "UiT The Arctic University of Norway",
    date: "2016 – 2021",
  },
  {
    degree: "Exchange Studies",
    school: "University of Washington",
    date: "2019 – 2020",
  },
];

export const skills = [
  { label: "Frontend", items: ["React", "Astro", "Tailwind CSS", "TypeScript"] },
  { label: "Backend", items: ["Laravel", "PHP", "Node.js", "REST APIs"] },
  { label: "Infrastructure", items: ["Docker", "Nginx", "Linux", "CI/CD"] },
  { label: "Databases", items: ["MySQL", "PostgreSQL"] },
  { label: "Tools", items: ["Git", "GitHub Actions", "Vite"] },
  { label: "Workflow", items: ["Deployments", "Monitoring", "SSL/TLS", "DNS"] },
];

export const topSkills = ["Laravel", "Docker", "React"];

export const toolGroups: {
  category: string;
  tools: { name: string; desc: string; url: string }[];
}[] = [
  {
    category: "Development",
    tools: [
      { name: "VS Code", desc: "IDE", url: "https://code.visualstudio.com/" },
      { name: "Claude Code", desc: "AI pair programmer", url: "https://claude.com/claude-code" },
      { name: "GitHub", desc: "Version control", url: "https://github.com/" },
    ],
  },
  {
    category: "Design",
    tools: [
      { name: "Figma", desc: "Design tool", url: "https://www.figma.com/" },
      { name: "Blender", desc: "3D modeling", url: "https://www.blender.org/" },
    ],
  },
  {
    category: "Productivity",
    tools: [
      { name: "Obsidian", desc: "Notes & knowledge", url: "https://obsidian.md/" },
      { name: "DaVinci Resolve", desc: "Video editing", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
      { name: "Firefox", desc: "Browser", url: "https://www.mozilla.org/firefox/" },
    ],
  },
];

export const contributions = [
  {
    org: "react.dev",
    description: "9 contributions — docs fixes: broken links, missing APIs, error-page references",
    url: "https://github.com/reactjs/react.dev/pulls?q=is%3Apr+author%3Asee-stack",
  },
  {
    org: "next.js",
    description: "1 framework source fix — default error page leaking styles onto the body",
    url: "https://github.com/vercel/next.js/pull/97406",
  },
];
