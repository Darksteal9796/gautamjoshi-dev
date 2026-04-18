"use client";

import { useEffect, useRef } from "react";
import { formatCountValue } from "@/lib/format";

type Props = {
  target: number | string;
  suffix?: string;
  duration?: number;
  pad?: number;
};

const DEFAULT_DURATION = 1100;
const IO_THRESHOLD = 0.6;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CountUp({
  target,
  suffix = "",
  duration = DEFAULT_DURATION,
  pad = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const targetStr = String(target);
  const isString = typeof target === "string";

  const finalDisplay = isString
    ? targetStr + suffix
    : formatCountValue(target, targetStr, pad) + suffix;

  useEffect(() => {
    const node = ref.current;
    if (!node || isString) return;
    if (prefersReducedMotion()) {
      node.classList.add("done");
      return;
    }

    const numTarget = target as number;

    const paint = (n: number) => {
      node.textContent = formatCountValue(n, targetStr, pad) + suffix;
    };

    let rafId = 0;
    let started = false;
    paint(0);
    node.classList.remove("done");

    const start = (): void => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        paint(eased * numTarget);
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          paint(numTarget);
          node.classList.add("done");
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            start();
            break;
          }
        }
      },
      { threshold: IO_THRESHOLD }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [duration, isString, pad, suffix, target, targetStr]);

  return (
    <span ref={ref} className="countup">
      {finalDisplay}
    </span>
  );
}
