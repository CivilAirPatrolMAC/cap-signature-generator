// ui.js

import { setType, setGradeType, updateVals } from "./state.js";
import { renderPreview } from "./preview.js";

// --- Helpers ---

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

// --- Event Wiring ---

function handleInputChange(e) {
  const { name, value } = e.target;

  if (!name) return;

  updateVals({ [name]: value });
  renderPreview();
}

function handleTypeChange(e) {
  const newType = e.target.value;

  setType(newType);
  renderPreview();
}

function handleGradeTypeChange(e) {
  const newGradeType = e.target.value;

  setGradeType(newGradeType);
  renderPreview();
}

// --- Public Init ---

export function initUI() {
  // All text/standard inputs
  $all("input, textarea, select").forEach((el) => {
    el.addEventListener("input", handleInputChange);
  });

  // Type selector (senior/cadet)
  const typeEl = $("#type");
  if (typeEl) {
    typeEl.addEventListener("change", handleTypeChange);
  }

  // Grade type selector (officer, etc.)
  const gradeTypeEl = $("#gradeType");
  if (gradeTypeEl) {
    gradeTypeEl.addEventListener("change", handleGradeTypeChange);
  }
}
