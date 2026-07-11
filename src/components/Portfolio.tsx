import Image from "next/image";
import Link from "next/link";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { portfolioBuckets, portfolioNote, type PortfolioItem } from "@/data/site";

const cardShell =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25";

/** Software-project card: no screenshot needed — leads with tech + links. */
function ProjectCard({ item }: { item: PortfolioItem }) {
  const projectLink =
    "inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-foreground";
  return (
    <article className={cardShell}>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted/70">
          {item.tag}
        </span>
        <h4 className="mt-2 font-display text-lg font-semibold text-foreground">
          {item.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {item.description}
        </p>

        {item.tech && item.tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.7rem] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {(item.liveUrl || item.githubUrl) && (
          <div className="mt-auto flex flex-wrap gap-4 pt-5">
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={projectLink}
              >
                Live <span aria-hidden>↗</span>
              </a>
            )}
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={projectLink}
              >
                Code <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function WorkCard({ item }: { item: PortfolioItem }) {
  // Software projects (tech stack / links, no screenshot) get a text-forward card.
  if (!item.image && (item.tech?.length || item.liveUrl || item.githubUrl)) {
    return <ProjectCard item={item} />;
  }

  const contain = item.fit === "contain";
  return (
    <article className={cardShell}>
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-ink-soft">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`transition-transform duration-500 group-hover:scale-[1.04] ${
              contain ? "object-contain p-3" : "object-cover"
            }`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
            <Image
              aria-hidden
              src="/brand/peak-status-submark-transparent.png"
              alt=""
              width={64}
              height={64}
              className="relative h-10 w-auto opacity-20"
            />
            <span className="relative text-xs uppercase tracking-[0.2em] text-muted/60">
              Sample coming soon
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted/70">
          {item.tag}
        </span>
        <h4 className="mt-2 font-display text-base font-semibold text-foreground">
          {item.title}
        </h4>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default function Portfolio() {
  return (
    <Section id="work" grid>
      <SectionHeading
        eyebrow="Work"
        title="Selected Work From Our Team"
        description={portfolioNote}
      />

      <div className="mt-12 flex flex-col gap-16">
        {portfolioBuckets.map((bucket) => (
          <div key={bucket.id}>
            <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {bucket.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{bucket.summary}</p>
              </div>
              {bucket.owner && (
                <span className="text-xs uppercase tracking-[0.18em] text-muted/70">
                  {bucket.owner}
                </span>
              )}
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {bucket.items.map((item, i) => (
                <Reveal key={item.title} delay={(i % 3) * 70}>
                  <WorkCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Reveal className="mt-14 flex justify-center">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-white/30 hover:bg-white/[0.06]"
        >
          View Full Gallery
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}
