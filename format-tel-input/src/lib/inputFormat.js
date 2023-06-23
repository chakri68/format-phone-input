/**
 * @callback FormatCallbackFunc
 * @param {string} str
 * @param {string} char
 * @returns {string}
 */

import { isValidDigit } from "./utils";

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
    15: (str) => str, // To specify the max characters
  },
};

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
