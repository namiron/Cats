import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CatMain } from "../CatMain";
import { act } from "react";

jest.useFakeTimers();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ url: "https://example.com/cat.jpg" }]),
  })
) as jest.Mock;

describe("CatMain", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders CatImage when imageUrl is set", async () => {
    render(<CatMain />);
    fireEvent.click(screen.getByRole("button", { name: /get cat/i }));

    await waitFor(() => expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/cat.jpg"));
  });

  it("toggles enabled and autoRefresh via checkboxes", () => {
    render(<CatMain />);

    const enabledCheckbox = screen.getByLabelText(/enabled/i);
    const autoRefreshCheckbox = screen.getByLabelText(/auto-refresh/i);

    expect(enabledCheckbox).toBeChecked();
    expect(autoRefreshCheckbox).not.toBeChecked();

    fireEvent.click(enabledCheckbox);
    expect(enabledCheckbox).not.toBeChecked();

    fireEvent.click(autoRefreshCheckbox);
    expect(autoRefreshCheckbox).toBeChecked();
  });

  it("starts auto-refresh when enabled and autoRefresh are true", async () => {
    render(<CatMain />);

    const autoRefreshCheckbox = screen.getByLabelText(/auto-refresh/i);
    fireEvent.click(autoRefreshCheckbox);

    await act(async () => {
      jest.advanceTimersByTime(5000);
      jest.runOnlyPendingTimers();
      return Promise.resolve();
    });
  });

  it("clears interval on unmount", () => {
    const { unmount } = render(<CatMain />);
    unmount();
  });
});
