import Image from "next/image";
import { siteConfig } from "@/data/site";

/**
 * Coming Soon page — uses the same visual language as the main site
 * (ink background, chrome gradient, grid + glow accents, peak submark).
 */
export default function ComingSoon() {
  const year = new Date().getFullYear();

  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 py-16">
      {/* Background accents */}
      <div
        aria-hidden
        className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]"
      />
      <div aria-hidden className="glow-top absolute inset-x-0 top-0 h-[55vh]" />
      <Image
        aria-hidden
        src="/brand/peak-status-submark-transparent.png"
        alt=""
        width={900}
        height={900}
        priority
        className="pointer-events-none absolute left-1/2 top-1/2 w-[120vw] max-w-[820px] -translate-x-1/2 -translate-y-[56%] opacity-[0.06]"
      />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        {/* Logo mark */}
        <div className="mb-8 flex justify-center">
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
          Launching Soon
        </span>

        {/* Headline — the company tagline */}
        <h1 className="mx-auto mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Your Brand, at Its <span className="text-chrome">Peak</span>
        </h1>

        {/* Supporting copy */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {`We're putting the finishing touches on our new site. ${siteConfig.name} is a Cebu-based creative and digital growth studio helping local businesses build stronger brands, better content, and smarter digital systems.`}
        </p>

        {/* Contact */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
          >
            Email Us
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Footer line */}
        <p className="mt-12 text-xs uppercase tracking-[0.2em] text-muted/70">
          {siteConfig.location} · © {year} {siteConfig.name}
        </p>
      </div>
    </main>
  );
}
