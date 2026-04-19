type ContactRow = {
  label: string;
  value: string;
  meta: string;
  href?: string;
  newTab?: boolean;
  live?: boolean;
};

const CONTACT_ROWS: readonly ContactRow[] = [
  {
    label: "Email",
    value: "gautamjoshi.dev@gmail.com",
    meta: "Primary",
    href: "mailto:gautamjoshi.dev@gmail.com",
  },
  {
    label: "GitHub",
    value: "@darksteal9796",
    meta: "Code",
    href: "https://github.com/darksteal9796",
    newTab: true,
  },
  {
    label: "LinkedIn",
    value: "gautam-joshi",
    meta: "Prof",
    href: "https://www.linkedin.com/in/gautam-joshi-054496243",
    newTab: true,
  },
  {
    label: "Phone",
    value: "+91 7020 987 773",
    meta: "WhatsApp",
  },
  {
    label: "Location",
    value: "Pune, India · IST",
    meta: "UTC+5:30",
  },
  {
    label: "Status",
    value: "Open to senior roles",
    meta: "Live",
    live: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="px-3.5 py-10"
    >
      <div className="mx-auto max-w-[1380px]">
        <header className="grid grid-cols-[auto_1fr_auto] items-end gap-4 mb-5">
          <span className="font-mono text-[13px] tracking-[0.12em] text-amber font-semibold">
            /06
          </span>
          <h2
            id="contact-title"
            className="font-mono text-[22px] font-semibold text-fg"
          >
            contact<span className="text-dim">.send()</span>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim whitespace-nowrap">
            REPLY &lt; 24H
          </span>
        </header>

        <div className="grid gap-3.5 grid-cols-1 min-[720px]:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-[10px] border border-line bg-panel p-7 md:p-9"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 50% at 0% 0%, color-mix(in srgb, var(--amber) 12%, transparent), transparent 60%), radial-gradient(ellipse 60% 40% at 100% 100%, color-mix(in srgb, var(--blue) 10%, transparent), transparent 60%)",
            }}
          >
            <h3 className="font-semibold leading-[1.05] text-fg text-[40px] md:text-[56px]">
              Let&apos;s build{" "}
              <span className="text-amber">something.</span>
            </h3>
            <p className="mt-4 text-[15px] leading-[1.55] max-w-[40ch] text-fg">
              Shipping AI products, hiring conversations, consulting briefs —
              open to all of it. Reply within 24 hours, usually faster.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="mailto:gautamjoshi.dev@gmail.com"
                className="contact-btn contact-btn-solid inline-flex items-center gap-2 rounded-full bg-amber text-ink-on-amber font-mono text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 transition-transform"
              >
                Send Email →
              </a>
              <a
                href="https://www.linkedin.com/in/gautam-joshi-054496243"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-ghost inline-flex items-center gap-2 rounded-full border border-line bg-panel2 text-fg font-mono text-[11px] tracking-[0.12em] uppercase font-semibold px-4 py-2.5 transition-colors hover:border-amber hover:text-amber"
              >
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-ghost inline-flex items-center gap-2 rounded-full border border-line bg-panel2 text-fg font-mono text-[11px] tracking-[0.12em] uppercase font-semibold px-4 py-2.5 transition-colors hover:border-amber hover:text-amber"
              >
                Resume.pdf ↗
              </a>
            </div>
          </div>

          <div className="rounded-[10px] border border-line bg-panel p-6 md:p-7">
            <ul className="flex flex-col divide-y divide-line divide-dashed">
              {CONTACT_ROWS.map((row) => {
                const valueNode = row.href ? (
                  <a
                    href={row.href}
                    target={row.newTab ? "_blank" : undefined}
                    rel={row.newTab ? "noopener noreferrer" : undefined}
                    className="text-fg hover:text-amber transition-colors break-all"
                  >
                    {row.value}
                  </a>
                ) : row.live ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block w-1.5 h-1.5 rounded-full bg-green"
                    />
                    <span className="text-green">{row.value}</span>
                  </span>
                ) : (
                  <span className="text-fg break-words">{row.value}</span>
                );

                return (
                  <li
                    key={row.label}
                    className="grid grid-cols-[80px_1fr] min-[720px]:grid-cols-[110px_1fr_auto] gap-3 items-center py-3 text-[13px]"
                  >
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
                      {row.label}
                    </span>
                    <span className="min-w-0">{valueNode}</span>
                    <span className="hidden min-[720px]:inline font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
                      {row.meta}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
