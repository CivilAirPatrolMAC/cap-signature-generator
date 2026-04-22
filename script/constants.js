// constants.js

export const LOGO_URL = "./LogoNoAux.png";

export const SIGNATURE_FORMATS = {
  GENERIC: "generic",
  PLAINTEXT: "plaintext",
  MOBILE: "mobile"
};

export const MEMBER_TYPES = {
  SENIOR: "senior",
  CADET: "cadet"
};

export const GRADE_TYPES = {
  OFFICER: "officer",
  NCO: "nco",
  CADET_OFFICER: "cadet-officer",
  CADET_NCO: "cadet-nco"
};

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

export const FIELD_NAMES = {
  NAME: "name",
  GRADE: "grade",
  DUTY: "duty",
  UNIT: "unit",
  EMAIL: "email",
  PHONE: "phone"
};
