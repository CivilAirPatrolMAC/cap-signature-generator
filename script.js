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

  function explainValidationWarnings(items) {
    return items.map((item) => {
      if (item === '"SM" is not a grade and should not be used.') {
        return {
          title: '“SM” is not an approved grade abbreviation.',
          why: "CAP signature blocks should use an approved grade abbreviation instead of “SM.”",
          fix: 'Replace “SM” with the correct grade, such as “Capt.” or “Maj.”'
        };
      }

      if (
        item ===
        'Do not include professional titles or post-nominals such as "MD," "PhD," "CFI," etc.'
      ) {
        return {
          title: "Professional titles or certifications were detected.",
          why: "Credentials such as academic, medical, aviation, or professional certifications are not authorized in CAP signature blocks.",
          fix: "Remove titles like MD, PhD, CFI, CPA, PMP, and similar credentials from the name line."
        };
      }

      if (item === "Post-nominal credentials are not authorized in CAP signature blocks.") {
        return {
          title: "This looks like a credential after the name.",
          why: "Post-nominal letters are not part of the authorized CAP signature format.",
          fix: "Remove credentials after the member’s name."
        };
      }

      if (
        item ===
        "Appending ',CAP' is not required if the content is clearly showing Civil Air Patrol in its capacity. Civil Air Patrol is already prominently displayed in the signature block"
      ) {
        return {
          title: '“, CAP” was added unnecessarily.',
          why: "Civil Air Patrol is already identified in the signature block, so adding “, CAP” is redundant.",
          fix: 'Remove “, CAP” from the name or duty line.'
        };
      }

      if (item === "You may only list two duty assignments recorded in eServices.") {
        return {
          title: "Too many duty assignments were entered.",
          why: "Only up to two duty assignments may be listed, and both must be recorded in eServices.",
          fix: "Remove extra lines and keep only the two approved duty assignments you want displayed."
        };
      }

      if (item === "Organize duty assignments from highest to lowest organizational level.") {
        return {
          title: "Duty assignments are out of order.",
          why: "Assignments should be listed from the higher organizational level to the lower one.",
          fix: "Move the higher-level assignment above the lower-level assignment, such as Region above Wing or Wing above Group."
        };
      }

      if (
        item ===
        "Do not list certifications, accomplishments, quotes, or other non-duty information in the duty assignment lines."
      ) {
        return {
          title: "A duty line contains something other than a duty assignment.",
          why: "Duty lines should only list actual duty assignments, not awards, qualifications, accomplishments, or quotes.",
          fix: "Remove any extra wording and keep only the approved duty assignment."
        };
      }

      if (
        item ===
        "No disclaimer, FOUO statement, or motivational quote may be appended unless required by law or mission program requirements."
      ) {
        return {
          title: "A disclaimer or quote was detected.",
          why: "Signature blocks should not include disclaimers or motivational language unless specifically required.",
          fix: "Remove the disclaimer or quote unless it is required for a mission or legal purpose."
        };
      }

      if (
        item ===
        'Encampment duty assignments may only be listed if the duty position is "Encampment Commander" or "Commandant of Cadets."'
      ) {
        return {
          title: "This encampment duty assignment is not authorized.",
          why: 'Only “Encampment Commander” or “Commandant of Cadets” may be listed as encampment duty assignments.',
          fix: "Remove the encampment line unless it uses one of those approved positions."
        };
      }

      if (item.startsWith('Adult duty assignments must use an approved duty position. Invalid entry: "')) {
        const invalidEntry = item.match(/Invalid entry: "(.*)"$/)?.[1] || "this entry";
        return {
          title: "An adult duty assignment is not recognized.",
          why: "Adult members must use an approved duty position from the allowed list.",
          fix: `Check the wording of "${invalidEntry}" and replace it with the exact approved duty title.`
        };
      }

      if (item.startsWith('Cadet duty assignments must use an approved duty position. Invalid entry: "')) {
        const invalidEntry = item.match(/Invalid entry: "(.*)"$/)?.[1] || "this entry";
        return {
          title: "A cadet duty assignment is not recognized.",
          why: "Cadet members must use an approved duty position from the allowed list.",
          fix: `Check the wording of "${invalidEntry}" and replace it with the exact approved cadet duty title.`
        };
      }

      if (item === "Include both Wing/Region website display text and URL, or leave both fields blank.") {
        return {
          title: "The website entry is incomplete.",
          why: "The website section only works when both the display text and the URL are provided together.",
          fix: "Either fill in both fields or clear both fields."
        };
      }

      if (item === "Website display text must reference an official Wing or Region website.") {
        return {
          title: "The website label does not look official.",
          why: "The display text should identify an official Wing or Region website, not a personal or social profile.",
          fix: 'Use text such as “Texas Wing” or “Southwest Region.”'
        };
      }

      if (item === "Link URL must point to an official Civil Air Patrol or .gov website (e.g., .cap.gov or .gov).") {
        return {
          title: "The website URL is not an approved CAP or .gov link.",
          why: "Only official Civil Air Patrol or .gov websites should be included in the signature block.",
          fix: "Use an official URL such as https://txwg.cap.gov."
        };
      }

      return {
        title: item,
        why: "This entry does not match the current CAP signature standard enforced by the generator.",
        fix: "Review the flagged content and revise it to match the required format."
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
      '<h3 style="margin:0 0 8px; font-size:16px; line-height:1.3; font-weight:600; color:#001489;">Brand standards review</h3>';
    html +=
      '<p style="margin:0 0 12px; font-size:14px; line-height:1.45; color:#333;">Here is what was flagged and how to fix it.</p>';

    html += '<div style="display:grid; gap:10px;">';

    for (const item of explained) {
      html += `
        <div style="background:#ffffff; border:1px solid #f0d4d8; border-radius:8px; padding:12px 14px;">
          <div style="font-weight:700; color:#7a1020; margin:0 0 6px; line-height:1.35;">
            ${sanitizeText(item.title)}
          </div>
          <div style="margin:0 0 6px; line-height:1.45; color:#333;">
            <strong>Why:</strong> ${sanitizeText(item.why)}
          </div>
          <div style="line-height:1.45; color:#333;">
            <strong>Fix:</strong> ${sanitizeText(item.fix)}
          </div>
        </div>
      `;
    }

    html += "</div>";

    box.style.display = "block";
    box.innerHTML = html;
  }

  function setCopyStatus(message, kind) {
    const el = $("copy_status");
    if (!el) return;

    el.textContent = message || "";
    el.className = "copy-status";

    if (!message) return;

    el.classList.add("show");
    el.classList.add(kind === "error" ? "copy-status--error" : "copy-status--success");
  }

  function updateCopyButtons(isLocked) {
    ["copy_preview_btn", "copy_html_btn", "copy_plain_btn", "copy_mobile_btn"].forEach((id) => {
      const btn = $(id);
      if (btn) btn.disabled = !!isLocked;
    });
  }

  async function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    ta.style.pointerEvents = "none";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();

    const ok = document.execCommand("copy");
    document.body.removeChild(ta);

    if (!ok) throw new Error("Copy command failed");
  }

  async function copyHtmlAndTextToClipboard(html, text) {
    if (navigator.clipboard && window.isSecureContext && window.ClipboardItem) {
      const item = new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" })
      });
      await navigator.clipboard.write([item]);
      return;
    }

    await copyTextToClipboard(text);
  }

  async function handleCopy(copyType) {
    const warnings = getValidationWarnings();
    if (warnings.length) {
      setCopyStatus("Fix the brand standard warnings before copying.", "error");
      return;
    }

    let output = "";
    let label = "";

    if (copyType === "generic") {
      output = template.generic();
      label = "HTML";
    } else if (copyType === "plaintext") {
      output = template.plaintext();
      label = "plain text";
    } else if (copyType === "mobile") {
      output = template.mobile();
      label = "mobile";
    } else {
      setCopyStatus("Unknown copy type.", "error");
      return;
    }

    try {
      await copyTextToClipboard(output);
      setCopyStatus(`Copied ${label} signature.`, "success");
    } catch (err) {
      setCopyStatus("Copy failed. Try again or copy from the preview manually.", "error");
    }
  }

  async function copyPreviewAsShown() {
    const warnings = getValidationWarnings();
    if (warnings.length) {
      setCopyStatus("Fix the brand standard warnings before copying.", "error");
      return;
    }

    const mode = $("preview_mode") ? $("preview_mode").value : "rendered";
    const rendered = $("preview_rendered");
    const code = $("preview_code");

    try {
      if (mode === "code") {
        await copyTextToClipboard(code ? (code.textContent || "") : "");
        setCopyStatus("Copied preview exactly as shown in Code mode.", "success");
        return;
      }

      if (type === "generic") {
        const html = rendered ? (rendered.innerHTML || "") : "";
        const text = rendered ? (rendered.innerText || rendered.textContent || "") : "";
        await copyHtmlAndTextToClipboard(html, text);
        setCopyStatus("Copied preview as shown.", "success");
        return;
      }

      const visibleText = rendered ? (rendered.innerText || rendered.textContent || "") : "";
      await copyTextToClipboard(visibleText);
      setCopyStatus("Copied preview as shown.", "success");
    } catch (err) {
      setCopyStatus("Copy failed. Try again or copy manually from the preview.", "error");
    }
  }

  function normalizeDutyAssignmentName(s) {
    return String(s || "")
      .replace(/&/gi, "and")
      .replace(/\s+/g, " ")
      .trim();
  }

  function extractDutyPosition(line) {
    const clean = String(line || "").trim();
    if (!clean) return "";

    const preferredSet =
      gradeType === "Cadet"
        ? CADET_ALLOWED_DUTY_ASSIGNMENTS
        : ADULT_ALLOWED_DUTY_ASSIGNMENTS;

    const secondarySet =
      gradeType === "Cadet"
        ? ADULT_ALLOWED_DUTY_ASSIGNMENTS
        : CADET_ALLOWED_DUTY_ASSIGNMENTS;

    for (const allowed of preferredSet) {
      const escaped = allowed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(escaped + "$", "i");
      if (re.test(clean)) return allowed;
    }

    for (const allowed of secondarySet) {
      const escaped = allowed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(escaped + "$", "i");
      if (re.test(clean)) return allowed;
    }

    const noComma = clean.replace(/,/g, " ");
    const pieces = noComma.split(/\s{2,}/).filter(Boolean);
    if (pieces.length > 1) return normalizeDutyAssignmentName(pieces[pieces.length - 1]);

    return normalizeDutyAssignmentName(clean);
  }

  function getValidationWarnings() {
    const warnings = [];

    const gradeValue = String(vals.grade || "").trim();
    const nameValue = String(vals.name || "").trim();
    const titleValue = String(vals.title || "").trim();
    const websiteTextValue = String(vals.website_text || "").trim();
    let websiteUrlValue = String(vals.website_url || "").trim();

    const combinedName = (gradeValue + " " + nameValue).trim();

    if (/\bSM\b/i.test(combinedName)) {
      warnings.push('"SM" is not a grade and should not be used.');
    }

    if (/\b(MD|DO|PhD|EdD|DBA|DNP|PharmD|DDS|DMD|OD|JD|LLM|MA|MS|MBA|MPA|MEd|BA|BS|BBA|RN|NP|PA-C|CPA|CFA|PMP|CFM|SHRM-CP|SHRM-SCP|CISSP|PE|CFI|CFII|ATP|A&P|Esq\.?|FACHE|FRCP|EMT-B|EMT-A|EMT-P|EMT-LP|AEM|CEM)\b/i.test(combinedName)) {
      warnings.push('Do not include professional titles or post-nomials such as "MD," "PhD," "CFI," etc.');
    }

    if (/,\s*[A-Z]{2,}/.test(combinedName)) {
      warnings.push("Post-nominal credentials are not authorized in CAP signature blocks.");
    }

    if (/,\s*CAP\b/i.test(combinedName) || /,\s*CAP\b/i.test(titleValue)) {
      warnings.push("Appending ',CAP' is not required if the content is clearly showing Civil Air Patrol in its capacity. Civil Air Patrol is already prominently displayed in the signature block");
    }

    const titleLines = titleValue
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const hasNational = titleLines.some((line) => /\bnational\b/i.test(line));

    if (titleLines.length > 2) {
      warnings.push("You may only list two duty assignments recorded in eServices.");
    }

    if (titleLines.length >= 2) {
      const rankOrder = (line) => {
        if (/national|nhq/i.test(line)) return 5;
        if (/region/i.test(line)) return 4;
        if (/wing/i.test(line)) return 3;
        if (/group/i.test(line)) return 2;
        if (/squadron|sq\./i.test(line)) return 1;
        return 0;
      };

      if (rankOrder(titleLines[0]) < rankOrder(titleLines[1])) {
        warnings.push("Organize duty assignments from highest to lowest organizational level.");
      }
    }

    if (/(certified|certification|award|graduate|distinguished|quote|")/i.test(titleValue)) {
      warnings.push("Do not list certifications, accomplishments, quotes, or other non-duty information in the duty assignment lines.");
    }

    if (/(FOUO|for official use only|sensitive but unclassified|classified|motivat)/i.test(titleValue)) {
      warnings.push("No disclaimer, FOUO statement, or motivational quote may be appended unless required by law or mission program requirements.");
    }

    for (const line of titleLines) {
      const mentionsEncampment = /\bencampment\b/i.test(line);
      const allowedEncampmentRole = /\b(encampment commander|commandant of cadets|encampment commandant of cadets)\b/i.test(line);

      if (mentionsEncampment && !allowedEncampmentRole) {
        warnings.push('Encampment duty assignments may only be listed if the duty position is "Encampment Commander" or "Commandant of Cadets."');
        break;
      }
    }

/*    if (gradeType === "Adult" && !hasNational) {
      for (const line of titleLines) {
        const extractedDuty = extractDutyPosition(line);
        if (!extractedDuty || !ADULT_ALLOWED_DUTY_ASSIGNMENTS.has(extractedDuty)) {
          warnings.push('Adult duty assignments must use an approved duty position. Invalid entry: "' + line + '"');
          break;
        }
      }
    }

    if (gradeType === "Cadet" && !hasNational) {
      const allowedCadetNormalized = new Set(
        Array.from(CADET_ALLOWED_DUTY_ASSIGNMENTS).map((duty) =>
          normalizeDutyAssignmentName(duty).toLowerCase()
        )
      );

      for (const line of titleLines) {
        const extractedDuty = extractDutyPosition(line);
        const normalizedExtracted = normalizeDutyAssignmentName(extractedDuty).toLowerCase();

        if (!normalizedExtracted || !allowedCadetNormalized.has(normalizedExtracted)) {
          warnings.push('Cadet duty assignments must use an approved duty position. Invalid entry: "' + line + '"');
          break;
        }
      }
    } */

    if ((websiteTextValue && !websiteUrlValue) || (!websiteTextValue && websiteUrlValue)) {
      warnings.push("Include both Wing/Region website display text and URL, or leave both fields blank.");
    }

    if (websiteTextValue) {
      const invalidText = /(my website|personal|portfolio|linkedin|facebook|instagram|twitter)/i.test(websiteTextValue);
      if (invalidText) {
        warnings.push("Website display text must reference an official Wing or Region website.");
      }
    }

    if (websiteUrlValue) {
      if (!/^https?:\/\//i.test(websiteUrlValue)) {
        websiteUrlValue = "https://" + websiteUrlValue;
        vals.website_url = websiteUrlValue;
        const websiteInput = $("website_url");
        if (websiteInput) websiteInput.value = websiteUrlValue;
      }

      const isValidGovDomain = /^https?:\/\/([a-z0-9-]+\.)*(cap\.gov|gov)(\/|$)/i.test(websiteUrlValue);

      if (!isValidGovDomain) {
        warnings.push("Link URL must point to an official Civil Air Patrol or .gov website (e.g., .cap.gov or .gov).");
      }
    }

    return warnings;
  }

  function hasBlockingWarnings() {
    return getValidationWarnings().length > 0;
  }

  function setCopyLockState(isLocked) {
    const rendered = $("preview_rendered");
    const code = $("preview_code");

    if (!rendered || !code) return;

    if (isLocked) {
      rendered.style.userSelect = "none";
      code.style.userSelect = "none";
      rendered.style.webkitUserSelect = "none";
      code.style.webkitUserSelect = "none";
      rendered.style.opacity = "0.55";
      code.style.opacity = "0.55";
      rendered.style.pointerEvents = "none";
      code.style.pointerEvents = "none";
      rendered.setAttribute("aria-disabled", "true");
      code.setAttribute("aria-disabled", "true");
      rendered.title = "Fix brand standard warnings before copying.";
      code.title = "Fix brand standard warnings before copying.";
    } else {
      rendered.style.userSelect = "";
      code.style.userSelect = "";
      rendered.style.webkitUserSelect = "";
      code.style.webkitUserSelect = "";
      rendered.style.opacity = "";
      code.style.opacity = "";
      rendered.style.pointerEvents = "";
      code.style.pointerEvents = "";
      rendered.removeAttribute("aria-disabled");
      code.removeAttribute("aria-disabled");
      rendered.removeAttribute("title");
      code.removeAttribute("title");
    }
  }

  function blockCopyWhenInvalid(e) {
    if (!hasBlockingWarnings()) return;
    e.preventDefault();
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

  function autoCorrectDutyAssignments(value) {
    let v = String(value || "");

    v = v.replace(/\bAssistant\s+DCS\.?\s+([^\n]+)/gi, function (_, role) {
      return "Assistant Deputy Chief of Staff, " + role.trim();
    });

    v = v.replace(/\bDCS\.?\s+([^\n]+)/gi, function (_, role) {
      return "Deputy Chief of Staff, " + role.trim();
    });

    return v;
  }

  function showTitleWarning() {
    const el = $("title_warning");
    if (!el) return;
    el.classList.add("show");
    window.clearTimeout(showTitleWarning._t);
    showTitleWarning._t = window.setTimeout(() => {
      el.classList.remove("show");
    }, 2200);
  }

  function limitTitleLines() {
    const textarea = $("title");
    if (!textarea) return false;

    const lines = textarea.value.split(/\r?\n/);

    if (lines.length > 2) {
      textarea.value = lines.slice(0, 2).join("\n");
      showTitleWarning();
      return true;
    }
    return false;
  }

  const template = {
    generic: () => {
      const name = sanitizeText(vals.name || "Jane Doe");
      const grade = sanitizeText(vals.grade || "");
      const cadetPrefix = gradeType === "Cadet" ? "Cadet " : "";

      const gradePart = grade ? `${grade} ` : "";
      const displayName = `${cadetPrefix}${gradePart}${name}`;

      const titleRaw = vals.title || "";
      const titleHtml = sanitizeText(titleRaw)
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "")
        .slice(0, 2)
        .join("<br />");

      const wText = sanitizeText(vals.website_text || "");
      const wUrl = sanitizeText(vals.website_url || "");

      const phoneRows = [
        { t: vals.phone_1_type, n: vals.phone_1 },
        { t: vals.phone_2_type, n: vals.phone_2 },
        { t: vals.phone_3_type, n: vals.phone_3 }
      ]
        .filter((p) => String(p.n || "").trim().length > 0)
        .map((p) => {
          const shown = sanitizeText(p.n);
          const tel = normalizeTel(p.n);
          const href = tel ? `tel:${tel}` : "";
          return `<p style="font-size: 12px; line-height: 12px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #000000; font-weight: normal; margin: 0 0 5px;">
            (${sanitizeText(p.t)}) <a href="${href}" style="color: #000000; text-decoration: none;">${shown}</a>
          </p>`;
        })
        .join("");

      return `<!DOCTYPE html>
<html><body><br />
  <h1 style="font-size: 12px; line-height: 12px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #001871; font-weight: bold; margin: 0 0 5px;">
    ${displayName}
  </h1>

  ${titleHtml ? `<h2 style="font-size: 12px; line-height: 14px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #000000; font-weight: normal; margin: 0 0 5px;">
    ${titleHtml}
  </h2>` : ""}

  ${phoneRows}

  <p style="font-size: 12px; line-height: 12px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0 0 5px;">
    <a href="https://www.GoCivilAirPatrol.com" style="color: #000000; text-decoration: underline;">GoCivilAirPatrol.com</a>
  </p>

  ${(wText && wUrl) ? `<p style="font-size: 12px; line-height: 12px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0 0 5px;">
    <a href="${wUrl}" style="color: #000000; text-decoration: underline;">${wText}</a>
  </p>` : ""}

  <a href="https://www.GoCivilAirPatrol.com">
    <img src="${LOGO_URL}"
         style="display:block; border:0; outline:none; text-decoration:none; width:200px; max-width:200px; height:auto;"
         alt="Civil Air Patrol Logo" />
  </a>

  <p style="font-size: 12px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-style: italic; line-height: 14px; margin: 0 0 5px;">
    Volunteers serving America's communities, saving lives, and shaping futures.
  </p>
</body></html>`;
    },

    plaintext: () => {
      const cadetPrefix = gradeType === "Cadet" ? "Cadet " : "";
      const gradePart = vals.grade ? `${vals.grade} ` : "";
      const name = vals.name || "Jane Doe";

      const lines = [];
      lines.push(`${cadetPrefix}${gradePart}${name}`.trim());

      if (vals.title && vals.title.trim()) {
        vals.title
          .split(/\r?\n/)
          .filter((line) => line.trim() !== "")
          .slice(0, 2)
          .forEach((line) => lines.push(line.trim()));
      }

      lines.push("");

      const phones = [
        { t: vals.phone_1_type, n: vals.phone_1 },
        { t: vals.phone_2_type, n: vals.phone_2 },
        { t: vals.phone_3_type, n: vals.phone_3 }
      ].filter((p) => String(p.n || "").trim());

      for (const p of phones) {
        lines.push(`(${p.t}) ${String(p.n).trim()}`);
      }

      lines.push("");
      lines.push("https://www.GoCivilAirPatrol.com");

      if (vals.website_url && vals.website_url.trim()) {
        lines.push(vals.website_url.trim());
      }

      return lines.join("\n");
    },

    mobile: () => {
      const cadetPrefix = gradeType === "Cadet" ? "Cadet " : "";
      const gradePart = vals.grade ? `${vals.grade} ` : "";
      const name = vals.name || "Jane Doe";
      const wing = vals.wing && vals.wing.trim() ? `, ${vals.wing.trim().toUpperCase()}` : "";

      return `${cadetPrefix}${gradePart}${name}${wing}\nCivil Air Patrol`;
    }
  };

  function gateGrades() {
    const gradeSelect = $("grade");
    const options = Array.from(gradeSelect.querySelectorAll("option"));

    for (const opt of options) {
      const isCadet = opt.getAttribute("data-cadet") === "true";
      const isAdult = opt.getAttribute("data-adult") === "true";
      const isAny = opt.getAttribute("data-any") === "true";

      const isCourtesy =
        opt.value === "Mr." ||
        opt.value === "Ms." ||
        opt.value === "Mrs.";

      if (gradeType === "Paid") {
        opt.disabled = !(isAny || isCourtesy);
      } else if (gradeType === "Adult") {
        if (isCourtesy || isAny) {
          opt.disabled = false;
        } else {
          opt.disabled = isCadet;
        }
      } else if (gradeType === "Cadet") {
        if (isCourtesy) {
          opt.disabled = true;
        } else if (isAny) {
          opt.disabled = false;
        } else {
          opt.disabled = isAdult;
        }
      }
    }

    const selected = gradeSelect.selectedOptions[0];
    if (selected && selected.disabled) {
      if (gradeType === "Cadet") {
        gradeSelect.value = "Airman";
      } else if (gradeType === "Paid") {
        gradeSelect.value = "";
      } else {
        gradeSelect.value = "2nd Lt.";
      }
    }
  }

  function applyTypeUI() {
    const isMobile = type === "mobile";
    const isPlain = type === "plaintext";

    $("f_wing").classList.toggle("hidden", !isMobile);
    $("f_title").classList.toggle("hidden", isMobile);
    $("f_phone").classList.toggle("hidden", isMobile);
    $("f_website").classList.toggle("hidden", isMobile);

    $("website_text").disabled = isPlain;

    if (isMobile) $("title_warning").classList.remove("show");
  }

  function initGuidelinesToggle() {
    const toggle = $("guidelines_toggle");
    const content = $("guidelines_content");

    if (!toggle || !content) return;

    const icon = toggle.querySelector(".callout-toggle__icon");

    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      const nextExpanded = !isExpanded;

      toggle.setAttribute("aria-expanded", String(nextExpanded));
      content.classList.toggle("is-collapsed", !nextExpanded);

      if (icon) {
        icon.textContent = nextExpanded ? "−" : "+";
      }
    });
  }

  function readInputsToState() {
    vals.grade = $("grade").value;

    const nm = $("name").value.trim();
    vals.name = nm ? nm : "Jane Doe";

    vals.wing = $("wing").value.trim();
    vals.title = $("title").value;

    vals.phone_1_type = $("phone_1_type").value;
    vals.phone_1 = $("phone_1").value.trim();

    vals.phone_2_type = $("phone_2_type").value;
    vals.phone_2 = $("phone_2").value.trim();

    vals.phone_3_type = $("phone_3_type").value;
    vals.phone_3 = $("phone_3").value.trim();

    vals.website_text = $("website_text").value.trim();
    vals.website_url = $("website_url").value.trim();
  }

  function updateOutputAndPreview() {
    readInputsToState();

    const warnings = getValidationWarnings();
    renderValidationWarnings(warnings);
    setCopyLockState(warnings.length > 0);
    updateCopyButtons(warnings.length > 0);

    const out = template[type]();

    $("preview_rendered").innerHTML =
      type === "generic"
        ? out
        : `<div style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.45;">${sanitizeText(out)}</div>`;

    $("preview_code").textContent = out;

    const mode = $("preview_mode").value;
    $("preview_rendered").classList.toggle("hidden", mode !== "rendered");
    $("preview_code").classList.toggle("hidden", mode !== "code");
  }

  function initPhoneFormatting() {
    ["phone_1", "phone_2", "phone_3"].forEach((id) => {
      const el = $(id);
      el.addEventListener("input", () => {
        autoFormatPhoneInput(el);
        updateOutputAndPreview();
      });
      el.addEventListener("blur", () => {
        autoFormatPhoneInput(el);
        updateOutputAndPreview();
      });
    });
  }

  function initCopyBlocking() {
    const rendered = $("preview_rendered");
    const code = $("preview_code");

    if (rendered) {
      rendered.addEventListener("copy", blockCopyWhenInvalid);
      rendered.addEventListener("cut", blockCopyWhenInvalid);
    }

    if (code) {
      code.addEventListener("copy", blockCopyWhenInvalid);
      code.addEventListener("cut", blockCopyWhenInvalid);
    }

    document.addEventListener("copy", (e) => {
      const active = document.activeElement;
      const selection = window.getSelection ? window.getSelection() : null;
      const selectedText = selection ? String(selection) : "";

      const insidePreview =
        (active && (active.id === "preview_rendered" || active.id === "preview_code")) ||
        (selection &&
          selection.anchorNode &&
          ((rendered && rendered.contains(selection.anchorNode)) ||
            (code && code.contains(selection.anchorNode))));

      if (insidePreview && hasBlockingWarnings() && selectedText) {
        e.preventDefault();
      }
    });
  }

  function initCopyButtons() {
    const previewBtn = $("copy_preview_btn");
    const htmlBtn = $("copy_html_btn");
    const plainBtn = $("copy_plain_btn");
    const mobileBtn = $("copy_mobile_btn");

    if (previewBtn) {
      previewBtn.addEventListener("click", copyPreviewAsShown);
    }

    if (htmlBtn) {
      htmlBtn.addEventListener("click", () => handleCopy("generic"));
    }

    if (plainBtn) {
      plainBtn.addEventListener("click", () => handleCopy("plaintext"));
    }

    if (mobileBtn) {
      mobileBtn.addEventListener("click", () => handleCopy("mobile"));
    }
  }

  function init() {
    type = $("type").value;
    gradeType = $("grade_type").value;

    gateGrades();
    applyTypeUI();

    limitTitleLines();
    ["phone_1", "phone_2", "phone_3"].forEach((id) => autoFormatPhoneInput($(id)));
    initCopyBlocking();
    initCopyButtons();
    initGuidelinesToggle();
    updateOutputAndPreview();

    $("type").addEventListener("change", () => {
      type = $("type").value;
      applyTypeUI();
      setCopyStatus("", "");
      updateOutputAndPreview();
    });

    $("grade_type").addEventListener("change", () => {
      gradeType = $("grade_type").value;
      gateGrades();
      setCopyStatus("", "");
      updateOutputAndPreview();
    });

    $("grade").addEventListener("change", () => {
      setCopyStatus("", "");
      updateOutputAndPreview();
    });

    $("title").addEventListener("input", () => {
      const el = $("title");
      const corrected = autoCorrectDutyAssignments(el.value);

      if (el.value !== corrected) {
        el.value = corrected;
      }

      limitTitleLines();
      setCopyStatus("", "");
      updateOutputAndPreview();
    });

    $("title").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const lines = this.value.split(/\r?\n/);
        if (lines.length >= 2) e.preventDefault();
      }
    });

    const inputs = [
      "name",
      "wing",
      "phone_1_type",
      "phone_2_type",
      "phone_3_type",
      "website_text",
      "website_url"
    ];

    for (const id of inputs) {
      const el = $(id);
      if (!el) continue;
      el.addEventListener("input", () => {
        setCopyStatus("", "");
        updateOutputAndPreview();
      });
      el.addEventListener("blur", updateOutputAndPreview);
      el.addEventListener("change", updateOutputAndPreview);
    }

    initPhoneFormatting();

    $("preview_mode").addEventListener("change", () => {
      setCopyStatus("", "");
      updateOutputAndPreview();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
