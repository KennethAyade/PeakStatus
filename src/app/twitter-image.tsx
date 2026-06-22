// Reuse the same generated image for Twitter/X cards.
// `runtime` is declared directly here because Next.js cannot statically detect
// a re-exported route segment config value.
export const runtime = "edge";
export { default, alt, size, contentType } from "./opengraph-image";
