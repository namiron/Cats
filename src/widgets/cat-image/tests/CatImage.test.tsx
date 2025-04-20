import { render, screen } from "@testing-library/react";
import { CatImage } from "../CatImage";

describe("CatImage", () => {
  it("does not render image if no URL is provided", () => {
    render(<CatImage imageUrl="" />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders image when URL is provided", () => {
    render(<CatImage imageUrl="https://example.com/cat.jpg" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/cat.jpg");
    expect(image).toHaveAttribute("alt", "cat");
  });
});
