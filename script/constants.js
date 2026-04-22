// constants.js

export const LOGO_URL = "https://www.gocivilairpatrol.com/media/cms/CAP_Seal_B7742B16539E1.png";

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

export const SIGNATURE_FORMATS = {
  GENERIC: "generic",
  PLAINTEXT: "plaintext",
  MOBILE: "mobile"
};

export const DEFAULT_STATE = {
  type: MEMBER_TYPES.SENIOR,
  gradeType: GRADE_TYPES.OFFICER,
  vals: {}
};

export const FIELD_NAMES = {
  NAME: "name",
  GRADE: "grade",
  DUTY: "duty",
  UNIT: "unit",
  EMAIL: "email",
  PHONE: "phone"
};
