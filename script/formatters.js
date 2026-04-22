// formatters.js

export function sanitizeText(value) {
  if (value == null) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .trim();
}

export function normalizeWhitespace(value) {
  if (value == null) return "";

  return String(value)
    .replace(/\s+/g, " ")
    .trim();
}

export function stripEmpty(value) {
  if (value == null) return "";
  return String(value).trim();
}

export function normalizeEmail(value) {
  return normalizeWhitespace(value).toLowerCase();
}

export function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return stripEmpty(value);
}

export function normalizeTelLink(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return "";
}

export function joinHtmlLines(lines) {
  return lines.filter(Boolean).join("<br>");
}

export function joinTextLines(lines) {
  return lines.filter(Boolean).join("\n");
}
