// clipboard.js

function setCopyStatus(message, isError = false) {
  const el = document.querySelector("#copyStatus");
  if (!el) return;

  el.textContent = message;
  el.style.color = isError ? "red" : "green";

  setTimeout(() => {
    el.textContent = "";
  }, 2000);
}

// --- Plain text copy ---

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    setCopyStatus("Copied!");
  } catch (err) {
    console.error(err);
    setCopyStatus("Copy failed", true);
  }
}

// --- HTML + Plaintext copy (best for email clients) ---

export async function copyHtml(html, textFallback) {
  try {
    const blobHtml = new Blob([html], { type: "text/html" });
    const blobText = new Blob([textFallback], { type: "text/plain" });

    const item = new ClipboardItem({
      "text/html": blobHtml,
      "text/plain": blobText
    });

    await navigator.clipboard.write([item]);

    setCopyStatus("Copied!");
  } catch (err) {
    console.error(err);
    setCopyStatus("Copy failed", true);
  }
}

// --- Copy from preview as rendered ---

export async function copyPreview() {
  const previewEl = document.querySelector("#preview");

  if (!previewEl) {
    setCopyStatus("Preview not found", true);
    return;
  }

  const html = previewEl.innerHTML;
  const text = previewEl.innerText;

  return copyHtml(html, text);
}

// --- Copy from code output box ---

export async function copyFromOutput() {
  const outputEl = document.querySelector("#output");

  if (!outputEl) {
    setCopyStatus("Output not found", true);
    return;
  }

  return copyText(outputEl.value);
}

// --- Wire buttons ---

export function initClipboardUI() {
  const copyBtn = document.querySelector("#copyBtn");
  const copyPreviewBtn = document.querySelector("#copyPreviewBtn");

  if (copyBtn) {
    copyBtn.addEventListener("click", copyFromOutput);
  }

  if (copyPreviewBtn) {
    copyPreviewBtn.addEventListener("click", copyPreview);
  }
}
