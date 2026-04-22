// templates.js

import { getVals } from "./state.js";
import { sanitizeText, normalizePhone } from "./formatters.js";
import { LOGO_URL } from "./constants.js";

function htmlLine(value) {
  return value ? `${sanitizeText(value)}<br>` : "";
}

function buildFullName(grade, name) {
  return [sanitizeText(grade || ""), sanitizeText(name || "")]
    .filter(Boolean)
    .join(" ")
    .trim();
}

function buildContactLines(email, phone) {
  const lines = [];

  if (email) lines.push(sanitizeText(email));
  if (phone) lines.push(sanitizeText(normalizePhone(phone)));

  return lines;
}

export function buildGenericSignature() {
  const vals = getVals();

  const {
    name,
    grade,
    duty,
    unit,
    email,
    phone
  } = vals;

  const fullName = buildFullName(grade, name);
  const contactLines = buildContactLines(email, phone);

  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4;">
  <tr>
    <td style="padding-right: 12px; vertical-align: top;">
      <img src="${LOGO_URL}" alt="CAP Logo" width="80" style="display: block; border: 0;">
    </td>
    <td style="vertical-align: top; color: #000;">
      <strong>${fullName}</strong><br>
      ${htmlLine(duty)}
      ${htmlLine(unit)}
      ${contactLines.map((line) => `${line}<br>`).join("")}
    </td>
  </tr>
</table>
`.trim();
}

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

  const fullName = buildFullName(grade, name);
  const phoneDisplay = phone ? normalizePhone(phone) : "";

  return [
    fullName,
    duty ? sanitizeText(duty) : "",
    unit ? sanitizeText(unit) : "",
    email ? sanitizeText(email) : "",
    phoneDisplay ? sanitizeText(phoneDisplay) : ""
  ]
    .filter(Boolean)
    .join("\n");
}

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

  const fullName = buildFullName(grade, name);
  const contactLines = buildContactLines(email, phone);

  return `
<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #000;">
  <div style="margin-bottom: 8px;">
    <img src="${LOGO_URL}" alt="CAP Logo" width="64" style="display: block; border: 0;">
  </div>
  <strong>${fullName}</strong><br>
  ${htmlLine(duty)}
  ${htmlLine(unit)}
  ${contactLines.map((line) => `${line}<br>`).join("")}
</div>
`.trim();
}
