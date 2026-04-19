import { aboutChips, aboutLead } from "@/content/about";

const LEAD_COLOR = {
  amber: "text-amber font-semibold",
  blue: "text-blue font-semibold",
} as const;

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="px-3.5 py-10"
    >
      <div className="mx-auto max-w-[1380px]">
        <header className="grid grid-cols-[auto_1fr_auto] items-end gap-4 mb-5">
          <span className="section-number font-mono text-[13px] tracking-[0.12em] text-amber font-semibold">
            /01
          </span>
          <h2
            id="about-title"
            className="section-title-sweep font-mono text-[22px] font-semibold text-fg"
          >
            about<span className="text-dim">()</span>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
            README · 40s
          </span>
        </header>

        <div className="rounded-[10px] border border-line bg-panel p-6 md:p-8">
          <p className="text-[20px] leading-[1.45] max-w-[58ch] text-fg">
            {aboutLead.map((seg, i) => {
              if (seg.kind === "text") return <span key={i}>{seg.value}</span>;
              return (
                <b key={i} className={LEAD_COLOR[seg.kind]}>
                  {seg.value}
                </b>
              );
            })}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {aboutChips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-panel2 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-dim"
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-1 h-1 rounded-full bg-amber"
                />
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
