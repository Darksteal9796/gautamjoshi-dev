"use client";

import { useRef } from "react";
import CountUp from "./CountUp";
import {
  metrics,
  type Metric,
  type MetricSparkColor,
  type MetricValueColor,
} from "@/content/metrics";
import { sparklinePoints } from "@/lib/sparkline";

const DELTA_NEGATIVE = "#ff3a4d";
const SPARK_WIDTH = 70;
const SPARK_HEIGHT = 24;

const VALUE_COLOR: Record<MetricValueColor, string> = {
  amber: "text-amber",
  blue: "text-blue",
  fg: "text-fg",
};

const SPARK_COLOR_VAR: Record<MetricSparkColor, string> = {
  amber: "var(--amber)",
  blue: "var(--blue)",
  green: "var(--green)",
  fg: "var(--fg)",
};

function Sparkline({
  points,
  color,
}: {
  points: readonly number[];
  color: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`}
      width={SPARK_WIDTH}
      height={SPARK_HEIGHT}
      aria-hidden="true"
      className="absolute bottom-3 right-3 opacity-50 pointer-events-none"
    >
      <polyline
        points={sparklinePoints(points, SPARK_WIDTH)}
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = px * 12;
    const rotX = -py * 6;
    el.style.transform = `perspective(800px) rotateX(${rotX.toFixed(
      2
    )}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="metric-card relative rounded-[10px] border border-line bg-panel p-5 overflow-hidden will-change-transform"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
          {metric.name}
        </div>
        <div
          className="font-mono text-[10px] tracking-[0.06em] whitespace-nowrap"
          style={{
            color:
              metric.deltaTone === "positive"
                ? "var(--green)"
                : DELTA_NEGATIVE,
          }}
        >
          {metric.delta}
        </div>
      </div>

      <div
        className={`mt-4 font-mono text-[34px] font-bold leading-none tabular-nums ${VALUE_COLOR[metric.valueColor]}`}
      >
        <CountUp target={metric.value} />
      </div>

      <div className="mt-2 font-mono text-[11px] text-dim max-w-[60%]">
        {metric.subcaption}
      </div>

      <Sparkline
        points={metric.sparkPoints}
        color={SPARK_COLOR_VAR[metric.sparkColor]}
      />
    </div>
  );
}

export default function Metrics() {
  return (
    <section aria-label="Key metrics" className="px-3.5 pb-10">
      <div className="mx-auto max-w-[1380px]">
        <div
          data-stagger
          className="grid grid-cols-2 min-[1100px]:grid-cols-4 gap-3.5"
        >
          {metrics.map((m) => (
            <MetricCard key={m.name} metric={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
