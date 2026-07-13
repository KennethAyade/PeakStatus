"use client";

import { useState } from "react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import { contact, siteConfig } from "@/data/site";

/**
 * Contact section.
 *
 * Submissions go straight from the browser to Web3Forms (which emails the
 * studio inbox). Client-side on purpose: Web3Forms sits behind Cloudflare,
 * which blocks server-to-server calls from Vercel's datacenter IPs — a real
 * browser passes the challenge. A hidden honeypot drops bots; if the key is
 * missing or the call fails, we fall back to the visitor's email client
 * (mailto:) so a message is never lost.
 */
type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [botcheck, setBotcheck] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const mailtoHref = () => {
    const subject = encodeURIComponent(
      `New inquiry from ${form.name || "website visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  // Public by design — Web3Forms keys are meant to be embedded client-side.
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // Honeypot: bots fill this hidden field. Pretend success, send nothing.
    if (botcheck.trim() !== "") {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    // No key configured → fall back to the visitor's email client.
    if (!accessKey) {
      window.location.href = mailtoHref();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New inquiry from ${form.name} — Peak Status`,
          from_name: "Peak Status Website",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
          </div>

          {/* Direct contact details */}
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${siteConfig.email}`}
              className="w-fit text-muted transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="w-fit text-muted transition-colors hover:text-foreground"
            >
              {siteConfig.phone}
            </a>
          </div>
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

              {/* Honeypot — hidden from users, catches bots. */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={botcheck}
                onChange={(e) => setBotcheck(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "success"
                    ? "Sent ✓"
                    : contact.cta.label}
              </button>

              <p
                aria-live="polite"
                className="text-center text-xs text-muted/70"
              >
                {status === "success" ? (
                  <span className="text-foreground">
                    Thanks! We&apos;ve received your message and will get back to
                    you soon.
                  </span>
                ) : status === "error" ? (
                  <span>
                    Something went wrong.{" "}
                    <a
                      href={mailtoHref()}
                      className="text-foreground underline underline-offset-2"
                    >
                      Email us directly
                    </a>{" "}
                    instead.
                  </span>
                ) : (
                  "We usually reply within a day."
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
