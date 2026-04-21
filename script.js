(function () {
  let type = "generic";
  let gradeType = "Adult";

  const LOGO_URL =
    "https://cdn-assets-cloud.frontify.com/s3/frontify-cloud-files-us/eyJwYXRoIjoiZnJvbnRpZnlcL2ZpbGVcLzkzRHN5eTR0WmI3MXIydXRpY2FzLnBuZyJ9:frontify:joUZ3kIja1IrzlO8KaboqI-LUNdOHqpimmyV8BsveqA?width=2400";

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

  function ensureValidationBox() {
    let box = $("validation_warnings");
    if (box) return box;

    const form = $("sig-form");
    if (!form) return null;

    box = document.createElement("div");
    box.id = "validation_warnings";
    box.style.margin = "0 0 18px";
    box.style.padding = "14px 16px";
    box.style.border = "1px solid #f5c2c7";
    box.style.borderLeft = "4px solid rgb(186, 12, 47)";
    box.style.borderRadius = "8px";
    box.style.background = "#fff5f5";
    box.style.display = "none";

    form.parentNode.insertBefore(box, form);
    return box;
  }

  /* ============================
     NEW: EXPLANATION LAYER
  ============================ */

  function explainValidationWarnings(items) {
    return items.map((item) => {
      if (item === '"SM" is not a grade and should not be used.') {
        return {
          title: '“SM” is not an approved grade abbreviation.',
          why: "CAP signature blocks must use an approved grade abbreviation.",
          fix: 'Replace “SM” with a correct grade such as “Capt.” or “Maj.”'
        };
      }

      if (item === "Organize duty assignments from highest to lowest organizational level.") {
        return {
          title: "Duty assignments are out of order.",
          why: "Assignments should be listed from higher organizational level to lower.",
          fix: "Move the higher-level assignment above the lower-level one."
        };
      }

      if (
        item ===
        "Do not list certifications, accomplishments, quotes, or other non-duty information in the duty assignment lines."
      ) {
        return {
          title: "This looks like a credential or extra content.",
          why: "Only duty assignments are allowed in this section.",
          fix: "Remove certifications, awards, or quotes from the duty lines."
        };
      }

      if (item.startsWith("Adult duty assignments must use")) {
        return {
          title: "Unrecognized duty assignment.",
          why: "The system could not match this to an approved duty position.",
          fix: "Use the exact wording from eServices."
        };
      }

      if (item === "Include both Wing/Region website display text and URL, or leave both fields blank.") {
        return {
          title: "Website entry is incomplete.",
          why: "Both fields must be filled together.",
          fix: "Provide both text and URL, or clear both."
        };
      }

      return {
        title: item,
        why: "This does not match CAP signature standards.",
        fix: "Update the entry to match required formatting."
      };
    });
  }

  function renderValidationWarnings(items) {
    const box = ensureValidationBox();
    if (!box) return;

    if (!items.length) {
      box.style.display = "none";
      box.innerHTML = "";
      return;
    }

    const explained = explainValidationWarnings(items);

    let html =
      '<h3 style="margin:0 0 8px; font-size:16px; font-weight:600; color:#001489;">Brand standards review</h3>';

    html += '<div style="display:grid; gap:10px;">';

    for (const item of explained) {
      html += `
        <div style="background:#fff; border:1px solid #f0d4d8; border-radius:8px; padding:12px;">
          <div style="font-weight:700; color:#7a1020;">${sanitizeText(item.title)}</div>
          <div><strong>Why:</strong> ${sanitizeText(item.why)}</div>
          <div><strong>Fix:</strong> ${sanitizeText(item.fix)}</div>
        </div>
      `;
    }

    html += "</div>";

    box.style.display = "block";
    box.innerHTML = html;
  }

  /* ============================
     EXISTING VALIDATION LOGIC
  ============================ */

  function getValidationWarnings() {
    const warnings = [];

    const combinedName = (vals.grade + " " + vals.name).trim();

    if (/\bSM\b/i.test(combinedName)) {
      warnings.push('"SM" is not a grade and should not be used.');
    }

    const titleLines = vals.title
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (titleLines.length > 2) {
      warnings.push("You may only list two duty assignments recorded in eServices.");
    }

    if (titleLines.length >= 2) {
      const rankOrder = (line) => {
        if (/region/i.test(line)) return 4;
        if (/wing/i.test(line)) return 3;
        if (/group/i.test(line)) return 2;
        if (/squadron/i.test(line)) return 1;
        return 0;
      };

      if (rankOrder(titleLines[0]) < rankOrder(titleLines[1])) {
        warnings.push("Organize duty assignments from highest to lowest organizational level.");
      }
    }

    if (/(certification|award|quote)/i.test(vals.title)) {
      warnings.push(
        "Do not list certifications, accomplishments, quotes, or other non-duty information in the duty assignment lines."
      );
    }

    if (
      (vals.website_text && !vals.website_url) ||
      (!vals.website_text && vals.website_url)
    ) {
      warnings.push(
        "Include both Wing/Region website display text and URL, or leave both fields blank."
      );
    }

    return warnings;
  }

  /* ============================
     TEMPLATE (UNCHANGED)
  ============================ */

  const template = {
    generic: () => `<b>${vals.grade} ${vals.name}</b><br>${vals.title}`,
    plaintext: () => `${vals.grade} ${vals.name}\n${vals.title}`,
    mobile: () => `${vals.grade} ${vals.name}`
  };

  function readInputsToState() {
    vals.name = $("name").value;
    vals.grade = $("grade").value;
    vals.title = $("title").value;
    vals.website_text = $("website_text").value;
    vals.website_url = $("website_url").value;
  }

  function updateOutputAndPreview() {
    readInputsToState();

    const warnings = getValidationWarnings();
    renderValidationWarnings(warnings);

    const out = template[type]();

    $("preview_rendered").innerHTML = out;
    $("preview_code").textContent = out;
  }

  function init() {
    $("name").addEventListener("input", updateOutputAndPreview);
    $("grade").addEventListener("change", updateOutputAndPreview);
    $("title").addEventListener("input", updateOutputAndPreview);

    updateOutputAndPreview();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
