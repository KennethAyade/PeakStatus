import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { processSteps } from "@/data/site";

export default function Process() {
  return (
    <Section id="process" grid>
      <SectionHeading
        eyebrow="Process"
        title="A clear path from idea to results"
        description="A simple, practical process that keeps work moving and easy to follow — from first conversation to ongoing improvement."
      />

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step, i) => (
          <Reveal key={step.step} delay={i * 70} as="li">
            <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25">
              <span className="font-display text-3xl font-semibold text-chrome">
                {step.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
