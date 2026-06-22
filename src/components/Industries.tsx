import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { industries } from "@/data/site";

export default function Industries() {
  return (
    <Section id="industries">
      <SectionHeading
        eyebrow="Industries"
        title="Who we build for"
        description="We focus on the kinds of local businesses we understand best — and where strong branding and digital systems make a real difference."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, i) => (
          <Reveal key={industry.name} delay={(i % 3) * 70}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.04]">
              <div
                aria-hidden
                className="glow-top absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <h3 className="relative font-display text-lg font-semibold text-foreground">
                {industry.name}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">
                {industry.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
