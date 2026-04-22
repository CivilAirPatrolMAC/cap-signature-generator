// validation.js

import { getState } from "./state.js";
import { normalizeWhitespace } from "./formatters.js";

// If you already have these files:
import { adultDutyAssignments } from "../adultdutyassignments.js";
import { cadetDutyAssignments } from "../cadetdutyassignments.js";

// --- Duty Assignment Helpers ---

export function normalizeDutyAssignmentName(value) {
  return normalizeWhitespace(value).toLowerCase();
}

export function isValidDutyAssignment(name, type) {
  const normalized = normalizeDutyAssignmentName(name);

  const list =
    type === "cadet"
      ? cadetDutyAssignments
      : adultDutyAssignments;

  return list.some(
    (d) => normalizeDutyAssignmentName(d) === normalized
  );
}

// --- Validation Rules ---

export function getValidationWarnings() {
  const { type, vals } = getState();

  const warnings = [];

  const {
    name,
    grade,
    duty,
    email,
    phone
  } = vals;

  // --- Name ---
  if (!name || name.trim().length === 0) {
    warnings.push("Name is required.");
  }

  // --- Grade ---
  if (!grade || grade.trim().length === 0) {
    warnings.push("Grade is required.");
  }

  // --- Duty Assignment ---
  if (duty && !isValidDutyAssignment(duty, type)) {
    warnings.push("Duty assignment is not recognized.");
  }

  // --- Email ---
  if (email && !email.includes("@")) {
    warnings.push("Email appears invalid.");
  }

  // --- Phone ---
  if (phone && phone.replace(/\D/g, "").length < 10) {
    warnings.push("Phone number appears incomplete.");
  }

  return warnings;
}

// --- Human-Friendly Explanations ---

export function explainValidationWarnings(warnings) {
  return warnings.map((w) => {
    switch (w) {
      case "Duty assignment is not recognized.":
        return `${w} Use official CAP duty titles when possible.`;

      case "Email appears invalid.":
        return `${w} Ensure it follows standard format (user@domain).`;

      case "Phone number appears incomplete.":
        return `${w} Include full 10-digit number.`;

      default:
        return w;
    }
  });
}

// --- Render to UI ---

export function renderValidationWarnings() {
  const warnings = explainValidationWarnings(getValidationWarnings());

  const container = document.querySelector("#validationWarnings");

  if (!container) return;

  if (warnings.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <ul>
      ${warnings.map((w) => `<li>${w}</li>`).join("")}
    </ul>
  `;
}
