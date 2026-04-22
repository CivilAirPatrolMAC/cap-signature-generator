// preview.js

import { getState } from "./state.js";
import { buildGenericSignature, buildPlainTextSignature, buildMobileSignature } from "./templates.js";

// --- Helpers ---

function $(selector) {
  return document.querySelector(selector);
}

function getSelectedFormat() {
  const checked = document.querySelector('input[name="format"]:checked');
  return checked ? checked.value : "generic";
}

function getOutputForFormat(state, format) {
  switch (format) {
    case "plaintext":
      return buildPlainTextSignature(state);
    case "mobile":
      return buildMobileSignature(state);
    case "generic":
    default:
      return buildGenericSignature(state);
  }
}

// --- Public Render ---

export function renderPreview() {
  const state = getState();
  const format = getSelectedFormat();
  const output = getOutputForFormat(state, format);

  const codeOutputEl = $("#output");
  const previewEl = $("#preview");

  if (codeOutputEl) {
    codeOutputEl.value = output;
  }

  if (previewEl) {
    if (format === "plaintext") {
      previewEl.textContent = output;
    } else {
      previewEl.innerHTML = output;
    }
  }
}
