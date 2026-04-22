// preview.js

import {
  buildGenericSignature,
  buildPlainTextSignature,
  buildMobileSignature
} from "./templates.js";

import { SIGNATURE_FORMATS } from "./constants.js";

// --- Helpers ---

function $(selector) {
  return document.querySelector(selector);
}

function getSelectedFormat() {
  const checked = document.querySelector('input[name="format"]:checked');
  return checked ? checked.value : SIGNATURE_FORMATS.GENERIC;
}

// --- Output selector ---

function getOutput(format) {
  switch (format) {
    case SIGNATURE_FORMATS.PLAINTEXT:
      return buildPlainTextSignature();

    case SIGNATURE_FORMATS.MOBILE:
      return buildMobileSignature();

    case SIGNATURE_FORMATS.GENERIC:
    default:
      return buildGenericSignature();
  }
}

// --- Main Render Function ---

export function renderPreview() {
  const format = getSelectedFormat();
  const output = getOutput(format);

  const previewEl = $("#preview");
  const outputEl = $("#output");

  // Update code/textarea output
  if (outputEl) {
    outputEl.value = output;
  }

  // Update rendered preview
  if (previewEl) {
    if (format === SIGNATURE_FORMATS.PLAINTEXT) {
      previewEl.textContent = output; // text only
    } else {
      previewEl.innerHTML = output; // HTML (REQUIRED for image)
    }
  }
}
