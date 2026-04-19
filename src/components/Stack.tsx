import { skillCategories } from "@/content/skills";
import { proficiencyWidth } from "@/lib/stack-proficiency";

export default function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="px-3.5 py-10"
    >
      <div className="mx-auto max-w-[1380px]">
        <header className="grid grid-cols-[auto_1fr_auto] items-end gap-4 mb-5">
          <span className="font-mono text-[13px] tracking-[0.12em] text-amber font-semibold">
            /04
          </span>
          <h2
            id="stack-title"
            className="font-mono text-[22px] font-semibold text-fg"
          >
            stack<span className="text-dim">.yaml</span>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim whitespace-nowrap">
            5 CATEGORIES · 25+ TOOLS
          </span>
        </header>

        <div className="rounded-[10px] border border-line bg-panel p-6 md:p-8">
          <div className="grid grid-cols-2 min-[720px]:grid-cols-3 min-[1100px]:grid-cols-5 gap-x-6 gap-y-7">
            {skillCategories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-baseline justify-between border-b border-line pb-2 mb-3">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-amber font-semibold">
                    {cat.name}
                  </span>
                  <span className="font-mono text-[10px] text-dim tabular-nums">
                    {String(cat.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {cat.items.map((item, i) => (
                    <li
                      key={item}
                      className="skill-item rounded-[6px] px-2 py-1.5 border border-transparent"
                    >
                      <span className="block text-[13px] text-fg leading-tight">
                        {item}
                      </span>
                      <span
                        aria-hidden="true"
                        className="block mt-1.5 w-10 h-[3px] rounded-full overflow-hidden bg-panel2"
                      >
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${proficiencyWidth(i)}%`,
                            background:
                              "linear-gradient(90deg, var(--amber), var(--blue))",
                          }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
