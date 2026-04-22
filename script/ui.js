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
    signatureType: getValue("type"),
    gradeType: getValue("grade_type"),
    grade: getValue("grade"),
    name: getValue("name"),
    wing: getValue("wing"),
    duty: getValue("title"),

    phone1Type: getValue("phone_1_type"),
    phone1: getValue("phone_1"),
    phone2Type: getValue("phone_2_type"),
    phone2: getValue("phone_2"),
    phone3Type: getValue("phone_3_type"),
    phone3: getValue("phone_3"),

    websiteText: getValue("website_text"),
    websiteUrl: getValue("website_url")
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

export function initUI() {
  const form = byId("sig-form");
  const typeEl = byId("type");
  const previewModeEl = byId("preview_mode");

  if (form) {
    form.addEventListener("input", handleFormChange);
    form.addEventListener("change", handleFormChange);
  }

  if (typeEl) {
    typeEl.addEventListener("change", handleFormChange);
  }

  if (previewModeEl) {
    previewModeEl.addEventListener("change", renderPreview);
  }

  initPhoneFormatting();
  initGuidelinesToggle();

  limitTitleLines();
  updateVals(collectFormValues());
  renderPreview();
}
