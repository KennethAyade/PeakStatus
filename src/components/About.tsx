import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { about } from "@/data/site";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading + copy */}
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-6 flex flex-col gap-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: honest value props */}
        <div className="lg:col-span-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {about.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {h.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
