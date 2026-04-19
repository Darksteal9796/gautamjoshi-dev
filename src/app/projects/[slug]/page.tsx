import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, type ProjectStatus } from "@/content/projects";

type Params = Promise<{ slug: string }>;

const STATUS_CHIP: Record<ProjectStatus, string> = {
  ACTIVE: "text-green border-green",
  SHIPPED: "text-blue border-blue",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Gautam Joshi`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Gautam Joshi`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const projId = `PROJ-${String(index + 1).padStart(3, "0")}`;

  return (
    <main id="main-content" className="px-3.5 py-10">
      <div className="mx-auto max-w-[1200px]">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-dim hover:text-amber transition-colors mb-6"
        >
          <span aria-hidden="true">←</span> Back to projects
        </Link>

        <article className="flex flex-col gap-3.5">
          <header className="rounded-[10px] border border-line bg-panel p-6 md:p-10">
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim">
                {projId}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase ${STATUS_CHIP[project.status]}`}
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-1.5 h-1.5 rounded-full bg-current"
                />
                {project.status}
              </span>
            </div>

            <h1
              className="font-semibold leading-[0.98] text-fg break-words"
              style={{ fontSize: "clamp(32px, 6vw, 56px)" }}
            >
              {project.name}
            </h1>
            <p className="mt-2 font-mono text-[12px] tracking-[0.08em] text-dim">
              {project.dateRange}
            </p>
            <p className="mt-5 text-[17px] leading-[1.5] text-fg max-w-[64ch]">
              {project.tagline}
            </p>
          </header>

          <section className="rounded-[10px] border border-line bg-panel p-6 md:p-8">
            <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-amber font-semibold mb-3">
              Overview
            </h2>
            <p className="text-[15px] leading-[1.65] text-fg max-w-[68ch]">
              {project.details.overview}
            </p>
          </section>

          <section className="rounded-[10px] border border-line bg-panel p-6 md:p-8">
            <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-amber font-semibold mb-4">
              Key features
            </h2>
            <ul className="flex flex-col gap-2.5">
              {project.details.features.map((f) => (
                <li
                  key={f}
                  className="text-[14px] leading-[1.6] text-fg pl-5 relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.4em] text-amber font-bold"
                  >
                    ›
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[10px] border border-line bg-panel p-6 md:p-8">
            <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-amber font-semibold mb-4">
              Stack
            </h2>
            {project.details.stackNote && (
              <p className="text-[14px] leading-[1.6] text-fg max-w-[68ch] mb-4">
                {project.details.stackNote}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-line bg-panel2 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] uppercase text-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {project.details.links && project.details.links.length > 0 && (
            <section className="rounded-[10px] border border-line bg-panel p-6 md:p-8">
              <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-amber font-semibold mb-4">
                Links
              </h2>
              <ul className="flex flex-wrap gap-3">
                {project.details.links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-panel2 px-4 py-2 font-mono text-[11px] tracking-[0.08em] uppercase text-fg hover:border-amber hover:text-amber transition-colors"
                    >
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
