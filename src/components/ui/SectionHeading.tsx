import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Shared heading block: small label (eyebrow), title, and optional description.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <Reveal
      className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          <span aria-hidden className="h-px w-6 bg-white/30" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
