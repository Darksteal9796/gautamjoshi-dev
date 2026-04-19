"use client";

import { useRef } from "react";
import {
  projects,
  type Project,
  type ProjectStatus,
  type ProjectTint,
} from "@/content/projects";

const STATUS_CHIP: Record<ProjectStatus, string> = {
  ACTIVE: "text-green border-green",
  SHIPPED: "text-blue border-blue",
};

const TINT_GLOW: Record<ProjectTint, string> = {
  amber:
    "radial-gradient(ellipse 60% 50% at 0% 0%, color-mix(in srgb, var(--amber) 10%, transparent), transparent 65%)",
  blue:
    "radial-gradient(ellipse 60% 50% at 0% 0%, color-mix(in srgb, var(--blue) 10%, transparent), transparent 65%)",
  fg: "radial-gradient(ellipse 60% 50% at 0% 0%, color-mix(in srgb, var(--fg) 5%, transparent), transparent 65%)",
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const ry = px * 12;
    const rx = -py * 6;
    const isLight =
      document.documentElement.dataset.theme === "light";
    const translate = isLight ? "translate(-2px, -2px)" : "translateY(-3px)";
    el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) ${translate}`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const projId = `PROJ-${String(index + 1).padStart(3, "0")}`;

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ backgroundImage: TINT_GLOW[project.tint] }}
      className="project-card relative rounded-[10px] border border-line bg-panel p-6 overflow-hidden will-change-transform"
    >
      <header className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
          {projId}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase ${STATUS_CHIP[project.status]}`}
        >
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full bg-current"
          />
          {project.status}
        </span>
      </header>

      <h3
        className={`mt-4 font-semibold text-fg leading-tight ${project.featured ? "text-[28px]" : "text-[22px]"}`}
      >
        {project.name}
      </h3>

      <p className="mt-1 font-mono text-[11px] tracking-[0.06em] text-dim">
        {project.dateRange}
      </p>

      <p className="mt-3 text-[14px] leading-[1.5] text-fg max-w-[48ch]">
        {project.tagline}
      </p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {project.bullets.map((b) => (
          <li
            key={b}
            className="text-[13px] leading-[1.55] text-dim pl-4 relative"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.45em] text-amber"
            >
              ›
            </span>
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="inline-flex items-center rounded-full border border-line bg-panel2 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] uppercase text-dim"
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="px-3.5 py-10"
    >
      <div className="mx-auto max-w-[1380px]">
        <header className="grid grid-cols-[auto_1fr_auto] items-end gap-4 mb-5">
          <span className="section-number font-mono text-[13px] tracking-[0.12em] text-amber font-semibold">
            /03
          </span>
          <h2
            id="projects-title"
            className="section-title-sweep font-mono text-[22px] font-semibold text-fg"
          >
            projects<span className="text-dim">[]</span>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim whitespace-nowrap">
            3 SELECTED · MORE ON GITHUB
          </span>
        </header>

        <div
          data-stagger
          className="grid gap-3.5 grid-cols-1 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-[1.4fr_1fr_1fr]"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
