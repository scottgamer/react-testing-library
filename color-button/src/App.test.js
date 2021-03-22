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

describe("initial conditions", () => {
  test("button starts enabled", () => {
    render(<App />);

    const colorButton = screen.getByRole("button", { name: "Change to blue" });
    expect(colorButton).toBeEnabled();
  });

  test("checkbox starts unchecked", () => {
    render(<App />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });
});

describe("checkbox functionality", () => {
  test("checkbox disables button on first click and enables on second click", () => {
    render(<App />);

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    expect(checkbox).toBeEnabled();
  });
});
