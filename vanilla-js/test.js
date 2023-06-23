import { jest } from "@jest/globals";
import { formatTel, handleTelInputFormatting, isValidDigit } from "./utils.js";

// Test isValidDigit
test("isValidDigit should return true for valid digits", () => {
  expect(isValidDigit("1")).toBe(true);
  expect(isValidDigit("5")).toBe(true);
  expect(isValidDigit("9")).toBe(true);
});

test("isValidDigit should return false for non-digit characters", () => {
  expect(isValidDigit("a")).toBe(false);
  expect(isValidDigit("!")).toBe(false);
  expect(isValidDigit(" ")).toBe(false);
});

// Test formatTel
test("formatTel should format telephone numbers correctly", () => {
  expect(formatTel("1234567890")).toBe("(123) 456-7890");
  expect(formatTel("9876543210")).toBe("(987) 654-3210");
  expect(formatTel("1112223333")).toBe("(111) 222-3333");
  expect(formatTel("5551234567")).toBe("(555) 123-4567");
});

test("formatTel should ignore non-digit characters", () => {
  expect(formatTel("12-34!56 78")).toBe("(123) 456-78");
  expect(formatTel("9@8#7%6^5&4*3(2)1")).toBe("(987) 654-321");
});

// Test handleTelInputFormatting
test("handleTelInputFormatting should format telephone numbers while handling user input", () => {
  const inputEl = { value: "1234567890", selectionEnd: 10 };
  handleTelInputFormatting({ currentTarget: inputEl });
  expect(inputEl.value).toBe("(123) 456-7890");
  expect(inputEl.selectionEnd).toBe(14);

  inputEl.value = "5551234567";
  inputEl.selectionEnd = 7;
  handleTelInputFormatting({ currentTarget: inputEl });
  expect(inputEl.value).toBe("(555) 123-4567");
  expect(inputEl.selectionEnd).toBe(11);
});
