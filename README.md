# E2E Testing Showcase — Cypress & Playwright

![CI](https://github.com/SameerSabir/e2e-testing-showcase/actions/workflows/ci.yml/badge.svg)
![Cypress](https://img.shields.io/badge/Cypress-13-17202C?logo=cypress)
![Playwright](https://img.shields.io/badge/Playwright-1.48-2EAD33?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-blue)

A production-style end-to-end test suite for [saucedemo.com](https://www.saucedemo.com), the **same user journeys implemented twice** — once in **Cypress (JavaScript)** and once in **Playwright (TypeScript)** — so you can compare the two tools on identical ground.

Most of my client testing work sits behind NDAs, so this repository exists as a public, readable reference for how I structure real E2E suites: the Page Object Model, fixtures and typed test data, session reuse, business-logic assertions, cross-browser runs, and CI on every push.

> **Why SauceDemo?** It's a public application Sauce Labs built and maintains specifically for automation practice — so this suite runs against it without scraping, credentials, or terms-of-service concerns.

---

## What's covered

The suite tests four real user flows, with the happy path *and* the edge cases that actually break in production:

| Flow | Happy path | Edge cases |
|---|---|---|
| **Authentication** | Standard user logs in | Locked-out user, invalid credentials, missing username, missing password |
| **Inventory** | Catalogue renders, add/remove to cart | Price sort (low→high), name sort (Z→A) verified programmatically |
| **Cart** | Multiple items persist to cart | Cart survives "continue shopping" navigation |
| **Checkout** | Full purchase, order confirmed | Total = subtotal + tax validated; checkout blocked on missing postal code |

**Cypress:** 14 tests · **Playwright:** 12 specs run across **4 browser projects** (Chromium, Firefox, WebKit, mobile Chrome) = 48 executions per CI run.

---

## Patterns demonstrated

These are the things a client or lead actually looks for when they open a test repo:

- **Page Object Model** — every selector lives in one place per page, so a UI change is a one-line fix, not a find-and-replace across specs.
- **Fixtures & typed test data** — credentials and expected copy are centralised. In Playwright they're fully typed, so a typo fails at compile time, not at run time.
- **Session reuse** — Cypress uses `cy.session` (cached across specs) and Playwright uses a custom `loggedInPage` fixture, so only the auth tests click through the login form. On large suites this saves minutes per run.
- **Business-logic assertions** — the checkout test verifies the order total equals subtotal plus tax, not merely that a page rendered. That's the class of check that catches real pricing bugs.
- **Deterministic runs** — retries are enabled in CI only, never locally, so local failures surface immediately while CI absorbs genuine flake.
- **Diagnosable failures** — screenshots, video, and Playwright traces are captured on failure and uploaded as CI artifacts, so a red build can be debugged without re-running locally.
- **Cross-browser coverage** — the Playwright suite runs the same specs on three engines plus a mobile viewport.

---

## Project structure

```
e2e-testing-showcase/
├── cypress/
│   ├── e2e/                # login, inventory, cart, checkout specs (JS)
│   ├── pages/              # Page Objects
│   ├── fixtures/           # users.json, checkout.json
│   └── support/            # custom commands (cy.session login)
├── playwright/
│   ├── tests/              # login, inventory, checkout specs (TS)
│   ├── pages/              # typed Page Objects
│   └── fixtures/           # typed test data + auth fixture
├── .github/workflows/ci.yml
├── cypress.config.js
├── playwright.config.ts
└── tsconfig.json
```

---

## Running locally

**Prerequisites:** Node 18+.

```bash
npm install
```

### Cypress

```bash
npm run cy:open          # interactive runner
npm run cy:run           # headless (default browser)
npm run cy:run:chrome    # headless Chrome
npm run cy:run:firefox   # headless Firefox
```

### Playwright

```bash
npm run pw:install       # one-time: download browser binaries
npm run pw:test          # all specs, all browser projects
npm run pw:test:headed   # watch it run
npm run pw:report        # open the HTML report after a run
```

### Everything

```bash
npm test                 # Cypress then Playwright
```

---

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push and pull request to `main`, plus a nightly scheduled run to catch breakage from changes to the target site:

- **Cypress** runs headless on a Chrome + Firefox matrix.
- **Playwright** runs the full cross-browser suite and uploads its HTML report as an artifact.
- On failure, screenshots, videos and traces are uploaded for 7 days.

---

## Cypress vs Playwright — a quick honest take

Having built the same suite in both:

- **Playwright** wins on speed, native cross-browser (WebKit included), parallelism, and TypeScript ergonomics. The trace viewer is the best failure-debugging experience of any tool.
- **Cypress** wins on the interactive developer experience — the time-travel runner is unmatched for *writing* and *debugging* a test as you build it, and its docs and ecosystem are deep.

For a greenfield project today I'd usually reach for Playwright. For a team that lives in the Cypress runner day to day, the switching cost rarely pays off. Both are excellent; the right answer depends on the team, not a leaderboard.

---

## License

MIT — see [LICENSE](LICENSE). Free to fork, learn from, or adapt.

---

**Built by [Sameer Sabir](https://www.linkedin.com/in/sameer-sabir/)** — Frontend Engineer (React / Next.js) who tests what he ships.
