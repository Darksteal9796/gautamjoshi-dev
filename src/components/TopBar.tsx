"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { formatIST } from "@/lib/clock";

const NAV_ITEMS = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#stack", label: "stack" },
  { href: "#now", label: "now" },
  { href: "#contact", label: "contact" },
] as const;

export default function TopBar() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatIST());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3.5 pt-3.5">
      <div className="mx-auto max-w-[1380px]">
        <div className="flex items-center justify-between gap-3 rounded-[10px] border border-line bg-panel px-4 py-2.5 backdrop-blur-sm">
          <Link
            href="/"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 font-mono text-[13px] text-fg hover:text-amber transition-colors"
            aria-label="Gautam Joshi — home"
          >
            <span
              aria-hidden="true"
              className="inline-block w-2 h-2 rounded-full bg-amber shadow-[0_0_8px_var(--amber)]"
            />
            <span>
              Gautam<b className="text-amber font-bold">Joshi</b>
              <span className="text-dim"> / console</span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden min-[720px]:flex items-center gap-5 font-mono text-[11px] tracking-[0.15em] lowercase"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-dim hover:text-amber hover:-translate-y-px transition-all duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <span
              aria-hidden="true"
              className="hidden min-[960px]:inline text-dim text-[11px] font-mono"
            >
              │
            </span>
            <span className="hidden min-[960px]:inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-fg">
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-green anim-ship-pulse"
              />
              Shipping
            </span>

            <span
              aria-hidden="true"
              className="hidden min-[1180px]:inline text-dim text-[11px] font-mono"
            >
              │
            </span>
            <span className="hidden min-[1180px]:inline font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
              Lat 18.52°N
            </span>

            <span
              aria-hidden="true"
              className="hidden min-[720px]:inline text-dim text-[11px] font-mono"
            >
              │
            </span>
            <span
              className="hidden min-[720px]:inline font-mono text-[11px] tabular-nums text-fg"
              suppressHydrationWarning
            >
              {time ?? "--:--:--"} IST
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
