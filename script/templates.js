// templates.js

import { getVals } from "./state.js";
import { sanitizeText } from "./formatters.js";
import { LOGO_URL } from "./constants.js";

function buildFullName(grade, name) {
  return [sanitizeText(grade || ""), sanitizeText(name || "")]
    .filter(Boolean)
    .join(" ");
}

function buildPhoneLine(type, number) {
  if (!number) return "";
  return `${sanitizeText(type || "M")}: ${sanitizeText(number)}`;
}

export function buildGenericSignature() {
  const vals = getVals();

  const fullName = buildFullName(vals.grade, vals.name);

  const detailLines = [
    vals.duty ? sanitizeText(vals.duty).replace(/\n/g, "<br>") : "",
    buildPhoneLine(vals.phone1Type, vals.phone1),
    buildPhoneLine(vals.phone2Type, vals.phone2),
    buildPhoneLine(vals.phone3Type, vals.phone3),
    vals.websiteText && vals.websiteUrl
      ? `<a href="${sanitizeText(vals.websiteUrl)}">${sanitizeText(vals.websiteText)}</a>`
      : ""
  ].filter(Boolean);

  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4;">
  <tr>
    <td style="padding-right: 16px; vertical-align: top;">
      <img src="${LOGO_URL}" alt="CAP Logo" width="150" style="display:block; border:0;">
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
  const fullName = buildFullName(vals.grade, vals.name);

  return [
    fullName,
    vals.duty || "",
    buildPhoneLine(vals.phone1Type, vals.phone1),
    buildPhoneLine(vals.phone2Type, vals.phone2),
    buildPhoneLine(vals.phone3Type, vals.phone3),
    vals.websiteText && vals.websiteUrl ? `${vals.websiteText}: ${vals.websiteUrl}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildMobileSignature() {
  const vals = getVals();
  const fullName = buildFullName(vals.grade, vals.name);

  return `
<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #000;">
  <div style="margin-bottom: 8px;">
    <img src="${LOGO_URL}" alt="CAP Logo" width="120" style="display:block; border:0;">
  </div>
  ${fullName ? `<strong>${fullName}</strong><br>` : ""}
  ${vals.wing ? `${sanitizeText(vals.wing)}<br>` : ""}
</div>
`.trim();
}
