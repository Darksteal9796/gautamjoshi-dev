"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { orbitSkills, type OrbitSkill } from "@/content/skills-orbit";
import {
  easeToward,
  nodePosition,
  normalizeDeg,
  ORBIT_CX,
  ORBIT_CY,
  RING_RADII,
  RING_SPEEDS_DEG_PER_TICK,
  type RingKey,
} from "@/lib/orbit-layout";

const DECO_RING_RADIUS = 178;
const CENTER_R = 14;
const NODE_R = 5;
const HIT_R = 18;
const TICK_MS = 60;
const MAX_HOVER_TILT = 22;
const MAX_AMBIENT_TILT = 14;
const TILT_EASE = 0.08;

const RING_COLOR: Record<RingKey, string> = {
  1: "var(--amber)",
  2: "var(--blue)",
  3: "var(--green)",
};

type Layout = { skill: OrbitSkill; indexInRing: number; ringCount: number };

function groupByRing(skills: readonly OrbitSkill[]): Layout[] {
  const byRing: Record<RingKey, OrbitSkill[]> = { 1: [], 2: [], 3: [] };
  for (const s of skills) byRing[s.ring].push(s);
  return skills.map((skill) => {
    const ringSkills = byRing[skill.ring];
    return {
      skill,
      indexInRing: ringSkills.indexOf(skill),
      ringCount: ringSkills.length,
    };
  });
}

