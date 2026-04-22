// ui.js

import { updateVals } from "./state.js";
import { renderPreview } from "./preview.js";

function byId(id) {
  return document.getElementById(id);
}

function getValue(id) {
  const el = byId(id);
  return el ? el.value : "";
}

function collectFormValues() {
  return {
    name: getValue("name"),
    grade: getValue("grade"),
    duty: getValue("title"),
    unit: getValue("wing"),
    email: getValue("website_text"),
    phone: getValue("phone_1")
  };
}

function handleFormChange() {
  updateVals(collectFormValues());
  renderPreview();
}

export function initUI() {
  const form = byId("sig-form");
  const typeEl = byId("type");
  const previewModeEl = byId("preview_mode");

  updateVals(collectFormValues());

  if (form) {
    form.addEventListener("input", handleFormChange);
    form.addEventListener("change", handleFormChange);
  }

  if (typeEl) {
    typeEl.addEventListener("change", renderPreview);
  }

  if (previewModeEl) {
    previewModeEl.addEventListener("change", renderPreview);
  }
}
