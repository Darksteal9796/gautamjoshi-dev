export type NowColor = "amber" | "blue" | "green";

export type NowEntry = {
  text: string;
  date: string;
  color: NowColor;
};

export const nowEntries: readonly NowEntry[] = [
  {
    text: "Shipping the Autonomous Revenue Engine voice-agent MVP — live Twilio call routing with OpenAI.",
    date: "APR 18",
    color: "amber",
  },
  {
    text: "Scaling RLHF preference collection at Turing — async batch inference cut queue latency 5x.",
    date: "APR 15",
    color: "blue",
  },
  {
    text: "Rewriting AI Best Buddy memory layer — pgvector-backed conversation context with 30d retention.",
    date: "APR 12",
    color: "green",
  },
  {
    text: "Second MS CS module at Woolf — distributed systems deep dive.",
    date: "APR 09",
    color: "amber",
  },
];
