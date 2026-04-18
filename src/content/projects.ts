export type ProjectStatus = "ACTIVE" | "SHIPPED";
export type ProjectTint = "amber" | "blue" | "fg";

export type Project = {
  slug: string;
  name: string;
  dateRange: string;
  tagline: string;
  bullets: readonly string[];
  stack: readonly string[];
  status: ProjectStatus;
  tint: ProjectTint;
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "autonomous-revenue-engine",
    name: "Autonomous Revenue Engine",
    dateRange: "2026 — present",
    tagline: "Twilio voice sales agent running live cold-call conversations.",
    bullets: [
      "LLM-driven conversation flow with live ASR and TTS.",
      "Real-time voice pipeline on Twilio + OpenAI APIs.",
      "Deployed on AWS with per-call latency budgets.",
    ],
    stack: ["Python", "FastAPI", "Twilio", "OpenAI", "AWS"],
    status: "ACTIVE",
    tint: "amber",
    featured: true,
  },
  {
    slug: "ai-best-buddy",
    name: "AI Best Buddy",
    dateRange: "2025 — present",
    tagline: "Sentiment-aware chatbot built with Django and LangChain.",
    bullets: [
      "Django backend with persistent user memory.",
      "LangChain orchestration for sentiment-tracked replies.",
      "Deployed production-ready on AWS.",
    ],
    stack: ["Python", "Django", "LangChain", "PostgreSQL", "AWS"],
    status: "ACTIVE",
    tint: "blue",
  },
  {
    slug: "password-manager",
    name: "Password Manager",
    dateRange: "2024",
    tagline: "Java Spring Boot password vault deployed on AWS.",
    bullets: [
      "Spring Boot REST API with session-based auth.",
      "AWS deployment with RDS-backed persistence.",
    ],
    stack: ["Java", "Spring Boot", "AWS", "RDS"],
    status: "SHIPPED",
    tint: "fg",
  },
] as const;
