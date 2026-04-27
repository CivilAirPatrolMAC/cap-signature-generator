# Civil Air Patrol Email Signature Generator

This repository contains a browser-based tool for creating Civil Air Patrol (CAP) email signature blocks. It provides a guided form, validates entries against CAP brand rules, renders a live preview, and offers copy actions for different signature formats.

## What this tool does

- Generates three signature variants:
  - **Default** (rich HTML)
  - **Plain Text**
  - **Abbreviated (Mobile)**
- Provides a **live preview** of the generated signature as users fill out the form.
- Validates content against CAP guidance (for example: grade usage, duty-assignment limits/order, approved website domains, and restricted text).
- Displays readable validation feedback with “why” and “fix” guidance.
- Supports quick copy actions for preview content and generated output.

## Project structure

- `index.html` — App markup, form controls, preview container, and script/style includes.
- `style.css` — Visual layout and component styling.
- `script.js` — Main logic for:
  - form state
  - signature generation
  - validation rules and messaging
  - copy-to-clipboard helpers
  - UI behavior
- `adultdutyassignments.js` — Approved adult duty assignment list (reference data).
- `cadetdutyassignments.js` — Approved cadet duty assignment list (reference data).
- `favicon.png`, `LogoNoAux.png`, `LogoWithAux.png` — Static image assets.

## How to run locally

This is a static front-end project (no build step required).

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Use a local web server (recommended)

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000`

## How to make changes

### 1. Update UI text or layout

- Edit **structure/content** in `index.html`.
- Edit **styling** in `style.css`.

### 2. Update generation or validation behavior

- Edit `script.js`.
- Keep changes isolated by concern where possible:
  - input collection/state updates
  - validation logic
  - render/generation functions
  - clipboard/copy actions

### 3. Update duty assignment data

- Edit the relevant list file:
  - adults: `adultdutyassignments.js`
  - cadets: `cadetdutyassignments.js`
- Preserve exact phrasing/casing for matching logic.

### 4. Test your changes manually

At minimum, verify:

- Signature type switching works.
- Preview updates immediately when fields change.
- Validation warnings appear and clear correctly.
- Copy actions still work for each format.
- Mobile/desktop layout remains usable.

## Suggested change workflow

1. Create a feature branch.
2. Make small, focused edits.
3. Run locally and test the scenarios above.
4. Commit with a clear message (for example: `docs: add project readme`).
5. Open a pull request summarizing what changed and why.

## Notes

- The app currently uses plain HTML/CSS/JavaScript and is intentionally lightweight.
- Keep the user-facing guidance aligned with current CAP brand standards when editing copy or validation behavior.
