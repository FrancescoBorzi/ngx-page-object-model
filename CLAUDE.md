# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`ngx-page-object-model` is an Angular library that provides a base class for implementing the Page Object Model (POM) design pattern in component unit tests. It is testing-framework-agnostic (works with Jest, Vitest, Jasmine). The library is published to npm as `ngx-page-object-model`.

## Repository Structure

This is an **Nx monorepo** with two projects:

- **`libs/ngx-page-object-model/`** — The published library. Built with `ng-packagr`. Has no test target itself; tests live in the demo app.
- **`apps/demo-app/`** — Angular demo app with example components and tests that exercise the library. Uses Jest.

## Common Commands

```bash
# Build the library (production)
npm run build                    # runs: nx build ngx-page-object-model && copies README to dist

# Run all affected lint, test, and build (what CI runs)
npx nx affected -t lint test build

# Run tests for the demo app
npx nx test demo-app

# Run a single test file
npx nx test demo-app -- --testPathPattern="counter-v3"

# Lint
npx nx lint ngx-page-object-model
npx nx lint demo-app

# Serve the demo app
npx nx serve demo-app
```

## Architecture

The library exports from `libs/ngx-page-object-model/src/index.ts`:

- **`PageObjectModel<ComponentType>`** — Abstract base class. Wraps `ComponentFixture` and provides typed element query methods (`getDebugElementByCss`, `getDebugElementByTestId`, `getDebugElementByDirective`, `query`, `queryAll`, etc.). Throws descriptive errors instead of returning null.
- **`DebugHtmlElement<T>`** — Type alias for `DebugElement` with a strongly-typed `nativeElement`.
- **`getFormControlOfDebugElement`** / **`getFormGroupOfDebugElement`** — Extract reactive form controls/groups from `DebugElement` via Angular's injector.
- **`typeInElement`** — Simulates user typing by setting value and dispatching an `input` event.
- **`tickAsync`** — Zoneless replacement for `fakeAsync` `tick()`, returns a Promise.

Peer dependencies: `@angular/core`, `@angular/forms`, `@angular/platform-browser` (all `>= 9.0.0`).

## Code Style

- Prettier: `printWidth: 120`, `singleQuote: true`
- ESLint flat config (`eslint.config.cjs`) with Angular ESLint rules and Nx module boundary enforcement
- EditorConfig: 2-space indent, UTF-8, final newline

## CI

GitHub Actions (`.github/workflows/ci.yml`): Node 24, runs `npx nx affected -t lint test build` on push to main and on PRs.
