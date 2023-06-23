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
 * @returns {string}
 */
export function formatTel(tel) {
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
  let prevCount = 0;
  const selEnd = inputEl.selectionEnd;
  for (let char of inputEl.value.slice(0, selEnd)) {
    if (isValidDigit(char)) {
      prevCount += 1;
    }
  }
  const formattedTel = formatTel(inputEl.value);
  let reqInd = 0;
  for (let char of formattedTel) {
    if (isValidDigit(char)) {
      if (prevCount <= 0) break;
      prevCount -= 1;
    }
    reqInd += 1;
  }
  inputEl.value = formattedTel;
  inputEl.selectionEnd = reqInd;
}
