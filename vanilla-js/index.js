"use strict";

import { handleTelInputFormatting } from "./utils.js";

const inputEl = /** @type {HTMLInputElement} */ (
  document.querySelector("#phone")
);

inputEl.addEventListener("input", (e) => {
  handleTelInputFormatting(e);
});
