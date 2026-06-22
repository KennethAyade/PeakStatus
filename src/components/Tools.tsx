import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { creativeTools, technicalCapabilitiesNote } from "@/data/site";

export default function Tools() {
  return (
    <Section id="tools">
      <SectionHeading
        eyebrow="Capabilities"
        title="The tools we work with"
        description="A practical, modern toolkit for creative production and marketing — applied where each project actually needs it."
      />

      <Reveal className="mt-10">
        <ul className="flex flex-wrap gap-3">
          {creativeTools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
            >
              {tool}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          {technicalCapabilitiesNote}
        </p>
      </Reveal>
    </Section>
  );
}
