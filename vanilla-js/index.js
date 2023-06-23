"use strict";

/**
 * @callback FormatCallbackFunc
 * @param {string} str
 * @param {string} char
 * @returns {string}
 */

/**
 * @typedef {Object.<number, FormatCallbackFunc>} Format
 */

/**
 * @type {Object.<string, Format>}
 */
const FORMATS = {
  telFormat: {
    3: (str, char) => `(${str}${char})`,
    6: (str, char) => `${str} ${char}`,
    10: (str, char) => `${str}-${char}`,
    15: (str, char) => str, // To specify the max characters
  },
};

const inputEl = /** @type {HTMLInputElement} */ (
  document.querySelector("#phone")
);

inputEl.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key.length === 1) {
    e.preventDefault();
    if (!isValidDigit(key)) {
      return;
    }
    const formattedValue = formatTel(inputEl.value + key);
    inputEl.value = formattedValue;
  } else if (key === "Backspace") {
    e.preventDefault();
    if (inputEl.selectionStart > 0) {
      const selStart = inputEl.selectionStart;
      const newValue =
        inputEl.value.slice(0, selStart - 1) + inputEl.value.slice(selStart);
      inputEl.value = formatTel(newValue);
      inputEl.selectionStart = selStart - 1;
      inputEl.selectionEnd = selStart - 1;
    }
  }
});

/**
 * Checks if a character is a valid digit.
 * @param {string} char
 * @returns {boolean}
 */
function isValidDigit(char) {
  return /^\d$/.test(char);
}

/**
 * Formats a telephone number string.
 * @param {string} tel
 * @returns {string}
 */
function formatTel(tel) {
  let res = "";
  for (let i of tel) {
    if (isValidDigit(i)) {
      if (res.length + 1 in FORMATS.telFormat) {
        res = FORMATS.telFormat[res.length + 1](res, i);
      } else {
        res += i;
      }
    }
  }
  return res;
}
