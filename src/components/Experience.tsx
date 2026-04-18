"use client";

import { useState } from "react";
import { experiences } from "@/content/experience";

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = experiences[activeIdx];

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="px-3.5 py-10"
    >
      <div className="mx-auto max-w-[1380px]">
        <header className="grid grid-cols-[auto_1fr_auto] items-end gap-4 mb-5">
          <span className="font-mono text-[13px] tracking-[0.12em] text-amber font-semibold">
            /02
          </span>
          <h2
            id="experience-title"
            className="font-mono text-[22px] font-semibold text-fg"
          >
            experience<span className="text-dim">.history</span>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim whitespace-nowrap">
            3 COMPANIES · 4+ YEARS
          </span>
        </header>

        <div className="rounded-[10px] border border-line bg-panel p-5 md:p-7">
          <div className="no-scrollbar overflow-x-auto min-[720px]:hidden -mx-1 mb-5">
            <div
              role="tablist"
              aria-label="Experience"
              className="inline-flex gap-2 px-1"
            >
              {experiences.map((e, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={e.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="experience-card"
                    onClick={() => setActiveIdx(i)}
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
                      isActive
                        ? "border-amber bg-amber-tint text-amber"
                        : "border-line text-dim hover:text-fg"
                    }`}
                  >
                    {e.company}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 min-[720px]:grid-cols-[220px_1fr] gap-5">
            <nav
              aria-label="Experience list"
              role="tablist"
              className="hidden min-[720px]:block relative"
            >
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-2 bottom-2 w-px bg-line"
              />
              <ul className="flex flex-col gap-2">
                {experiences.map((e, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <li key={e.id}>
                      <button
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="experience-card"
                        onClick={() => setActiveIdx(i)}
                        className={`group relative w-full text-left pl-7 pr-3 py-2.5 rounded-[8px] border transition-colors font-mono text-[11px] tracking-[0.08em] ${
                          isActive
                            ? "border-amber bg-amber-tint text-amber"
                            : "border-transparent text-dim hover:text-fg hover:border-line"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute left-[2.5px] top-[13px] w-[11px] h-[11px] rounded-full border ${
                            isActive
                              ? "bg-amber border-amber"
                              : "bg-panel border-line group-hover:border-dim"
                          }`}
                        />
                        {e.company}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <article
              id="experience-card"
              role="tabpanel"
              aria-labelledby="experience-title"
              className="min-h-[340px]"
            >
              <header className="pb-4 border-b border-line">
                <h3 className="text-[22px] md:text-[24px] font-semibold text-fg break-words">
                  {active.role}
                </h3>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-dim">
                  <span className="text-blue">{active.company}</span>
                  <span> · {active.dateRange} · {active.location}</span>
                </p>
              </header>

              <ul className="mt-2">
                {active.bullets.map((b) => (
                  <li
                    key={b}
                    className="py-3 text-[14px] leading-[1.55] text-fg border-b border-dashed border-line last:border-b-0"
                  >
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {active.stack.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full border border-line bg-panel2 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] uppercase text-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
