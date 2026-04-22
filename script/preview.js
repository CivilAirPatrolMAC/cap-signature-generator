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

// --- Output Selection ---

function buildOutput(format) {
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
  const output = buildOutput(format);

  const previewEl = $("#preview");
  const outputEl = $("#output");

  // Update textarea/code view
  if (outputEl) {
    outputEl.value = output;
  }

  // 🚨 THIS IS THE CRITICAL PART FOR IMAGE RENDERING
  if (previewEl) {
    if (format === SIGNATURE_FORMATS.PLAINTEXT) {
      previewEl.textContent = output; // plain text only
    } else {
      previewEl.innerHTML = output;   // ✅ REQUIRED for <img> to render
    }
  }
}
