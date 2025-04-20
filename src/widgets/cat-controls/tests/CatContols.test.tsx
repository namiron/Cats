import { render, screen, fireEvent } from "@testing-library/react";
import CatControls from "../CatControls";

describe("CatControls", () => {
  const mockProps = {
    enabled: true,
    autoRefresh: false,
    onToggleEnabled: jest.fn(),
    onToggleAutoRefresh: jest.fn(),
    onGetCat: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls onGetCat when button clicked", () => {
    render(<CatControls {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /get cat/i }));
    expect(mockProps.onGetCat).toHaveBeenCalled();
  });

  it("calls onToggleEnabled when checkbox toggled", () => {
    render(<CatControls {...mockProps} />);
    fireEvent.click(screen.getByLabelText(/enabled/i));
    expect(mockProps.onToggleEnabled).toHaveBeenCalled();
  });

  it("calls onToggleAutoRefresh when checkbox toggled", () => {
    render(<CatControls {...mockProps} />);
    fireEvent.click(screen.getByLabelText(/auto-refresh every 5 second/i));
    expect(mockProps.onToggleAutoRefresh).toHaveBeenCalled();
  });
});
