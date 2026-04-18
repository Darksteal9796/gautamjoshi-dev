export type MetricValueColor = "amber" | "blue" | "fg";
export type MetricSparkColor = "amber" | "blue" | "green" | "fg";
export type MetricDeltaTone = "positive" | "negative";

export type Metric = {
  name: string;
  value: number;
  valueColor: MetricValueColor;
  delta: string;
  deltaTone: MetricDeltaTone;
  subcaption: string;
  sparkPoints: readonly number[];
  sparkColor: MetricSparkColor;
};

export const metrics: readonly Metric[] = [
  {
    name: "LLMs Fine-tuned",
    value: 24,
    valueColor: "amber",
    delta: "▲ 12 QoQ",
    deltaTone: "positive",
    subcaption: "Python · Java · Ruby · Rust",
    sparkPoints: [20, 18, 16, 14, 12, 10, 8, 6],
    sparkColor: "amber",
  },
  {
    name: "Prod Deploys",
    value: 147,
    valueColor: "blue",
    delta: "▲ 3 this wk",
    deltaTone: "positive",
    subcaption: "AWS · Azure · GCP",
    sparkPoints: [18, 14, 16, 12, 14, 10, 12, 8],
    sparkColor: "blue",
  },
  {
    name: "Platform Users",
    value: 5248,
    valueColor: "fg",
    delta: "▲ 8% MoM",
    deltaTone: "positive",
    subcaption: "Internal LLM eval @ Turing",
    sparkPoints: [22, 20, 18, 15, 12, 8, 5, 2],
    sparkColor: "green",
  },
  {
    name: "Coffee / Day",
    value: 6.2,
    valueColor: "fg",
    delta: "▲ 2 ☕",
    deltaTone: "negative",
    subcaption: "critical infrastructure",
    sparkPoints: [12, 18, 10, 16, 8, 14, 6, 20],
    sparkColor: "fg",
  },
] as const;
