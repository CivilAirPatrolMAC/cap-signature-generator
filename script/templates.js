// templates.js

import { getVals, getType, getGradeType } from "./state.js";
import { sanitizeText } from "./formatters.js";
import { LOGO_URL } from "./constants.js";

// --- Helpers ---

function line(value) {
  return value ? `${sanitizeText(value)}<br>` : "";
}

function textLine(value) {
  return value ? `${sanitizeText(value)}\n` : "";
}

// --- Generic (HTML) Signature ---

export function buildGenericSignature() {
  const vals = getVals();
  const type = getType();
  const gradeType = getGradeType();

  const {
    name,
    grade,
    duty,
    unit,
    email,
    phone
  } = vals;

  return `
<table style="font-family: Arial, sans-serif; font-size: 12px;">
  <tr>
    <td style="padding-right:10px;">
      <img src="${LOGO_URL}" alt="CAP Logo" width="80">
    </td>
    <td>
      <strong>${sanitizeText(grade || "")} ${sanitizeText(name || "")}</strong><br>
      ${line(duty)}
      ${line(unit)}
      ${line(email)}
      ${line(phone)}
    </td>
  </tr>
</table>
`.trim();
}

// --- Plain Text Signature ---

export function buildPlainTextSignature() {
  const vals = getVals();

  const {
    name,
    grade,
    duty,
    unit,
    email,
    phone
  } = vals;

  return [
    `${sanitizeText(grade || "")} ${sanitizeText(name || "")}`,
    duty && sanitizeText(duty),
    unit && sanitizeText(unit),
    email && sanitizeText(email),
    phone && sanitizeText(phone)
  ]
    .filter(Boolean)
    .join("\n");
}

// --- Mobile-Friendly Signature ---

export function buildMobileSignature() {
  const vals = getVals();

  const {
    name,
    grade,
    duty,
    unit,
    email,
    phone
  } = vals;

  return `
<div style="font-family: Arial, sans-serif; font-size: 14px;">
  <strong>${sanitizeText(grade || "")} ${sanitizeText(name || "")}</strong><br>
  ${line(duty)}
  ${line(unit)}
  ${line(email)}
  ${line(phone)}
</div>
`.trim();
}
