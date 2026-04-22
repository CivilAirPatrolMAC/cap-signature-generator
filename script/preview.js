// preview.js

import {
  buildGenericSignature,
  buildPlainTextSignature,
  buildMobileSignature
} from "./templates.js";

import { SIGNATURE_FORMATS } from "./constants.js";

function byId(id) {
  return document.getElementById(id);
}

function getSelectedFormat() {
  const typeEl = byId("type");
  return typeEl ? typeEl.value : SIGNATURE_FORMATS.GENERIC;
}

function getSelectedPreviewMode() {
  const modeEl = byId("preview_mode");
  return modeEl ? modeEl.value : "rendered";
}

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

export function renderPreview() {
  const format = getSelectedFormat();
  const previewMode = getSelectedPreviewMode();
  const output = buildOutput(format);

  const renderedEl = byId("preview_rendered");
  const codeEl = byId("preview_code");

  if (renderedEl) {
    if (format === SIGNATURE_FORMATS.PLAINTEXT) {
      renderedEl.textContent = output;
    } else {
      renderedEl.innerHTML = output;
    }
  }

  if (codeEl) {
    codeEl.textContent = output;
  }

  if (renderedEl && codeEl) {
    if (previewMode === "code") {
      renderedEl.classList.add("hidden");
      codeEl.classList.remove("hidden");
    } else {
      renderedEl.classList.remove("hidden");
      codeEl.classList.add("hidden");
    }
  }
}
