# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing site for GLG Consulting Kft. (Hungarian-language content, `lang="hu-HU"`). Plain HTML + jQuery + SCSS — no package.json, no bundler, no tests, no linter. Two pages: `index.html` (single-page layout with anchored sections) and `impresszum.html` (legal imprint). Not a git repository.

## Commands

There is no build system in the repo. The only build step is compiling SCSS to CSS; `css/main.css` (+ `main.css.map`) is the compiled output and is what the HTML actually loads. No Sass compiler is installed globally; use Dart Sass via npx:

```sh
# one-off compile
npx sass scss/main.scss css/main.css
# watch while editing
npx sass --watch scss/main.scss:css/main.css
```

Never hand-edit `css/main.css` — edit the SCSS and recompile. `scss/_functions.scss` uses `/` for division, which Dart Sass flags as deprecated (warning only).

To preview, open `index.html` directly or serve the folder, e.g. `npx serve .` or `python3 -m http.server`.

## Architecture

**SCSS** (`scss/main.scss` is the single entry point; import order matters):
fonts → variables → functions → mixins → groups (`%placeholder` selectors for `@extend`) → `reset-2020` → `layout/` → `blocks/`.
- `_variables.scss` holds the brand palette (`$color-glg-*`), font families (`Advent Pro` for titles, `Roboto Condensed` for body), and mobile-first media-query strings (`$mq-tab`, `$mq-pc_960`, … used as `@media #{$mq-…}`).
- `blocks/` uses BEM-style partials, one per page region (header, menu, header-anim, services, planing, footer). New page sections get a new partial here plus an `@import` in `main.scss`.
- Mixins emit vendor-prefixed properties (transition, transform, animation helpers) — follow that pattern rather than adding raw properties.
- Fonts are self-hosted in `fonts/` (no Google Fonts CDN).

**JS** (jQuery 2.2.4, loaded in `<head>` of both pages, no modules):
- `menu.js` — smooth-scroll for in-page `#anchor` links.
- `autoHeight.js` — equalizes heights of service titles/leads and `footer .autoHeight` above 472px width; selectors are hard-coded at the top of the file, so renaming those classes in HTML breaks it.
- `antigravity.js` — floating SVG particle animation appended into `#one`.
- Inline scripts at the bottom of the HTML pages handle: the cookie bar (`localStorage.showCookieBar`), the obfuscated contact email (base64 via `atob` into `#email-protect` — keep the address out of plain HTML), the footer year, and the back-to-top button.

**Page structure** (`index.html`): `#jumpHere` sticky wrapper → fixed `anchorMenu` → `header` → `section#one` (Szolgáltatásaink / services) → `section#two` (Rólunk / about) → `footer#three` (Kapcsolat / contact). The anchor IDs are referenced by the side menu, footer links, and `antigravity.js`. `impresszum.html` shares the same head, CSS, and JS includes, so changes to shared includes must be made in both files.

Several SEO/Open Graph meta tags in the `<head>` are still placeholders (empty `og:*`, `DC.*`, `description="Description"`, a `:::(pageData:baseHref):::` template token).
