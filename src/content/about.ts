export type LeadSegment =
  | { kind: "text"; value: string }
  | { kind: "amber"; value: string }
  | { kind: "blue"; value: string };

export const aboutLead: readonly LeadSegment[] = [
  {
    kind: "text",
    value: "Senior AI Full-Stack Engineer, four years in. I ship ",
  },
  { kind: "amber", value: "Python backends" },
  { kind: "text", value: " and " },
  { kind: "blue", value: "production AI" },
  {
    kind: "text",
    value:
      " — LLM fine-tunes, RAG pipelines, voice agents. Before Turing, TCS embedded me as SME for ",
  },
  { kind: "amber", value: "Vanguard" },
  { kind: "text", value: " and " },
  { kind: "amber", value: "Credit Suisse" },
  {
    kind: "text",
    value:
      ": six-engineer team, two-and-a-half years on AWS trade-settlement pipelines. Now Senior at Turing's LLM training platform, serving 5,000+ users.",
  },
];

export const aboutChips: readonly string[] = [
  "Based in Pune, India (IST)",
  "MS CS @ Woolf (ongoing)",
  "4 languages spoken",
  "2.5y finance-domain SME",
  "Open to senior roles",
];
