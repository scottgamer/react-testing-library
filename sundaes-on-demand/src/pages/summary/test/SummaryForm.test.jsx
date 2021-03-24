import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Summary Form", () => {
  test("Initial conditions", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  test("checkbox disables button on first click and disables on second click", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    userEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });

  describe("popover responds to hover", () => {
    test("popover starts out hidden", () => {
      render(<SummaryForm />);
      const nullPopover = screen.queryByText(
        /no ice cream will actually be delivered/i
      );
      expect(nullPopover).not.toBeInTheDocument();
    });

    test("popover appears upon mouseover of checkbox label", () => {
      render(<SummaryForm />);
      const tcs = screen.getByText(/terms and conditions/i);
      userEvent.hover(tcs);

      const popover = screen.getByText(
        /no ice cream will actually be delivered/i
      );
      expect(popover).toBeInTheDocument();
    });

    test("popover disappears when we mouse out", async () => {
      render(<SummaryForm />);

      const tcs = screen.getByText(/terms and conditions/i);
      userEvent.hover(tcs);

      userEvent.unhover(tcs);
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/no ice cream will actually be delivered/i)
      );
    });
  });
});
