import { jest } from "@jest/globals";

import {
  formatTel,
  FORMATS,
  isValidDigit,
  handleTelInputFormatting,
} from "./utils.js";

// Unit tests for isValidDigit
test("isValidDigit should return true for valid digits", () => {
  expect(isValidDigit("1")).toBe(true);
  expect(isValidDigit("9")).toBe(true);
});

test("isValidDigit should return false for non-digit characters", () => {
  expect(isValidDigit("a")).toBe(false);
  expect(isValidDigit("-")).toBe(false);
  expect(isValidDigit(" ")).toBe(false);
});

// Unit tests for formatTel
test("formatTel should format telephone numbers correctly", () => {
  expect(formatTel("1234567890")).toBe("(123) 456-7890");
  expect(formatTel("123")).toBe("(123)");
  expect(formatTel("12")).toBe("12");
  expect(formatTel("1")).toBe("1");
});

test("formatTel should handle non-digit characters in the input", () => {
  expect(formatTel("12-34 567")).toBe("(123) 456-7");
  expect(formatTel("1a2b3c4d5e6f7g8h9i0")).toBe("(123) 456-7890");
});

// Unit tests for handleTelInputFormatting
test("handleTelInputFormatting should format input on valid key press", () => {
  const inputEl = { value: "123", selectionStart: 3 };
  const event = { key: "4", preventDefault: jest.fn(), currentTarget: inputEl };
  handleTelInputFormatting(event);
  expect(inputEl.value).toBe("(123) 4");
});

test("handleTelInputFormatting should not format input on invalid key press", () => {
  const inputEl = { value: "123", selectionStart: 3 };
  const event = { key: "a", preventDefault: jest.fn(), currentTarget: inputEl };
  handleTelInputFormatting(event);
  expect(inputEl.value).toBe("123");
});

test("handleTelInputFormatting should format input on Backspace key press", () => {
  const inputEl = { value: "(123) 456", selectionStart: 9, selectionEnd: 9 };
  const event = {
    key: "Backspace",
    preventDefault: jest.fn(),
    currentTarget: inputEl,
  };
  handleTelInputFormatting(event);
  expect(inputEl.value).toBe("(123) 45");
  expect(inputEl.selectionStart).toBe(8);
  expect(inputEl.selectionEnd).toBe(8);
});

test("handleTelInputFormatting should not format input on Backspace key press when at the beginning", () => {
  const inputEl = { value: "(123) 456", selectionStart: 0, selectionEnd: 0 };
  const event = {
    key: "Backspace",
    preventDefault: jest.fn(),
    currentTarget: inputEl,
  };
  handleTelInputFormatting(event);
  expect(inputEl.value).toBe("(123) 456");
});

// Additional unit tests for FORMATS
test("FORMATS should contain the specified formatting functions", () => {
  expect(FORMATS).toHaveProperty("telFormat");
  expect(FORMATS.telFormat).toHaveProperty("3");
  expect(FORMATS.telFormat).toHaveProperty("6");
  expect(FORMATS.telFormat).toHaveProperty("10");
  expect(FORMATS.telFormat).toHaveProperty("15");
  expect(FORMATS.telFormat["3"]).toBeInstanceOf(Function);
  expect(FORMATS.telFormat["6"]).toBeInstanceOf(Function);
  expect(FORMATS.telFormat["10"]).toBeInstanceOf(Function);
  expect(FORMATS.telFormat["15"]).toBeInstanceOf(Function);
});
