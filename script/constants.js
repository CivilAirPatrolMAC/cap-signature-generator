// constants.js

// --- Image Assets ---
export const LOGO_URL = "./LogoNoAux.png"; // located at repo root

// --- Signature Formats ---
export const SIGNATURE_FORMATS = {
  GENERIC: "generic",
  PLAINTEXT: "plaintext",
  MOBILE: "mobile"
};

// --- Member Types ---
export const MEMBER_TYPES = {
  SENIOR: "senior",
  CADET: "cadet"
};

// --- Grade Types ---
export const GRADE_TYPES = {
  OFFICER: "officer",
  NCO: "nco",
  CADET_OFFICER: "cadet-officer",
  CADET_NCO: "cadet-nco"
};

// --- Default State ---
export const DEFAULT_STATE = {
  type: MEMBER_TYPES.SENIOR,
  gradeType: GRADE_TYPES.OFFICER,
  vals: {
    name: "",
    grade: "",
    duty: "",
    unit: "",
    email: "",
    phone: ""
  }
};

// --- Field Names (for form inputs) ---
export const FIELD_NAMES = {
  NAME: "name",
  GRADE: "grade",
  DUTY: "duty",
  UNIT: "unit",
  EMAIL: "email",
  PHONE: "phone"
};
