import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button has correct initial color", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});

test("button changes text content to 'Change to red'", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  fireEvent.click(colorButton);

  expect(colorButton.textContent).toBe("Change to red");
});