export type ProjectStatus = "ACTIVE" | "SHIPPED";
export type ProjectTint = "amber" | "blue" | "fg";

export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectDetails = {
  overview: string;
  features: readonly string[];
  stackNote?: string;
  links?: readonly ProjectLink[];
};

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
  details: ProjectDetails;
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
    details: {
      overview:
        "A Twilio-based voice sales agent that runs outbound cold calls end to end. The LLM drives the conversation, handles objections, qualifies leads against a custom rubric, and routes hot prospects to human closers. Built for sales-ops teams that need outreach capacity without scaling headcount.",
      features: [
        "Real-time ASR + TTS pipeline on Twilio, tuned for sub-500 ms round-trip latency.",
        "LLM-driven conversation state machine covering opening, discovery, objection handling, and close.",
        "Per-call token-budget enforcement so unit economics stay predictable at scale.",
        "CRM integration that writes qualified leads straight into the sales pipeline.",
      ],
      stackNote:
        "Python + FastAPI backend on AWS. OpenAI for LLM reasoning, Whisper for ASR, Twilio Voice for call orchestration, Postgres for call logs.",
    },
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
    details: {
      overview:
        "A sentiment-aware chatbot companion. Tracks the user's emotional context across sessions and adjusts response tone accordingly. Memory persists for 30 days per user so conversations feel continuous instead of one-shot.",
      features: [
        "pgvector-backed long-term memory with a 30-day retention window per user.",
        "LangChain agent orchestrates a sentiment classifier before generating replies.",
        "Django REST API for session management and admin tooling.",
        "Deployed on AWS with an auto-scaling worker pool for async inference.",
      ],
      stackNote:
        "Python + Django + LangChain + PostgreSQL (pgvector) + AWS.",
    },
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
    details: {
      overview:
        "A zero-knowledge password vault. The Spring Boot REST API never sees plaintext — encryption happens client-side before anything hits the wire, and the server stores ciphertext only.",
      features: [
        "AES-256 encryption runs entirely client-side; the server only handles ciphertext.",
        "JWT-based session auth with short-lived tokens and refresh rotation.",
        "Spring Security middleware for rate limiting and brute-force protection.",
        "RDS persistence with automated daily snapshots.",
      ],
      stackNote: "Java + Spring Boot + Spring Security + AWS RDS + JWT.",
    },
  },
] as const;
