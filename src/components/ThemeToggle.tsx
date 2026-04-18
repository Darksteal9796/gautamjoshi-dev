"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "gj-theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function handleToggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // private browsing / disabled storage — still flip in-memory
    }
    setTheme(next);
  }

  const pillClass =
    "inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-[0.12em] uppercase " +
    "px-3 py-1.5 rounded-full bg-amber text-ink-on-amber border-0 cursor-pointer " +
    "transition-shadow duration-150 " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber";

  if (theme === null) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        disabled
        className={`${pillClass} opacity-0 pointer-events-none`}
      >
        <span aria-hidden="true" style={{ fontFamily: "system-ui" }}>
          ☀
        </span>
        <span>THEME</span>
      </button>
    );
  }

  const next: Theme = theme === "dark" ? "light" : "dark";
  const icon = theme === "dark" ? "☀" : "☾";
  const shadow =
    theme === "light" ? "shadow-[3px_3px_0_var(--line)]" : "shadow-none";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${next} theme`}
      className={`${pillClass} ${shadow}`}
    >
      <span aria-hidden="true" style={{ fontFamily: "system-ui" }}>
        {icon}
      </span>
      <span>{next.toUpperCase()}</span>
    </button>
  );
}
