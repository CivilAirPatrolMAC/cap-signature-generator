// ui.js

import { updateVals } from "./state.js";
import { renderPreview } from "./preview.js";

function byId(id) {
  return document.getElementById(id);
}

function getValue(id) {
  const el = byId(id);
  return el ? el.value.trim() : "";
}

function formatPhoneInput(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
}

function limitTitleLines() {
  const titleEl = byId("title");
  const warningEl = byId("title_warning");

  if (!titleEl) return;

  const lines = titleEl.value.split("\n");
  const trimmedLines = lines.slice(0, 2);

  if (lines.length > 2) {
    titleEl.value = trimmedLines.join("\n");
    if (warningEl) warningEl.style.display = "block";
  } else {
    if (warningEl) warningEl.style.display = "none";
  }
}

function collectFormValues() {
  return {
    name: getValue("name"),
    grade: getValue("grade"),
    duty: getValue("title"),
    unit: getValue("wing"),
    email: "",
    phone: getValue("phone_1"),
    websiteText: getValue("website_text"),
    websiteUrl: getValue("website_url"),
    phone2: getValue("phone_2"),
    phone3: getValue("phone_3"),
    phone1Type: getValue("phone_1_type"),
    phone2Type: getValue("phone_2_type"),
    phone3Type: getValue("phone_3_type"),
    gradeType: getValue("grade_type"),
    signatureType: getValue("type")
  };
}

function handleFormChange() {
  limitTitleLines();
  updateVals(collectFormValues());
  renderPreview();
}

function initPhoneFormatting() {
  ["phone_1", "phone_2", "phone_3"].forEach((id) => {
    const el = byId(id);
    if (!el) return;

    el.addEventListener("input", () => {
      el.value = formatPhoneInput(el.value);
      handleFormChange();
    });
  });
}

function initGuidelinesToggle() {
  const toggleBtn = byId("guidelines_toggle");
  const content = byId("guidelines_content");

  if (!toggleBtn || !content) return;

  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    content.classList.toggle("hidden", expanded);

    const icon = toggleBtn.querySelector(".callout-toggle__icon");
    if (icon) {
      icon.textContent = expanded ? "+" : "−";
    }
  });
}

function initPreviewMode() {
  const previewModeEl = byId("preview_mode");
  if (!previewModeEl) return;

  previewModeEl.addEventListener("change", renderPreview);
}

function initSignatureType() {
  const typeEl = byId("type");
  if (!typeEl) return;

  typeEl.addEventListener("change", handleFormChange);
}

function initFormListeners() {
  const form = byId("sig-form");
  if (!form) return;

  form.addEventListener("input", handleFormChange);
  form.addEventListener("change", handleFormChange);
}

export function initUI() {
  initFormListeners();
  initPhoneFormatting();
  initGuidelinesToggle();
  initPreviewMode();
  initSignatureType();

  limitTitleLines();
  updateVals(collectFormValues());
  renderPreview();
}
