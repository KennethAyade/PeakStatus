import Image from "next/image";
import { navLinks, siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const activeSocials = siteConfig.socials.filter((s) => s.href);

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Image
              src="/brand/peak-status-secondary-transparent.png"
              alt="Peak Status"
              width={170}
              height={32}
              className="h-6 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted/70">
              {siteConfig.location}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted/60">
              Explore
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted/60">
              Get in touch
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            {activeSocials.length > 0 && (
              <div className="mt-2 flex gap-4">
                {activeSocials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-muted/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Creative &amp; digital growth, based in {siteConfig.location}.</p>
        </div>
      </div>
    </footer>
  );
}
