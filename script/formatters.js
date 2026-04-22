// formatters.js

// --- Basic Sanitization ---

export function sanitizeText(value) {
  if (value == null) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .trim();
}

// --- Whitespace Cleanup ---

export function normalizeWhitespace(value) {
  if (value == null) return "";

  return String(value)
    .replace(/\s+/g, " ")
    .trim();
}

// --- Empty-safe string ---

export function clean(value) {
  if (value == null) return "";
  return String(value).trim();
}

// --- Email formatting ---

export function normalizeEmail(value) {
  return normalizeWhitespace(value).toLowerCase();
}

// --- Phone Formatting (display) ---

export function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return clean(value);
}

// --- Phone for tel: links ---

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

// --- Line helpers (HTML) ---

export function joinHtmlLines(lines) {
  return lines.filter(Boolean).join("<br>");
}

// --- Line helpers (plaintext) ---

export function joinTextLines(lines) {
  return lines.filter(Boolean).join("\n");
}
