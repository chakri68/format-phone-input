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
export const FORMATS = {
  telFormat: {
    3: (str, char) => `(${str}${char})`,
    6: (str, char) => `${str} ${char}`,
    10: (str, char) => `${str}-${char}`,
    15: (str, char) => str, // To specify the max characters
  },
};

/**
 * Checks if a character is a valid digit.
 * @param {string} char
 * @returns {boolean}
 */
export function isValidDigit(char) {
  return /^\d$/.test(char);
}

/**
 * Formats a telephone number string.
 * @param {string} tel
 * @param {number} cursorPos
 * @returns {string}
 */
export function formatTel(tel, cursorPos) {
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

/**
 * @param {Event} e
 */
export function handleTelInputFormatting(e) {
  const inputEl = /** @type {HTMLInputElement} */ (e.currentTarget);
  const prevSelEnd = inputEl.selectionEnd;
  const formattedTel = formatTel(inputEl.value, prevSelEnd);
  const cursorDiff = formattedTel.length - inputEl.value.length;
  const newSelEnd = prevSelEnd + cursorDiff;
  inputEl.value = formattedTel;
  inputEl.setSelectionRange(newSelEnd, newSelEnd);
}
