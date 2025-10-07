# Repository Guidelines

## Project Structure & Module Organization
Source lives in `app/` (routing, layouts, pages) and `components/` (UI, analytics, landing sections). Shared logic sits under `lib/` and `hooks/`; reusable types are in `types/`. Database schema and generated client assets belong to `prisma/`. Public assets and favicons live in `public/`, while product docs and workflows reside in `docs/`, `tasks/`, and `prd-driven-workflow/`. Keep environment helpers such as `auth.ts` and `middleware.ts` in the repository root. Follow the established structure when adding new surface areas.

## Build, Test, and Development Commands
Use `npm run dev` to launch the Next.js dev server on port 5000. Run `npm run build` to verify production builds and `npm start` to smoke-test the compiled output locally. Lint TypeScript and JSX with `npm run lint`; fix issues before opening a pull request. Prisma migrations should be generated with `npx prisma migrate dev` and committed alongside their schema changes.

## Coding Style & Naming Conventions
This project uses strict TypeScript (`tsconfig.json`) with path alias `@/*`. Follow the two-space indentation already present in the codebase, favoring descriptive camelCase for variables and PascalCase for React components. Keep Tailwind utility classes readable by grouping layout, color, and state modifiers. ESLint extends `next/core-web-vitals`; do not bypass rules without team agreement and annotate intentional exceptions with a brief comment.

## Testing Guidelines
Testing is not yet wired up; treat linting as the enforced quality gate. When adding tests, co-locate component tests as `ComponentName.test.tsx` and integration tests under `app/(tests)/` or a dedicated `tests/` directory. Prefer Playwright or Vitest depending on scope, and document new commands in `package.json`.

## Commit & Pull Request Guidelines
Git history favors imperative, single-scope messages (for example, “Fix login error”). Reference relevant tasks or PRDs in the body when possible. Each pull request should describe the change, list user-facing impacts, and call out configuration updates. Attach before/after screenshots or console captures for UI-facing work, and request review from the owning PRD lead or module steward before merge.

## Configuration & Environment
Duplicate `env.local.example` to `.env.local` and supply analytics, OAuth, and database credentials. Never commit real secrets. If you touch authentication or database flows, verify both web and embedded webview login paths. Document any new required secrets in the example file so agents can bootstrap environments quickly.
