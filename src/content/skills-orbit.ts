export type OrbitSkill = {
  label: string;
  category: string;
  years: number;
  description: string;
  ring: 1 | 2 | 3;
};

export const orbitSkills: readonly OrbitSkill[] = [
  {
    label: "Python",
    category: "Language",
    years: 4,
    description: "Primary language across the Turing LLM platform and consulting work.",
    ring: 1,
  },
  {
    label: "LLM",
    category: "AI",
    years: 3,
    description: "Fine-tuning and evaluating models on the Turing training platform.",
    ring: 1,
  },
  {
    label: "RAG",
    category: "AI",
    years: 2,
    description: "Retrieval pipelines behind AI Best Buddy and client tools.",
    ring: 1,
  },
  {
    label: "LangChain",
    category: "AI Framework",
    years: 2,
    description: "Agent orchestration in AI Best Buddy and prototype builds.",
    ring: 1,
  },
  {
    label: "RLHF",
    category: "AI",
    years: 2,
    description: "Reward modeling and preference collection at Turing.",
    ring: 1,
  },

  {
    label: "AWS",
    category: "Cloud",
    years: 3,
    description: "Lambda, RDS, S3 pipelines from Vanguard settlement to Turing infra.",
    ring: 2,
  },
  {
    label: "Django",
    category: "Backend",
    years: 3,
    description: "API surface for AI Best Buddy and consulting services.",
    ring: 2,
  },
  {
    label: "FastAPI",
    category: "Backend",
    years: 3,
    description: "Async inference endpoints and ML service glue at Turing.",
    ring: 2,
  },
  {
    label: "Java",
    category: "Language",
    years: 3,
    description: "Spring microservices at Vanguard and Credit Suisse trade pipelines.",
    ring: 2,
  },
  {
    label: "Spring",
    category: "Backend",
    years: 2,
    description: "Auth and batch jobs across TCS-Vanguard trade settlement services.",
    ring: 2,
  },
  {
    label: "PostgreSQL",
    category: "Data",
    years: 4,
    description: "Primary datastore across every production service I've shipped.",
    ring: 2,
  },

  {
    label: "C#",
    category: "Language",
    years: 1,
    description: "Drone swarming algorithms at Newspace.",
    ring: 3,
  },
  {
    label: "Kinesis",
    category: "Data",
    years: 2,
    description: "Real-time trade event streams at TCS-Vanguard.",
    ring: 3,
  },
  {
    label: "Lambda",
    category: "Cloud",
    years: 2,
    description: "Event-driven compute in trade settlement and ML serving.",
    ring: 3,
  },
  {
    label: "GCP",
    category: "Cloud",
    years: 1,
    description: "Vertex AI experiments and BigQuery analytics.",
    ring: 3,
  },
  {
    label: "Ruby",
    category: "Language",
    years: 1,
    description: "Rails backends for consulting engagements.",
    ring: 3,
  },
  {
    label: "Rails",
    category: "Backend",
    years: 1,
    description: "Internal tool delivery for fintech clients.",
    ring: 3,
  },
  {
    label: "Linux",
    category: "Infra",
    years: 4,
    description: "Daily driver for development and production ops.",
    ring: 3,
  },
] as const;
