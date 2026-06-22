"use client";

import { useState } from "react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import { contact, siteConfig } from "@/data/site";

/**
 * Contact section.
 *
 * The form is intentionally backend-free for now: on submit it opens the
 * visitor's email client with a pre-filled message (a mailto fallback).
 *
 * TODO (before launch): Replace `handleSubmit` with a real submission flow.
 * Options:
 *   - A Next.js Route Handler (src/app/api/contact/route.ts) + email service
 *     such as Resend, Nodemailer, or Postmark.
 *   - A hosted form provider such as Formspree, Web3Forms, or Basin.
 * Also confirm siteConfig.email is the real, monitored inbox.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `New inquiry from ${form.name || "website visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-white/35";

  return (
    <Section id="contact" grid>
      <div className="glow-top pointer-events-none absolute inset-x-0 top-0 h-40" />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: CTA copy */}
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            <span aria-hidden className="h-px w-6 bg-white/30" />
            {contact.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-[2.6rem]">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {contact.subtext}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95"
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

          {/* Placeholder note — visible reminder that the inbox is not final. */}
          <p className="mt-4 text-xs text-muted/60">
            Placeholder email address — to be replaced with the official Peak
            Status inbox.
          </p>
        </Reveal>

        {/* Right: form UI (mailto-based, no backend yet) */}
        <Reveal delay={100}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            aria-label="Contact form"
          >
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                  placeholder="you@business.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us about your business and goals…"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.02] active:scale-95"
              >
                {contact.cta.label}
              </button>

              <p className="text-center text-xs text-muted/60">
                This opens your email app. A connected form is coming soon.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
