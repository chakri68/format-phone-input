"use strict";

import { handleTelInputFormatting } from "./utils.js";

const inputEl = /** @type {HTMLInputElement} */ (
  document.querySelector("#phone")
);

inputEl.addEventListener("keydown", (e) => {
  handleTelInputFormatting(e);
});
