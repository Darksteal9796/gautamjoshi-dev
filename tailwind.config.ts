import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        panel2: "var(--panel2)",
        line: "var(--line)",
        fg: "var(--fg)",
        dim: "var(--dim)",
        amber: "var(--amber)",
        blue: "var(--blue)",
        green: "var(--green)",
        "grid-line": "var(--grid-line)",
        "ink-on-amber": "var(--ink-on-amber)",
      },
      fontFamily: {
        mono: "var(--font-mono)",
        sans: "var(--font-sans)",
      },
    },
  },
  plugins: [],
};

export default config;
