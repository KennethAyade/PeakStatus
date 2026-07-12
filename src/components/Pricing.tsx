import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { pricing, siteConfig, hero } from "@/data/site";

/**
 * Pricing / packages. Rendered only when siteConfig.showPricing is true,
 * so the whole section can be toggled off from one flag in src/data/site.ts.
 */
export default function Pricing() {
  if (!siteConfig.showPricing) return null;

  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow={pricing.eyebrow}
        title={pricing.title}
        description="Flexible starting points that we shape around your goals. These are guides, not fixed quotes."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pricing.packages.map((pkg, i) => (
          <Reveal
            key={pkg.name}
            delay={(i % 3) * 70}
            className={pkg.wide ? "md:col-span-2 lg:col-span-3" : ""}
          >
            <article
              className={`relative flex h-full flex-col rounded-2xl border p-7 transition-colors sm:p-8 ${
                pkg.featured
                  ? "border-white/30 bg-white/[0.05]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              {pkg.wide && (
                <span className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink">
                  All-in-one
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-foreground">
                {pkg.name}
              </h3>
              <p className="mt-3 font-display text-2xl font-semibold text-chrome">
                {pkg.price}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {pkg.description}
              </p>
              <ul
                className={`mt-6 flex-1 gap-3 border-t border-white/10 pt-6 ${
                  pkg.wide
                    ? "grid sm:grid-cols-2 lg:grid-cols-4"
                    : "flex flex-col"
                }`}
              >
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-foreground/90"
                  >
                    <span aria-hidden className="mt-0.5 text-muted">
                      +
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={hero.primaryCta.href}
                className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95 ${
                  pkg.wide ? "sm:self-start sm:px-8" : ""
                } ${
                  pkg.featured
                    ? "bg-white text-ink"
                    : "border border-white/15 bg-white/[0.02] text-foreground hover:border-white/30"
                }`}
              >
                Get started
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 text-center text-sm text-muted/80">
          {pricing.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
