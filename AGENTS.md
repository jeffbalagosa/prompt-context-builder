<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# AGENTS.md

## Overview

**Prompt Context Builder** is a static web app that helps users design structured AI prompts using HTML, CSS, and vanilla JavaScript.
It runs fully in the browser with no build process or dependencies.
Primary goal: provide reusable templates for clear, context-rich prompts.

**Core stack:**

* HTML5
* CSS3 (animations, gradients, ARIA accessibility)
* JavaScript (ES6, DOM manipulation, Clipboard API)

---

## Setup & Execution

### Local Run

No install or server required:

```bash
open index.html
```

or double-click it locally.

### Development Notes

* All assets load locally — no CDN or npm packages.
* Browser-native features only (Clipboard API, DOM selectors).
* Designed for offline operation.

---

## Directory Structure

```
.
├── index.html        # Main UI
├── app.js            # App logic, presets, DOM events
├── style.css         # Layout, animation, accessibility
├── README.md         # Human documentation
├── .gitignore        # Ignores tempDevDocs/
└── repomix.config.json  # Repomix configuration
```

---

## Agent Task Guidelines

### Installation & Environment

* Do **not** perform `npm install`, `pnpm install`, or any global package installs.
* No virtual environments required (`.venv` not applicable).
* Operate entirely on static files within this repo.

### Editing / Building

* Modify only `app.js`, `style.css`, or `index.html` when implementing features.
* Follow accessibility and ARIA standards.
* Ensure clipboard operations remain compatible with `navigator.clipboard`.

### Testing

Manual testing only:

1. Open `index.html` in browser.
2. Verify preset loading, field population, and “Copy Prompt” button behavior.
3. Confirm no console errors.

### Linting

This project has **no lint configuration**.
If an agent applies linting:

* Use default ESLint or Prettier conventions.
* Do not create new config files without explicit instruction.

---

## Coding Conventions

* Use **vanilla ES6 syntax** — no frameworks or imports.
* Functions should be pure and self-contained.
* Prefer `const` and `let` over `var`.
* Maintain ARIA roles and keyboard navigation compatibility.
* Keep selectors and IDs stable (e.g., `#presetSelect`, `.status-message`).

---

## Automation & Safety Protocols

* **No `git` operations** — cloning, committing, or pushing is disallowed.
* **No network fetches or API calls** — all content must remain offline.
* **Never modify system or global configs.**
* Preserve all file paths and relative imports.
* When copying text to clipboard, always use browser-native APIs.

---

## Security Rules

* Never execute shell commands or scripts.
* Avoid any modification to `.gitignore` or `repomix.config.json`.
* Do not add third-party libraries or remote dependencies.
* Treat clipboard access as sensitive: do not alter `navigator.clipboard` behavior.

---

## Reproducibility

To reproduce environment:

1. Clone repository.
2. Open `index.html` locally.
3. Test all presets (Career Coach, UX Writer, Health Coach, Language Tutor, Startup Advisor).
4. Confirm each populates the correct fields and formats.

---

## References

* [README.md](./README.md) — Human overview and manual instructions.
* [repomix.config.json](./repomix.config.json) — Packaging config for AI analysis.
* [style.css](./style.css) — Accessibility and theme details.

---

## Summary

This repository is a self-contained web application.
Agents should focus on **maintaining deterministic UI behavior**, **avoiding global operations**, and **ensuring offline reproducibility**.
