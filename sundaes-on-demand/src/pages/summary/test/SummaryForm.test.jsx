import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("Summary Form", () => {
  test("Initial conditions", () => {
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
  });
});
