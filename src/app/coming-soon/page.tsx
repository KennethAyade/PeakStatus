import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: `${siteConfig.name} — ${siteConfig.tagline}. Our new site is launching soon.`,
  // The gate is temporary; keep it out of search results.
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}
