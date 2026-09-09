<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- bmad:context -->
<!-- Verified 2026-09-09 against 1931c492044931db11ba9cfc08570e77d565d02f. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## sahamali.dev

Next.js 16 portfolio site using TypeScript, React, the App Router, and static export. Application routes live under `src/app/`; shared styling and legacy browser integrations are served from `public/assets/`.

## Policy

- Do not commit changes unless the user explicitly requests a commit.

## Where things are

- Shared shell, metadata, navigation, global stylesheets, and scripts: `src/app/layout.tsx`
- Main portfolio page: `src/app/page.tsx`
- Additional routes: `src/app/*/page.tsx`
- Static assets, themes, and legacy integrations: `public/assets/`
- BMAD planning and implementation artifacts: `_bmad-output/`

## Running and verifying

- `next.config.ts` uses static export; run `npm run build` and deploy the generated `out/` directory.
- Do not use `next start` as the deployment target for this static-export configuration.

## Conventions that differ from defaults

- Preserve the DOM IDs and classes consumed by legacy scripts in `public/assets/js/`, including navigation, animation, gallery, and contact-form hooks.
- Treat `src/app/layout.tsx`, `public/assets/css/`, and `public/assets/js/` as shared infrastructure: changes there can affect every route.

## Known pitfalls

- Legacy scripts initialize by querying the document globally. After changing page markup or navigation, check affected routes and preserve the expected DOM contracts.
- Static assets must be referenced from `/assets/...`, because they are served from `public/assets/`.

<!-- /bmad:context -->
