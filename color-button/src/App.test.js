import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

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

    const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
    const button = screen.getByRole("button", { name: "Change to blue" });

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    expect(checkbox).toBeEnabled();
  });

  test("Disabled button has gray background and reverts to red", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
    const colorButton = screen.getByRole("button", { name: "Change to blue" });

    // disable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle("background-color: gray");

    // re-enable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle("background-color: red");
  });

  test("Clicked disabled button has gray background and reverts to blue", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
    const colorButton = screen.getByRole("button", { name: "Change to blue" });

    // change button to blue
    fireEvent.click(colorButton);

    // disable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle("background-color: gray");

    // re-enable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle("background-color: blue");
  });
});

describe("spaces before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("works for multiple inner capital letter", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
