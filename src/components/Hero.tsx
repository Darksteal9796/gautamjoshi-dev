import CountUp from "./CountUp";
import OrbitGraph from "./OrbitGraph";

type StatColor = "amber" | "blue" | "fg";

const STAT_COLOR: Record<StatColor, string> = {
  amber: "text-amber",
  blue: "text-blue",
  fg: "text-fg",
};

function Stat({
  value,
  label,
  color,
}: {
  value: React.ReactNode;
  label: string;
  color: StatColor;
}) {
  return (
    <div>
      <div
        className={`font-mono text-[28px] font-bold leading-none tabular-nums ${STAT_COLOR[color]}`}
      >
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="px-3.5 pt-8 pb-12"
    >
      <div className="mx-auto max-w-[1380px] grid gap-3.5 grid-cols-1 min-[1100px]:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[10px] border border-line bg-panel p-6 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.12em] text-dim">
            {"// ID "}
            <span className="text-green">#GJ-9796</span>
            {" — verified engineer"}
          </p>
          <h1
            className="mt-4 font-bold leading-[0.95] text-fg"
            style={{ fontSize: "clamp(34px, 6vw, 84px)" }}
          >
            Gautam
            <br />
            <span className="hero-joshi anim-hero-shimmer">Joshi.</span>
            <span className="hero-caret anim-caret-blink" aria-hidden="true">
              _
            </span>
          </h1>
          <p className="mt-6 text-[18px] leading-snug max-w-[32ch] text-fg">
            Senior AI Full-Stack Engineer building{" "}
            <b className="text-blue font-semibold">LLMs</b>,{" "}
            <b className="text-blue font-semibold">RAG pipelines</b> &amp;{" "}
            <b className="text-blue font-semibold">voice agents</b> — from
            fine-tune to production.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-5 max-w-[440px]">
            <Stat
              value={<CountUp target={4} suffix="+" pad={2} />}
              label="Years shipping"
              color="amber"
            />
            <Stat
              value={<CountUp target={5} suffix="K+" />}
              label="Users reached"
              color="fg"
            />
            <Stat
              value={<CountUp target={6} pad={2} />}
              label="Devs led"
              color="blue"
            />
          </div>
        </div>

        <div className="rounded-[10px] border border-line bg-panel p-6 md:p-8 min-h-[360px] flex items-center justify-center">
          <OrbitGraph />
        </div>
      </div>
    </section>
  );
}
