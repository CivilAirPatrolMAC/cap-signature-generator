# Civil Air Patrol Email Signature Generator

Browser-based CAP signature builder that helps members create compliant email signature blocks with a live preview, copy tools, and built-in policy checks.

## Current capabilities

- Generates **three signature outputs**:
  - **Default** (rich HTML email signature)
  - **Plain Text**
  - **Abbreviated (Mobile)**
- Includes a **live preview panel** that updates as fields change.
- Provides **brand standards validation** before copying:
  - grade/title and credential checks
  - duty assignment count/order/content checks
  - adult vs cadet duty-position allowlist validation
  - restricted content checks (quotes/disclaimers, charter-number patterns, etc.)
  - official website text/URL checks
  - duplicate phone type checks
- Shows **explainable warning cards** with:
  - what is wrong
  - why it is flagged
  - how to fix it
- Supports **clipboard actions** for:
  - preview copy
  - HTML copy
  - plain text copy
  - mobile copy
- Persists form state in browser local storage so values survive reload.

## UI and workflow

The app is a single-page interface with:

- Header + navigation links to related CAP brand tools.
- Guidance panel with collapsible standards content.
- Form sections for signature type, grade/name, wing (mobile), duty assignments, contact info, and website.
- Sticky preview card with copy controls and copy status feedback.

## Tech stack

- **HTML** (`index.html`)
- **CSS** (`style.css`)
- **Vanilla JavaScript** (`script.js`)
- **Static image assets** (`favicon.png`, `LogoNoAux.png`, `LogoWithAux.png`)

No framework, no build pipeline, no backend required.

## File map

- `index.html` — page structure, form controls, preview container, and script/style includes.
- `style.css` — layout, theme tokens, responsive behavior, controls/cards/callouts, and preview styling.
- `script.js` — app state, renderers, validators, field behavior, local storage sync, and clipboard handlers.
- `adultdutyassignments.js` — adult duty assignment allowlist dataset.
- `cadetdutyassignments.js` — cadet duty assignment allowlist dataset.

## Run locally

### Option 1: open directly

Open `index.html` in a browser.

### Option 2 (recommended): local static server

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Developer notes

- Keep validation and generation logic consistent with CAP brand standards.
- Preserve exact duty-assignment naming in the allowlist files to avoid false validation failures.
- If you update form fields, also update:
  - state defaults
  - local storage serialization/deserialization
  - signature rendering functions
  - validation logic
  - copy output behavior

## Manual QA checklist

Before shipping changes, verify:

1. Signature type switch updates UI and output correctly.
2. Preview updates immediately when each form field changes.
3. Validation warnings appear for invalid input and clear after fixes.
4. Copy buttons are disabled while warnings are present and enabled when compliant.
5. All copy modes produce expected content.
6. Desktop and mobile layouts remain usable.
