// dom.js

export function $(selector, root = document) {
  return root.querySelector(selector);
}

export function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function byId(id) {
  return document.getElementById(id);
}

export function on(element, eventName, handler, options) {
  if (!element) return;
  element.addEventListener(eventName, handler, options);
}

export function setHtml(element, html) {
  if (!element) return;
  element.innerHTML = html;
}

export function setText(element, text) {
  if (!element) return;
  element.textContent = text;
}

export function setValue(element, value) {
  if (!element) return;
  element.value = value ?? "";
}

export function show(element) {
  if (!element) return;
  element.hidden = false;
}

export function hide(element) {
  if (!element) return;
  element.hidden = true;
}

export function toggle(element, shouldShow) {
  if (!element) return;
  element.hidden = !shouldShow;
}

export function getCheckedValue(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : null;
}
