/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";

describe("App component", () => {
  test("renders input element with placeholder", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("mobile number");
    expect(inputElement).toBeInTheDocument();
  });

  test("formats telephone number input correctly", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("mobile number");

    fireEvent.input(inputElement, { target: { value: "1234567890" } });
    expect(inputElement.value).toBe("(123) 456-7890");

    fireEvent.input(inputElement, { target: { value: "9876543210" } });
    expect(inputElement.value).toBe("(987) 654-3210");

    fireEvent.input(inputElement, { target: { value: "5551234567" } });
    expect(inputElement.value).toBe("(555) 123-4567");
  });

  test("stores the formatted telephone number in phoneNumber.current", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("mobile number");

    fireEvent.input(inputElement, { target: { value: "1234567890" } });
    expect(inputElement.value).toBe("(123) 456-7890");
    expect(inputElement.selectionEnd).toBe(14);
    expect(inputElement.value).toBe("(123) 456-7890");
    expect(inputElement.selectionEnd).toBe(14);
  });
});
