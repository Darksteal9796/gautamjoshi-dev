"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let pending = false;

    const update = () => {
      pending = false;
      const el = ref.current;
      if (!el) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
      el.style.width = `${(pct * 100).toFixed(2)}%`;
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      ref={ref}
      className="fixed top-0 left-0 h-[2px] z-[100] pointer-events-none"
      style={{
        width: "0%",
        background:
          "linear-gradient(90deg, var(--amber), var(--blue), var(--green))",
      }}
    />
  );
}
