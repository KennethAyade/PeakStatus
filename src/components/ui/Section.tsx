type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Adds the faint geometric grid background accent. */
  grid?: boolean;
  "aria-label"?: string;
};

/**
 * Consistent vertical rhythm + max-width container for every page section.
 */
export default function Section({
  id,
  children,
  className = "",
  grid = false,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-20 sm:py-28 ${className}`}
      {...rest}
    >
      {grid && (
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
        />
      )}
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {children}
      </div>
    </section>
  );
}
