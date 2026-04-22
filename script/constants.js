// constants.js

export const LOGO_URL = "./LogoNoAux.png";

export const SIGNATURE_FORMATS = {
  GENERIC: "generic",
  PLAINTEXT: "plaintext",
  MOBILE: "mobile"
};

export const MEMBER_TYPES = {
  PAID: "Paid",
  ADULT: "Adult",
  CADET: "Cadet"
};

export const DEFAULT_STATE = {
  type: SIGNATURE_FORMATS.GENERIC,
  gradeType: MEMBER_TYPES.ADULT,
  vals: {
    signatureType: SIGNATURE_FORMATS.GENERIC,
    gradeType: MEMBER_TYPES.ADULT,
    grade: "",
    name: "",
    wing: "",
    duty: "",
    phone1Type: "M",
    phone1: "",
    phone2Type: "M",
    phone2: "",
    phone3Type: "M",
    phone3: "",
    websiteText: "",
    websiteUrl: ""
  }
};
