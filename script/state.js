// state.js

// Internal state object
const state = {
  type: "senior",        // "senior" | "cadet"
  gradeType: "officer",  // adjust if you support more types
  vals: {}               // form values (name, email, phone, etc.)
};

// --- Getters ---

export function getState() {
  return state;
}

export function getType() {
  return state.type;
}

export function getGradeType() {
  return state.gradeType;
}

export function getVals() {
  return state.vals;
}

// --- Setters ---

export function setType(newType) {
  state.type = newType;
}

export function setGradeType(newGradeType) {
  state.gradeType = newGradeType;
}

export function updateVals(updates) {
  state.vals = {
    ...state.vals,
    ...updates
  };
}

export function setVal(key, value) {
  state.vals[key] = value;
}

// --- Initialization ---

export function initializeState() {
  // If you later want to hydrate from localStorage or defaults,
  // this is the place to do it.

  state.type = "senior";
  state.gradeType = "officer";
  state.vals = {};
}
