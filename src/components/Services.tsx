import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { serviceGroups } from "@/data/site";

/** Small peak/arrow glyph used as a list marker — echoes the logo. */
function PeakMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className="mt-1.5 h-2.5 w-2.5 shrink-0 text-foreground/70"
      fill="none"
    >
      <path
        d="M6 1.5 11 10.5H1L6 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Services() {
  return (
    <Section id="services" grid>
      <SectionHeading
        eyebrow="Services"
        title="What we do, end to end"
        description="Four connected areas of work. Engage one, or combine them into a complete growth program for your brand."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {serviceGroups.map((group, i) => (
          <Reveal key={group.id} delay={(i % 2) * 80}>
            <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {group.title}
                </h3>
                <span className="font-display text-sm text-muted/60">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {group.summary}
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-foreground/90"
                  >
                    <PeakMark />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
