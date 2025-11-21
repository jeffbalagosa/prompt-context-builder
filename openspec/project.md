# Project Context

## Purpose
Prompt Context Builder is a lightweight, offline-friendly web app that helps people assemble structured AI prompts with reusable templates, guided sections (Role, Objective, Instructions, Context, Output), and one-click clipboard export.

## Tech Stack
- HTML5 for semantic layout and accessibility
- CSS3 for gradients, glassmorphism, responsive layout, and animations
- Vanilla JavaScript (ES6) for DOM state, preset management, and clipboard integration

## Project Conventions

### Code Style
Use vanilla ES6 with `const`/`let`, template literals, and pure helper functions. Favor descriptive names, inline guard clauses, and light comments only where behavior is non-obvious. Keep HTML semantic, CSS scoped with descriptive class names, and preserve ARIA attributes.

### Architecture Patterns
Single-page static application loaded via `index.html`. `app.js` owns state, preset definitions, and DOM events; `style.css` handles theming/animations; no build pipeline or modules. All assets load locally and must remain framework-free.

### Testing Strategy
Manual verification only: open `index.html` in a browser, exercise each preset, confirm field hydration, clipboard copy, responsive layout, and absence of console errors.

### Git Workflow
Default branch is `main`; feature work happens on topic branches (e.g., `feature/*`, `fix/*`). Keep commits small, descriptive (imperative mood), and scoped to UI/behavior changes without reformatting unrelated code.

## Domain Context
The UI is dedicated to crafting AI assistant prompts with consistent sections. Presets cover common personas like Career Coach, UX Writer, Health Coach, Language Tutor, and Startup Advisor. Output must stay markdown-ready and accessible for clipboard pasting into chat-based models.

## Important Constraints
Runs completely offline—no network calls, package managers, or build tooling. No third-party libraries, no git operations, and no modification of `.gitignore` or `repomix.config.json`. Maintain accessibility (ARIA, keyboard navigation) and `navigator.clipboard` compatibility.

## External Dependencies
None. Relies solely on browser-native APIs (notably `navigator.clipboard`) and local assets bundled in the repo.
