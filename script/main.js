import { initUI } from "./ui.js";
import { initializeState } from "./state.js";
import { renderPreview } from "./preview.js";

function initApp() {
  initializeState();
  initUI();
  renderPreview();
}

document.addEventListener("DOMContentLoaded", initApp);
