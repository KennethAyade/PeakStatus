// Ambient declaration so plain CSS side-effect imports (e.g. `import "./globals.css"`)
// type-check cleanly. Next.js ships a declaration for `*.module.css` (CSS Modules)
// but not for global `*.css` imports.
declare module "*.css";
