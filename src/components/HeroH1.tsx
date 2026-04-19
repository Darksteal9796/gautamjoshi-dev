"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { scrambleFrame } from "@/lib/scramble";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function collectTextNodes(root: Node): Text[] {
  const out: Text[] = [];
  const walk = (n: Node) => {
    if (n.nodeType === Node.ELEMENT_NODE) {
      const el = n as Element;
      if (el.getAttribute("aria-hidden") === "true") return;
    }
    if (n.nodeType === Node.TEXT_NODE) {
      const t = n as Text;
      if ((t.textContent ?? "").trim().length > 0) out.push(t);
      return;
    }
    n.childNodes.forEach(walk);
  };
  walk(root);
  return out;
}

const SCRAMBLE_DURATION = 900;

export default function HeroH1({ children, className, style }: Props) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const h1 = ref.current;
    if (!h1) return;

    const nodes = collectTextNodes(h1);
    const originals = nodes.map((n) => ({ node: n, text: n.textContent ?? "" }));

    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - t0) / SCRAMBLE_DURATION);
      for (const { node, text } of originals) {
        node.textContent = scrambleFrame(text, progress);
      }
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        for (const { node, text } of originals) node.textContent = text;
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      for (const { node, text } of originals) node.textContent = text;
    };
  }, []);

  return (
    <h1 ref={ref} className={className} style={style}>
      {children}
    </h1>
  );
}
