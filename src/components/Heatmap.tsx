"use client";

import { useEffect, useMemo, useState } from "react";
import { seededHeatmap } from "@/lib/mock-heatmap";

const LEVEL_COLOR = [
  "var(--panel2)",
  "color-mix(in srgb, var(--amber) 20%, var(--panel2))",
  "color-mix(in srgb, var(--amber) 45%, var(--panel2))",
  "color-mix(in srgb, var(--amber) 70%, var(--panel2))",
  "var(--amber)",
] as const;

const ROWS = 7;
const STAGGER_MS = 4;
const STAGGER_CAP_MS = 180;

type Breakpoint = "wide" | "mid" | "narrow";

function resolveBreakpoint(width: number): Breakpoint {
  if (width < 380) return "narrow";
  if (width < 720) return "mid";
  return "wide";
}

const COLS_BY_BP: Record<Breakpoint, number> = {
  wide: 26,
  mid: 13,
  narrow: 7,
};

export default function Heatmap() {
  const [bp, setBp] = useState<Breakpoint>("wide");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const update = () => setBp(resolveBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const cols = COLS_BY_BP[bp];
  const total = cols * ROWS;

  const levels = useMemo(() => seededHeatmap(0xc0ffee, total), [total]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
        <span className="text-amber font-semibold">[STATS]</span>
        <span>commit activity · 26 weeks</span>
        <span className="text-amber font-semibold">1,284 commits</span>
      </div>

      <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] uppercase text-dim">
        <span>Less</span>
        {LEVEL_COLOR.map((c, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block w-3 h-3 rounded-[2px]"
            style={{ backgroundColor: c }}
          />
        ))}
        <span>More</span>
      </div>

      <div
        role="img"
        aria-label="Commit activity heatmap — 26 weeks"
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gridAutoFlow: "column",
        }}
      >
        {levels.map((level, i) => {
          const delay = reduced ? 0 : Math.min(STAGGER_CAP_MS, i * STAGGER_MS);
          return (
            <span
              key={i}
              className={`aspect-square rounded-[2px] ${reduced ? "" : "anim-cell-fade"}`}
              style={{
                backgroundColor: LEVEL_COLOR[level],
                animationDelay: reduced ? undefined : `${delay}ms`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
