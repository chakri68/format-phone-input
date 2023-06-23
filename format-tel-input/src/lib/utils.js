/**
 * Checks if a character is a valid digit.
 * @param {string} char
 * @returns {boolean}
 */
export function isValidDigit(char) {
  return /^\d$/.test(char);
}
