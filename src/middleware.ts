import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { shouldShowComingSoon } from "@/config/site-mode";

/**
 * Coming Soon gate.
 *
 * When the maintenance toggle is on AND the request is not local, every route
 * is rewritten to /coming-soon. A rewrite (not a redirect) keeps the original
 * URL in the address bar and avoids shipping the real site to the browser.
 *
 * When the toggle is off, shouldShowComingSoon() returns false and this is a
 * pass-through no-op.
 */

// Paths that stay reachable while gated — the page itself, the brand assets it
// renders, and the metadata image/SEO routes.
const ALLOWLIST = new Set<string>([
  "/coming-soon",
  "/icon.png",
  "/favicon.ico",
  "/opengraph-image",
  "/twitter-image",
  "/robots.txt",
  "/sitemap.xml",
]);

export function middleware(request: NextRequest) {
  if (!shouldShowComingSoon(request.headers.get("host"))) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (
    ALLOWLIST.has(pathname) ||
    pathname.startsWith("/brand/") ||
    pathname.startsWith("/work/")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  // Run on all routes except Next.js internals (static assets / image optimizer).
  matcher: ["/((?!_next/static|_next/image).*)"],
};
