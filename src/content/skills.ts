export type SkillCategory = {
  name: string;
  items: readonly string[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    name: "Languages",
    items: ["Python", "Java", "JavaScript", "Ruby", "SQL", "PLSQL"],
  },
  {
    name: "AI / ML",
    items: ["LLM", "RAG", "RLHF", "SFT", "LangChain", "Prompt Engineering"],
  },
  {
    name: "Backend",
    items: ["FastAPI", "Django", "Spring Boot", "Rails", "Microservices"],
  },
  {
    name: "Cloud / Infra",
    items: ["AWS", "GCP", "Azure", "Linux", "Git"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "Kinesis", "Lambda", "System Design"],
  },
] as const;