export default function OrbitGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const groupRefs = useRef<Array<SVGGElement | null>>([]);
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);

  const ringRotations = useRef<Record<RingKey, number>>({ 1: 0, 2: 0, 3: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });

  const [active, setActive] = useState<OrbitSkill | null>(null);
  const [hovered, setHovered] = useState<OrbitSkill | null>(null);
  const [reduced, setReduced] = useState(false);

  const layouts = useMemo(() => groupByRing(orbitSkills), []);
  const paused = hovered !== null || active !== null;
  const selected = hovered ?? active;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const paintPositions = () => {
    layouts.forEach((l, idx) => {
      const ring = l.skill.ring as RingKey;
      const rot = ringRotations.current[ring];
      const r = RING_RADII[ring];
      const { x, y } = nodePosition(l.indexInRing, l.ringCount, r, rot);
      const g = groupRefs.current[idx];
      const line = lineRefs.current[idx];
      if (g) g.setAttribute("transform", `translate(${x} ${y})`);
      if (line) {
        line.setAttribute("x2", String(x));
        line.setAttribute("y2", String(y));
      }
    });
  };

  useEffect(() => {
    paintPositions();
    // paint once on mount so SSR (angle 0) matches client initial
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (paused) return;
      ringRotations.current = {
        1: normalizeDeg(ringRotations.current[1] + RING_SPEEDS_DEG_PER_TICK[1]),
        2: normalizeDeg(ringRotations.current[2] + RING_SPEEDS_DEG_PER_TICK[2]),
        3: normalizeDeg(ringRotations.current[3] + RING_SPEEDS_DEG_PER_TICK[3]),
      };
      paintPositions();
    }, TICK_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduced]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const loop = () => {
      currentTilt.current.x = easeToward(
        currentTilt.current.x,
        targetTilt.current.x,
        TILT_EASE
      );
      currentTilt.current.y = easeToward(
        currentTilt.current.y,
        targetTilt.current.y,
        TILT_EASE
      );
      const svg = svgRef.current;
      if (svg) {
        svg.style.transform = `perspective(1000px) rotateX(${currentTilt.current.y.toFixed(
          2
        )}deg) rotateY(${currentTilt.current.x.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const handleMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const over =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      const max = over ? MAX_HOVER_TILT : MAX_AMBIENT_TILT;
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetTilt.current.x = Math.max(-max, Math.min(max, nx * max));
      targetTilt.current.y = -Math.max(-max, Math.min(max, ny * max));
    };
    document.addEventListener("mousemove", handleMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMove);
  }, [reduced]);

  const toggleActive = (skill: OrbitSkill) =>
    setActive((prev) => (prev?.label === skill.label ? null : skill));

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.12em] uppercase">
        <span className="inline-flex items-center gap-2">
          <span className="text-amber font-semibold">[LIVE]</span>
          <span className="text-dim">skill.graph — orbital view</span>
        </span>
        <span className="text-amber font-semibold">18 NODES</span>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 40 500 360"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Orbital graph of 18 technical skills across three rings"
        className="w-full h-auto transition-opacity duration-1000 ease-out opacity-100 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <circle
          cx={ORBIT_CX}
          cy={ORBIT_CY}
          r={RING_RADII[1]}
          fill="none"
          stroke="var(--line)"
          strokeOpacity={selected?.ring === 1 ? 0.9 : 0.35}
        />
        <circle
          cx={ORBIT_CX}
          cy={ORBIT_CY}
          r={RING_RADII[2]}
          fill="none"
          stroke="var(--line)"
          strokeOpacity={selected?.ring === 2 ? 0.9 : 0.35}
        />
        <circle
          cx={ORBIT_CX}
          cy={ORBIT_CY}
          r={RING_RADII[3]}
          fill="none"
          stroke="var(--line)"
          strokeOpacity={selected?.ring === 3 ? 0.9 : 0.35}
        />
        <circle
          cx={ORBIT_CX}
          cy={ORBIT_CY}
          r={DECO_RING_RADIUS}
          fill="none"
          stroke="var(--line)"
          strokeOpacity={0.25}
          strokeDasharray="2 7"
        />

        {layouts.map((l, idx) => (
          <line
            key={`line-${l.skill.label}`}
            ref={(el) => {
              lineRefs.current[idx] = el;
            }}
            x1={ORBIT_CX}
            y1={ORBIT_CY}
            x2={ORBIT_CX}
            y2={ORBIT_CY}
            stroke={RING_COLOR[l.skill.ring as RingKey]}
            strokeOpacity={0.22}
            strokeWidth={1}
          />
        ))}

        <g
          role="button"
          tabIndex={0}
          onClick={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActive(null);
            }
          }}
          aria-label="Center — reset selected skill"
          className="cursor-pointer focus:outline-none"
        >
          <circle
            cx={ORBIT_CX}
            cy={ORBIT_CY}
            r={CENTER_R}
            fill="var(--amber)"
            style={{
              filter: "drop-shadow(0 0 10px var(--amber))",
            }}
          />
          <text
            x={ORBIT_CX}
            y={ORBIT_CY + CENTER_R + 18}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize={10}
            letterSpacing="0.12em"
            fill="var(--dim)"
          >
            GAUTAM
          </text>
        </g>

        {layouts.map((l, idx) => {
          const isHoveredNode = hovered?.label === l.skill.label;
          const isActiveNode = active?.label === l.skill.label;
          const highlighted = isHoveredNode || isActiveNode;
          const color = RING_COLOR[l.skill.ring as RingKey];
          const initial = nodePosition(
            l.indexInRing,
            l.ringCount,
            RING_RADII[l.skill.ring as RingKey],
            0
          );
          return (
            <g
              key={l.skill.label}
              ref={(el) => {
                groupRefs.current[idx] = el;
              }}
              transform={`translate(${initial.x} ${initial.y})`}
              onMouseEnter={() => setHovered(l.skill)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => toggleActive(l.skill)}
              onFocus={() => setHovered(l.skill)}
              onBlur={() => setHovered(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleActive(l.skill);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${l.skill.label} — ${l.skill.category}, ${l.skill.years} years`}
              aria-pressed={isActiveNode}
              className="cursor-pointer focus:outline-none"
            >
              <circle
                r={HIT_R}
                fill="transparent"
                className="pointer-events-auto"
              />
              <circle
                r={highlighted ? NODE_R + 2 : NODE_R}
                fill={color}
                style={{
                  filter: highlighted
                    ? `drop-shadow(0 0 8px ${color})`
                    : undefined,
                  transition: "r 150ms ease, filter 150ms ease",
                }}
              />
              <text
                x={0}
                y={NODE_R + 14}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={highlighted ? 11 : 10}
                fontWeight={highlighted ? 700 : 400}
                fill={highlighted ? "var(--amber)" : "var(--fg)"}
                style={{ transition: "font-size 150ms ease" }}
              >
                {l.skill.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div
        className="rounded-[8px] border border-line bg-panel2 px-3 py-2 font-mono text-[11px] text-fg min-h-[36px] flex items-center"
        aria-live="polite"
      >
        {selected ? (
          <span>
            <span className="text-amber font-semibold">{selected.label}</span>
            <span className="text-dim"> · </span>
            <span className="text-dim">{selected.category}</span>
            <span className="text-dim"> · </span>
            <span>{selected.years}Y</span>
            <span className="text-dim"> — </span>
            <span className="text-dim">{selected.description}</span>
          </span>
        ) : (
          <span className="text-dim tracking-[0.12em] uppercase">
            Click a skill to explore
          </span>
        )}
      </div>
    </div>
  );
}
