"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Reveal from "./ui/Reveal";
import { galleryCategories, type GalleryImage } from "@/data/site";

/**
 * Full-work gallery.
 *
 * Renders each category as a masonry grid (CSS columns) so mixed-orientation
 * work — landscape logos next to portrait social posts — sits together without
 * cropping. Clicking any piece opens an accessible lightbox that can be paged
 * through with the arrow keys or on-screen controls, and closed with Escape,
 * the backdrop, or the close button.
 */

// Flatten every image into one list so the lightbox can page across categories,
// and record where each category starts so the grid can map local → global index.
const allImages: GalleryImage[] = galleryCategories.flatMap((c) => c.images);
const categoryOffsets: number[] = (() => {
  const offsets: number[] = [];
  let acc = 0;
  for (const c of galleryCategories) {
    offsets.push(acc);
    acc += c.images.length;
  }
  return offsets;
})();

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpenIndex((v) =>
        v === null ? v : (v + dir + allImages.length) % allImages.length,
      ),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    // Lock background scroll while the lightbox is open.
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  return (
    <>
      {galleryCategories.map((cat, ci) => (
        <section key={cat.id} className="mt-16 first:mt-0">
          <Reveal className="flex max-w-2xl flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {cat.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {cat.description}
            </p>
          </Reveal>

          <div className="mt-8 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
            {cat.images.map((img, ii) => (
              <GalleryThumb
                key={img.src}
                img={img}
                onOpen={() => setOpenIndex(categoryOffsets[ci] + ii)}
              />
            ))}
          </div>
        </section>
      ))}

      {openIndex !== null && (
        <Lightbox
          img={allImages[openIndex]}
          index={openIndex}
          total={allImages.length}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </>
  );
}

function GalleryThumb({
  img,
  onOpen,
}: {
  img: GalleryImage;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${img.title}`}
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-ink-soft transition-colors hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <Image
        src={img.src}
        alt={img.title}
        width={img.width}
        height={img.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/80">
          {img.tag}
        </span>
      </span>
    </button>
  );
}

function Lightbox({
  img,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  img: GalleryImage;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const arrow =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl text-white/90 transition-colors hover:border-white/40 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 p-4 backdrop-blur-sm sm:p-6"
    >
      {/* Top bar: caption + close */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4"
      >
        <p className="text-sm text-muted">
          <span className="text-foreground">{img.title}</span>
          <span className="ml-2 text-muted/60">
            {index + 1} / {total}
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={arrow}
        >
          ✕
        </button>
      </div>

      {/* Stage */}
      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4 sm:gap-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous"
          className={arrow}
        >
          ‹
        </button>

        <figure
          onClick={(e) => e.stopPropagation()}
          className="flex min-h-0 items-center justify-center"
        >
          <Image
            src={img.src}
            alt={img.title}
            width={img.width}
            height={img.height}
            sizes="90vw"
            className="max-h-[78vh] w-auto rounded-lg object-contain"
            priority
          />
        </figure>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next"
          className={arrow}
        >
          ›
        </button>
      </div>
    </div>
  );
}
