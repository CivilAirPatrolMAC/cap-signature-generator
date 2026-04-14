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

  const ADULT_ALLOWED_DUTY_ASSIGNMENTS = new Set([
    "Encampment Commander",
    "Encampment Commandant of Cadets",
    "Director",
    "Deputy Director",
    "Deputy Chief of Staff Aerospace Education",
    "Deputy Chief of Staff, Aerospace Education",
    "External Aerospace Education Officer",
    "Internal Aerospace Education Officer",
    "Cadet Advisory Council Senior Advisor",
    "Cadet Programs Development Officer",
    "Deputy Chief of Staff Cadet Programs",
    "Deputy Chief of Staff, Cadet Programs",
    "Chaplain",
    "Character Development Instructor",
    "Chief of Staff",
    "Commander",
    "Deputy Commander",
    "Director of Development",
    "Government Relations Advisor",
    "Health Services Officer",
    "Historian",
    "NCO Advisor",
    "Senior Enlisted Leader",
    "Deputy Chief of Staff Communications",
    "Deputy Chief of Staff, Communications",
    "Counterdrug Director",
    "Emergency Services Officer",
    "Emergency Services Training Officer",
    "Director of Finance",
    "Legal Officer",
    "Director of IT",
    "Web Security Administrator",
    "Inspector General",
    "Deputy Chief of Staff Logistics",
    "Deputy Chief of Staff, Logistics",
    "Maintenance Officer",
    "Transportation Officer",
    "Director of Public Affairs",
    "CIS Officer",
    "Deputy Chief of Staff Operations",
    "Deputy Chief of Staff, Operations",
    "Homeland Security Officer",
    "Small Unmanned Aerial Systems Officer",
    "Standardization/Evaluation Officer",
    "Director of Administration",
    "Director of Personnel",
    "Director of Plans and Programs",
    "Director of Plans & Programs",
    "Deputy Chief of Staff Education and Training",
    "Deputy Chief of Staff, Education and Training",
    "Director of Safety",
    "Aerospace Education Officer",
    "Cyber Education Officer",
    "Activities Officer",
    "Drug Demand Reduction Officer",
    "Fitness Officer",
    "Squadron Leadership Officer",
    "Advisor to the Commander",
    "Deputy Commander for Cadets",
    "Deputy Commander for Seniors",
    "Squadron NCO",
    "Communications Officer",
    "Disaster Preparedness Officer",
    "Search and Rescue Officer",
    "Finance Officer",
    "Information Technologies Officer",
    "Logistics Officer",
    "Supply Officer",
    "Public Affairs Officer",
    "Recruiting Officer",
    "Alerting Officer",
    "Operations Officer",
    "Administrative Officer",
    "Personnel Officer",
    "Education and Training Officer",
    "Testing Officer",
    "Safety Officer",
    "Director of Aerospace Education",
    "Director of Cadet Programs",
    "Drug Demand Reduction Administrator",
    "Encampment Commandant for Cadets",
    "Wing Chaplain Coordinator",
    "Diversity Officer",
    "Communications Engineering Officer",
    "Communications Licensing Officer",
    "Communications Training Officer",
    "Director of Communications",
    "Counterdrug Officer",
    "Director of Emergency Services",
    "Disaster Relief Officer",
    "Director of Logistics",
    "Director of Recruiting",
    "Director of Operations",
    "Plans and Programs Officer",
    "Director of Education and Training",
    "Assistant Deputy Chief of Staff, Aerospace Education",
    "Assistant Deputy Chief of Staff, Cadet Programs",
    "Assistant Deputy Chief of Staff, Communications",
    "Assistant Deputy Chief of Staff, Logistics",
    "Assistant Deputy Chief of Staff, Operations",
    "National",
    "NHQ",
    "Assistant Deputy Chief of Staff, Education and Training"
  ]);

  const CADET_ALLOWED_DUTY_ASSIGNMENTS = new Set([
    "Cadet Activities NCO",
    "Cadet Activities Officer",
    "Cadet Administrative NCO",
    "Cadet Administrative Officer",
    "Cadet Aerospace Education NCO",
    "Cadet Aerospace Education Officer",
    "Cadet Commander",
    "Cadet Communications NCO",
    "Cadet Communications Officer",
    "Cadet Cyber Education NCO",
    "Cadet Cyber Education Officer",
    "Cadet Deputy Commander for Operations",
    "Cadet Deputy Commander for Support",
    "Cadet Element Leader",
    "Cadet Emergency Services NCO",
    "Cadet Emergency Services Officer",
    "Cadet Executive Officer",
    "Cadet Finance NCO",
    "Cadet Finance Officer",
    "Cadet First Sergeant",
    "Cadet Flight Commander",
    "Cadet Flight Sergeant",
    "Cadet Group Superintendent",
    "Cadet Historian",
    "Cadet Information Technology NCO",
    "Cadet Information Technology Officer",
    "Cadet Leadership Education NCO",
    "Cadet Leadership Education Officer",
    "Cadet Logistics NCO",
    "Cadet Logistics Officer",
    "Cadet Operations NCO",
    "Cadet Operations Officer",
    "Cadet Public Affairs NCO",
    "Cadet Public Affairs Officer",
    "Cadet Recruiting NCO",
    "Cadet Recruiting Officer",
    "Cadet Safety NCO",
    "Cadet Safety Officer",
    "Cadet Commander",
    "Cadet Deputy Commander for Operations",
    "Cadet Deputy Commander for Support",
    "Cadet Superintendent",
    "Cadet Testing NCO",
    "Cadet Testing Officer",
    "Cadet Training NCO",
    "Cadet Training Officer",
    "Cadet Advisory Council Chairperson",
    "Cadet Advisory Council Chairman",
    "Cadet Advisory Council Chairwoman",
    "Cadet Advisory Council Chair",
    "Cadet Advisory Council Vice Chair",
    "Cadet Advisory Council Recorder",
    "Primary Representative",
    "Cadet Chief of Staff",
    "Representative",
    "Assistant Representative",
    "Cadet Commander"
  ]);

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

  function renderValidationWarnings(items) {
    const box = ensureValidationBox();
    if (!box) return;

    if (!items.length) {
      box.style.display = "none";
      box.innerHTML = "";
      return;
    }

    let html = '<h3 style="margin:0 0 8px; font-size:16px; line-height:1.3; font-weight:600; color:#001489;">Brand standards review</h3>';
    html += '<ul style="margin:0 0 0 18px; padding:0; list-style:disc;">';

    for (const item of items) {
      html += '<li style="margin:6px 0; line-height:1.45;">' + sanitizeText(item) + "</li>";
    }

    html += "</ul>";
    box.style.display = "block";
    box.innerHTML = html;
  }

  function normalizeDutyAssignmentName(s) {
    return String(s || "")
      .replace(/&/gi, "and")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^Deputy Chief of Staff\s+/i, "Deputy Chief of Staff ");
  }

  function extractDutyPosition(line) {
    const clean = String(line || "").trim();
    if (!clean) return "";

    for (const allowed of ADULT_ALLOWED_DUTY_ASSIGNMENTS) {
      const escaped = allowed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(escaped + "$", "i");
      if (re.test(clean)) return allowed;
    }

    for (const allowed of CADET_ALLOWED_DUTY_ASSIGNMENTS) {
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
    const websiteUrlValue = String(vals.website_url || "").trim();

    const combinedName = (gradeValue + " " + nameValue).trim();

    if (/\bSM\b/i.test(combinedName)) {
      warnings.push('"SM" is not a grade and should not be used.');
    }

    if (/\b(MD|DO|PhD|EdD|DBA|DNP|PharmD|DDS|DMD|OD|JD|LLM|MA|MS|MBA|MPA|MEd|BA|BS|BBA|RN|NP|PA-C|CPA|CFA|PMP|CFM|SHRM-CP|SHRM-SCP|CISSP|PE|CFI|CFII|ATP|A&P|Esq\.?|FACHE|FRCP)\b/i.test(combinedName)) {
      warnings.push('Do not include professional titles or post-nomials such as "MD," "PhD," "CFI," etc.');
    }

    if (/,\s*CAP\b/i.test(combinedName) || /,\s*CAP\b/i.test(titleValue)) {
      warnings.push("Appending ',CAP' is not required if the content is clearly showing Civil Air Patrol in its capacity.");
    }

    const titleLines = titleValue
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    // Skip duty assignment validation if "National" is present
    const hasNational = titleLines.some(line => /\bnational\b/i.test(line));

    if (titleLines.length > 2) {
      warnings.push("You may only list two duty assignments recorded in eServices.");
    }

    if (titleLines.some((line) => line.includes(","))) {
      warnings.push("Duty assignments will state the name of the unit, followed by the duty position, without a comma.");
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

   if (gradeType === "Adult" && !hasNational) {
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
      duty.toLowerCase().trim()
    )
  );

  for (const line of titleLines) {
    const extractedDuty = extractDutyPosition(line);
    const normalizedExtracted = String(extractedDuty || "")
      .toLowerCase()
      .trim();

    if (!normalizedExtracted || !allowedCadetNormalized.has(normalizedExtracted)) {
      warnings.push('Cadet duty assignments must use an approved duty position. Invalid entry: "' + line + '"');
      break;
    }
  }
}

    if ((websiteTextValue && !websiteUrlValue) || (!websiteTextValue && websiteUrlValue)) {
      warnings.push("Include both Wing/Region website display text and URL, or leave both fields blank.");
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

  const template = {
    generic: () => {
      const name = sanitizeText(vals.name || "Jane Doe");
      const grade = sanitizeText(vals.grade || "");
      const cadetPrefix = gradeType === "Cadet" ? "Cadet " : "";

      const courtesyTitles = new Set(["Mr.", "Ms.", "Mrs."]);
      const isCourtesy = courtesyTitles.has(vals.grade);

      const gradePart = grade ? `${grade} ` : "";
      const displayName = `${cadetPrefix}${isCourtesy ? gradePart : gradePart}${name}`;

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

      const orgLine = "";

      return `<!DOCTYPE html>
<html><body><br />
  <h1 style="font-size: 12px; line-height: 12px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #001871; font-weight: bold; margin: 0 0 5px;">
    ${displayName}
  </h1>

  ${titleHtml ? `<h2 style="font-size: 12px; line-height: 14px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #000000; font-weight: normal; margin: 0 0 5px;">
    ${titleHtml}
  </h2>` : ""}

  <h2 style="font-size: 12px; line-height: 12px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #000000; margin: 0 0 20px;">
    ${orgLine}
  </h2>

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

    if (gradeType === "Adult") {
      if (isAny || isCourtesy) {
        opt.disabled = false;
      } else {
        opt.disabled = isCadet;
      }
    } else {
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
    gradeSelect.value = gradeType === "Cadet" ? "Airman" : "2nd Lt.";
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

  function init() {
    type = $("type").value;
    gradeType = $("grade_type").value;

    gateGrades();
    applyTypeUI();

    limitTitleLines();
    ["phone_1", "phone_2", "phone_3"].forEach((id) => autoFormatPhoneInput($(id)));
    initCopyBlocking();
    updateOutputAndPreview();

    $("type").addEventListener("change", () => {
      type = $("type").value;
      applyTypeUI();
      updateOutputAndPreview();
    });

    $("grade_type").addEventListener("change", () => {
      gradeType = $("grade_type").value;
      gateGrades();
      updateOutputAndPreview();
    });

    $("grade").addEventListener("change", updateOutputAndPreview);

    $("title").addEventListener("input", () => {
      const el = $("title");
      const corrected = autoCorrectDutyAssignments(el.value);

      if (el.value !== corrected) {
        el.value = corrected;
      }

      limitTitleLines();
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
      el.addEventListener("input", updateOutputAndPreview);
      el.addEventListener("blur", updateOutputAndPreview);
      el.addEventListener("change", updateOutputAndPreview);
    }

    initPhoneFormatting();

    $("preview_mode").addEventListener("change", updateOutputAndPreview);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
