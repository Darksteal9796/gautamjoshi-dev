export type Experience = {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  location: string;
  bullets: readonly string[];
  stack: readonly string[];
};

export const experiences: readonly Experience[] = [
  {
    id: "turing",
    company: "Turing",
    role: "Senior AI Full-Stack Engineer",
    dateRange: "Nov 2024 — Present",
    location: "Remote · Pune, India",
    bullets: [
      "Lead LLM fine-tuning and evaluation workflows on the internal training platform.",
      "Own the Python backend for RLHF pipelines and SFT dataset curation.",
      "Ship production APIs for model training, evaluation, and deployment.",
      "Platform serves 5,000+ users across Turing's engineering org.",
    ],
    stack: ["Python", "FastAPI", "LangChain", "PostgreSQL", "AWS", "RLHF"],
  },
  {
    id: "newspace",
    company: "Newspace",
    role: "Software Engineer — Autonomous Systems",
    dateRange: "2024",
    location: "India",
    bullets: [
      "Shipped drone swarming algorithms in C# — formation flight and collision avoidance.",
      "Tuned multi-agent simulation for swarm behavior validation.",
    ],
    stack: ["C#", ".NET", "Linux"],
  },
  {
    id: "tcs-vanguard",
    company: "TCS — Vanguard + Credit Suisse",
    role: "Senior SME — Trade Settlement Platforms",
    dateRange: "2021 — 2024",
    location: "Pune, India",
    bullets: [
      "Embedded as SME on Vanguard + Credit Suisse trade-settlement pipelines.",
      "Six-engineer team, two-and-a-half years on AWS-based settlement flows.",
      "Owned Kinesis + Lambda stream processing for trade events.",
      "Built Java + Spring microservices for reconciliation and exception handling.",
    ],
    stack: ["Java", "Spring Boot", "AWS", "Kinesis", "Lambda", "Oracle"],
  },
] as const;
