# CLAUDE.md

`ngx-page-object-model` is an Angular library providing a base class for the Page Object Model (POM) pattern in Angular component unit tests. It is testing-framework-agnostic and published to npm as `ngx-page-object-model`.

## Monorepo layout

Nx monorepo (npm). Two projects:

- **`libs/ngx-page-object-model/`** — the published library, built with `ng-packagr`. **Has no test target** — the library's tests live in the demo app.
- **`apps/demo-app/`** — Angular demo app whose specs exercise the library. Runs on **Vitest**.

Public API is `libs/ngx-page-object-model/src/index.ts` — read it for the current exports. The core export is `PageObjectModel<T>`, an abstract base class wrapping `ComponentFixture` with typed query helpers that throw descriptive errors instead of returning `null`.

## Commands

```bash
npx nx affected -t lint test build   # full check, exactly as CI runs it (Node 24)
npx nx test demo-app                 # run the library's tests
npm run build                        # ng-packagr build + copy README/docs into dist (the release artifact)
```
