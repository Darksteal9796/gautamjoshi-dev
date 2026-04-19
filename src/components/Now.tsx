import Heatmap from "./Heatmap";
import TiltPanel from "./TiltPanel";
import { nowEntries, type NowColor } from "@/content/now";

const DOT_COLOR: Record<NowColor, string> = {
  amber: "var(--amber)",
  blue: "var(--blue)",
  green: "var(--green)",
};

export default function Now() {
  return (
    <section
      id="now"
      aria-labelledby="now-title"
      className="px-3.5 py-10"
    >
      <div className="mx-auto max-w-[1380px]">
        <header className="grid grid-cols-[auto_1fr_auto] items-end gap-4 mb-5">
          <span className="section-number font-mono text-[13px] tracking-[0.12em] text-amber font-semibold">
            /05
          </span>
          <h2
            id="now-title"
            className="section-title-sweep font-mono text-[22px] font-semibold text-fg"
          >
            now<span className="text-dim">.log</span>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim whitespace-nowrap">
            STREAMING · APR 2026
          </span>
        </header>

        <div className="grid gap-3.5 grid-cols-1 min-[720px]:grid-cols-2">
          <TiltPanel className="tilt-panel rounded-[10px] border border-line bg-panel p-6 md:p-7">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase text-dim mb-4">
              <span className="text-amber font-semibold">[LIVE]</span>
              <span>currently working on</span>
              <span>updated 2d ago</span>
            </div>

            <ol data-stagger className="flex flex-col gap-4">
              {nowEntries.map((entry, i) => (
                <li key={entry.date} className="grid grid-cols-[auto_1fr_auto] gap-3 items-start">
                  <span className="relative flex items-center justify-center w-4 h-4 mt-1">
                    {i === 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute inline-block w-3 h-3 rounded-full anim-ping-ring"
                        style={{ backgroundColor: DOT_COLOR[entry.color] }}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="relative inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: DOT_COLOR[entry.color] }}
                    />
                  </span>

                  <p className="text-[13px] leading-[1.55] text-fg max-w-[48ch] min-w-0 break-words">
                    {entry.text}
                  </p>

                  <span className="font-mono text-[10px] tracking-[0.08em] text-dim whitespace-nowrap mt-1">
                    {entry.date}
                  </span>
                </li>
              ))}
            </ol>
          </TiltPanel>

          <TiltPanel className="tilt-panel rounded-[10px] border border-line bg-panel p-6 md:p-7">
            <Heatmap />
          </TiltPanel>
        </div>
      </div>
    </section>
  );
}
