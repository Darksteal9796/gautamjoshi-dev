"use client";

import { useEffect, useState } from "react";
import { formatIST } from "@/lib/clock";

export default function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatIST());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="px-3.5 pb-6">
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-1.5 items-center min-[720px]:flex-row min-[720px]:justify-between min-[720px]:items-center rounded-[10px] border border-line bg-panel px-4 py-3 font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
          <span>© 2026 Gautam Joshi · Built with HTML &amp; Chai</span>
          <span
            className="tabular-nums whitespace-nowrap"
            suppressHydrationWarning
          >
            v1.0 · Console · Last Sync {time ?? "--:--:--"} IST
          </span>
        </div>
      </div>
    </footer>
  );
}
