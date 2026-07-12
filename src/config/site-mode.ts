/**
 * Site mode / "Coming Soon" maintenance gate.
 * ---------------------------------------------------------------------------
 * MAINTENANCE_MODE is the single developer toggle.
 *
 *   false (default)  → the full website is live everywhere.
 *   true             → the DEPLOYED site (e.g. https://peak-status.vercel.app)
 *                      shows ONLY the Coming Soon page. Running the project
 *                      locally (localhost) ALWAYS shows the full site, so you
 *                      can keep building while the public URL is gated.
 *
 * To gate the live URL:   set MAINTENANCE_MODE = true, commit, and deploy.
 * To launch:              set MAINTENANCE_MODE = false, commit, and deploy.
 *
 * Preview the Coming Soon page locally any time at:
 *   http://localhost:3000/coming-soon
 * ---------------------------------------------------------------------------
 */
export const MAINTENANCE_MODE = false;

/**
 * Decides whether the Coming Soon gate should apply for a given request host.
 *
 * We key off the request host (not NODE_ENV) on purpose: `next start` locally
 * is also a "production" build, but it should still show the full site. Only a
 * non-local host (a real deployment) is ever gated.
 */
export function shouldShowComingSoon(host: string | null | undefined): boolean {
  if (!MAINTENANCE_MODE) return false;

  const h = (host ?? "").toLowerCase();
  const isLocalhost =
    h.startsWith("localhost") ||
    h.startsWith("127.0.0.1") ||
    h.startsWith("[::1]") ||
    h.startsWith("0.0.0.0");

  return !isLocalhost;
}
