// templates.js

import { getVals } from "./state.js";
import { sanitizeText, normalizePhone } from "./formatters.js";
import { LOGO_URL } from "./constants.js";

function buildFullName(grade, name) {
  return [sanitizeText(grade || ""), sanitizeText(name || "")]
    .filter(Boolean)
    .join(" ");
}

function buildContactLines(email, phone) {
  const lines = [];

  if (email) lines.push(sanitizeText(email));
  if (phone) lines.push(sanitizeText(normalizePhone(phone)));

  return lines;
}

export function buildGenericSignature() {
  const vals = getVals();
  const { name, grade, duty, unit, email, phone } = vals;

  const fullName = buildFullName(grade, name);
  const detailLines = [
    duty ? sanitizeText(duty) : "",
    unit ? sanitizeText(unit) : "",
    ...buildContactLines(email, phone)
  ].filter(Boolean);

  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4;">
  <tr>
    <td style="padding-right: 16px; vertical-align: top;">
      <img src="${LOGO_URL}" alt="CAP Logo" width="150" style="display: block; border: 0;">
    </td>
    <td style="vertical-align: top; color: #000;">
      ${fullName ? `<strong>${fullName}</strong><br>` : ""}
      ${detailLines.map((line) => `${line}<br>`).join("")}
    </td>
  </tr>
</table>
`.trim();
}

export function buildPlainTextSignature() {
  const vals = getVals();
  const { name, grade, duty, unit, email, phone } = vals;

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
  const { name, grade, duty, unit, email, phone } = vals;

  const fullName = buildFullName(grade, name);
  const detailLines = [
    duty ? sanitizeText(duty) : "",
    unit ? sanitizeText(unit) : "",
    ...buildContactLines(email, phone)
  ].filter(Boolean);

  return `
<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #000;">
  <div style="margin-bottom: 8px;">
    <img src="${LOGO_URL}" alt="CAP Logo" width="120" style="display: block; border: 0;">
  </div>
  ${fullName ? `<strong>${fullName}</strong><br>` : ""}
  ${detailLines.map((line) => `${line}<br>`).join("")}
</div>
`.trim();
}
