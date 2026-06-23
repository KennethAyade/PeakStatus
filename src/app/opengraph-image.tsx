import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

// Runs on the Node.js runtime (the default). next/og works here without the
// edge sandbox's "code generation from strings disallowed" restriction.
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamically generated social share image (1200×630).
 * Uses system fonts only so it renders without network font fetches.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(60% 60% at 50% 0%, #1a1a1a 0%, #060606 70%)",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        {/* Peak mark drawn as a rotated outline square (Satori-safe) */}
        <div
          style={{
            display: "flex",
            width: 90,
            height: 90,
            border: "6px solid #ffffff",
            transform: "rotate(45deg)",
            marginBottom: 56,
            borderRadius: 8,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: 8,
          }}
        >
          PEAK STATUS
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 34,
            color: "#a3a3a3",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7a7a7a",
          }}
        >
          {siteConfig.location}
        </div>
      </div>
    ),
    { ...size },
  );
}
