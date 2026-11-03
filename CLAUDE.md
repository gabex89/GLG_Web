# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing site for GLG Consulting Kft. (Hungarian content, `lang="hu"`). Plain HTML + vanilla ES modules + SCSS (Dart Sass). No framework, no bundler, no tests. Two pages: `index.html` (single page with anchored sections) and `impresszum.html` (legal imprint). Hosted on GitHub Pages: `.github/workflows/deploy.yml` runs on push to `main`, builds the CSS and deploys `_site/`.

## Commands

```sh
npm ci
npm run dev         # build CSS, then watch SCSS + serve on http://localhost:8080
npm run build       # compressed css/main.css only
npm run build:site  # build + copy public files into _site/ (what CI deploys)
npm run preview     # build:site, then serve _site/ on :8080
```

`css/` and `_site/` are build output and gitignored; never hand-edit `css/main.css`. `scripts/build-site.mjs` has the allowlist of published files — add new top-level pages or asset folders there or they won't be deployed.

All asset and link paths must stay relative (`./css/…`, `../images/…`, `index.html#two`): the site has to work both at a custom domain root and under a project sub-path (`<user>.github.io/<repo>/`). No leading-slash URLs.

The JS is loaded as `<script type="module">`, so pages must be served over HTTP — opening `index.html` via `file://` breaks the scripts.

## Architecture

**SCSS** — `scss/main.scss` is the only entry and uses the Sass module system (`@use`/`@forward`, no `@import`). Each partial pulls what it needs with `@use '../abstracts' as *;`.
- `abstracts/` — `_tokens.scss` (brand colors `$color-glg-*`, fonts, `$breakpoints` map) and `_mixins.scss` (`up($name)` min-width media query, `motion-ok` for prefers-reduced-motion, `flex-row`, `pill-outline`, `visually-hidden`). Abstracts emit no CSS.
- `base/` — fonts (woff2 only, generated from a list), reset, utilities (`.visually-hidden`, `.skip-link`).
- `layout/` — sticky-footer page shell, `.contentWrapper`, shared `.small-title` / `.pageTitle`.
- `blocks/` — one partial per page region/component.
- No vendor prefixes; target is evergreen browsers. Animations are gated behind `motion-ok`.
- `flex-row` sets `width: 100%`; don't include it in rules that must keep a width from a less specific selector (e.g. `footer .contentWrapper`).

**JS** — `js/main.js` imports and initialises each module in `js/modules/`; every `init*` function no-ops when its elements are absent, so both pages share one entry.
- `equal-heights.js` — equalises `.service-item-title` / `.service-item-lead` heights above 473px.
- `particles.js` — floating SVG shapes appended into `#one`; skipped under reduced motion.
- `cookie-bar.js` — localStorage key `showCookieBar` (kept for existing visitors); bar is `hidden` in HTML and revealed by JS.
- `back-to-top.js`, `contact.js` (base64-obfuscated email injected into `#email-protect` — keep the address out of the index HTML; footer year).
- Smooth scrolling is CSS `scroll-behavior`, not JS.

**Pages** — `index.html`: `#jumpHere` wrapper → side `.anchorMenu` → `header` → `main` with `section#one` (services) and `section#two` (about) → `footer#three` (contact). These IDs are referenced by the menus, footer links, and `particles.js`. In `#one` the intro (`.servicesWrapper--intro`) comes first in the DOM and is placed right of the cards with `row-reverse` on desktop. `impresszum.html` duplicates the head, footer and cookie bar (no templating), so shared markup changes must be made in both files; its footer links point to `index.html#…`.
