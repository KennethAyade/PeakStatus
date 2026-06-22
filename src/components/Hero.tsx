import Image from "next/image";
import { hero, siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background accents */}
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]" />
      <div aria-hidden className="glow-top absolute inset-x-0 top-0 h-[60vh]" />

      {/* Faint peak submark watermark */}
      <Image
        aria-hidden
        src="/brand/peak-status-submark-transparent.png"
        alt=""
        width={900}
        height={900}
        priority
        className="pointer-events-none absolute left-1/2 top-1/2 w-[120vw] max-w-[900px] -translate-x-1/2 -translate-y-[58%] opacity-[0.05] sm:opacity-[0.07]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 text-center sm:px-8">
        {/* Logo mark */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <Image
            src="/brand/peak-status-submark-transparent.png"
            alt="Peak Status logo"
            width={120}
            height={120}
            priority
            className="h-16 w-auto sm:h-20"
          />
        </div>

        {/* Eyebrow */}
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {hero.eyebrow}
        </span>

        {/* Headline */}
        <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {hero.headlineLead}{" "}
          <span className="text-chrome">{hero.headlineHighlight}</span>
        </h1>

        {/* Supporting copy */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {hero.subtext}
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={hero.primaryCta.href}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-white/30 hover:bg-white/[0.06] sm:w-auto"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        {/* Location line */}
        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted/70">
          {siteConfig.location}
        </p>
      </div>
    </section>
  );
}
