"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, hero } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="flex items-center"
          aria-label="Peak Status — home"
        >
          <Image
            src="/brand/peak-status-secondary-transparent.png"
            alt="Peak Status"
            width={150}
            height={28}
            priority
            className="h-5 w-auto sm:h-6"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={hero.primaryCta.href}
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95 md:inline-flex"
        >
          {hero.primaryCta.label}
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-white/10 bg-ink/95 backdrop-blur-md`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 py-3 text-base text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href={hero.primaryCta.href}
              onClick={() => setOpen(false)}
              className="block rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-ink"
            >
              {hero.primaryCta.label}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
