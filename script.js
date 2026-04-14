(function () {
  let type = "generic";
  let gradeType = "Adult";

  const LOGO_URL = "https://cdn-assets-cloud.frontify.com/s3/frontify-cloud-files-us/eyJwYXRoIjoiZnJvbnRpZnlcL2ZpbGVcLzkzRHN5eTR0WmI3MXIydXRpY2FzLnBuZyJ9:frontify:joUZ3kIja1IrzlO8KaboqI-LUNdOHqpimmyV8BsveqA?width=2400";

  const vals = {
    name: "Jane Doe",
    grade: "2nd Lt.",
    wing: "",
    title: "",
    phone_1_type: "M",
    phone_1: "",
    phone_2_type: "M",
    phone_2: "",
    phone_3_type: "M",
    phone_3: "",
    website_text: "",
    website_url: ""
  };

  const $ = (id) => document.getElementById(id);

  function sanitizeText(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function autoCorrectDutyAssignments(value) {
    let v = String(value || "");

    v = v.replace(/\bAssistant\s+DCS\.?\s+([^\n]+)/gi, (_, role) => {
      return "Assistant Deputy Chief of Staff, " + role.trim();
    });

    v = v.replace(/\bDCS\.?\s+([^\n]+)/gi, (_, role) => {
      return "Deputy Chief of Staff, " + role.trim();
    });

    return v;
  }

  function normalizeTel(s) {
    const raw = String(s || "").trim();
    if (!raw) return "";
    let out = "";
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      if ((ch >= "0" && ch <= "9") || (ch === "+" && out.length === 0)) out += ch;
    }
    return out;
  }

  function formatPhoneDisplay(s) {
    let digits = String(s || "").replace(/\D/g, "");
    if (!digits) return "";

    if (digits.length > 10 && digits.charAt(0) === "1") {
      digits = digits.slice(1);
    }

    digits = digits.slice(0, 10);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return digits.slice(0, 3) + "." + digits.slice(3);
    return digits.slice(0, 3) + "." + digits.slice(3, 6) + "." + digits.slice(6);
  }

  function autoFormatPhoneInput(el) {
    const formatted = formatPhoneDisplay(el.value);
    if (el.value !== formatted) el.value = formatted;
  }

  function showTitleWarning() {
    const el = $("title_warning");
    el.classList.add("show");
    window.clearTimeout(showTitleWarning._t);
    showTitleWarning._t = window.setTimeout(() => {
      el.classList.remove("show");
    }, 2200);
  }

  function limitTitleLines() {
    const textarea = $("title");
    const lines = textarea.value.split(/\r?\n/);

    if (lines.length > 2) {
      textarea.value = lines.slice(0, 2).join("\n");
      showTitleWarning();
      return true;
    }
    return false;
  }

  function getValidationWarnings() {
    const warnings = [];

    const combinedName = `${vals.grade} ${vals.name}`;

    if (/\bSM\b/i.test(combinedName)) {
      warnings.push('"SM" is not a grade and should not be used.');
    }

    if (/\b(MD|PhD|CFI)\b/i.test(combinedName)) {
      warnings.push("Do not include professional titles or post-nomials.");
    }

    const titleLines = vals.title.split(/\r?\n/).filter(Boolean);

    if (titleLines.length > 2) {
      warnings.push("You may only list two duty assignments recorded in eServices.");
    }

    if (titleLines.some(l => l.includes(","))) {
      warnings.push("Duty assignments must not include commas.");
    }

    for (const line of titleLines) {
      if (/encampment/i.test(line) && !/Encampment Commander|Commandant of Cadets/i.test(line)) {
        warnings.push("Invalid encampment duty assignment.");
      }
    }

    return warnings;
  }

  function updateOutputAndPreview() {
    readInputsToState();

    const warnings = getValidationWarnings();

    const out = template[type]();

    $("preview_rendered").innerHTML = type === "generic"
      ? out
      : `<div style="white-space: pre-wrap;">${sanitizeText(out)}</div>`;

    $("preview_code").textContent = out;
  }

  function readInputsToState() {
    vals.grade = $("grade").value;
    vals.name = $("name").value || "Jane Doe";
    vals.title = autoCorrectDutyAssignments($("title").value);
  }

  function init() {
    $("title").addEventListener("input", () => {
      const el = $("title");
      const corrected = autoCorrectDutyAssignments(el.value);
      if (el.value !== corrected) el.value = corrected;
      limitTitleLines();
      updateOutputAndPreview();
    });

    initPhoneFormatting();
    updateOutputAndPreview();
  }

  function initPhoneFormatting() {
    ["phone_1", "phone_2", "phone_3"].forEach(id => {
      const el = $(id);
      if (!el) return;
      el.addEventListener("input", () => autoFormatPhoneInput(el));
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
