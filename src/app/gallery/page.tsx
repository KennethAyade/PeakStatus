import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import ChatWidget from "@/components/ChatWidget";
import Reveal from "@/components/ui/Reveal";
import { galleryIntro } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the full collection of creative work from the Peak Status team — brand identity, logo design, and social media content.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
          {/* Faint geometric grid, matching the homepage section treatment */}
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]"
          />
          <div className="glow-top pointer-events-none absolute inset-x-0 top-0 h-40" />

          <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal className="flex max-w-2xl flex-col gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                <span aria-hidden className="h-px w-6 bg-white/30" />
                {galleryIntro.eyebrow}
              </span>
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                {galleryIntro.title}
              </h1>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {galleryIntro.description}
              </p>
            </Reveal>

            <div className="mt-14">
              <Gallery />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
