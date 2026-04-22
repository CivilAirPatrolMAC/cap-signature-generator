// state.js

import { DEFAULT_STATE } from "./constants.js";

const state = {
  type: DEFAULT_STATE.type,
  gradeType: DEFAULT_STATE.gradeType,
  vals: { ...DEFAULT_STATE.vals }
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

  if (Object.prototype.hasOwnProperty.call(updates, "signatureType")) {
    state.type = updates.signatureType || DEFAULT_STATE.type;
  }

  if (Object.prototype.hasOwnProperty.call(updates, "gradeType")) {
    state.gradeType = updates.gradeType || DEFAULT_STATE.gradeType;
  }
}

export function setVal(key, value) {
  state.vals[key] = value;

  if (key === "signatureType") {
    state.type = value || DEFAULT_STATE.type;
  }

  if (key === "gradeType") {
    state.gradeType = value || DEFAULT_STATE.gradeType;
  }
}

// --- Initialization ---

export function initializeState() {
  state.type = DEFAULT_STATE.type;
  state.gradeType = DEFAULT_STATE.gradeType;
  state.vals = { ...DEFAULT_STATE.vals };
}
