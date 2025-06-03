import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "../src/components/Navbar/Navbar.jsx";

describe("Navbar", () => {
  it("renders Home, Shop, and Cart link text", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });

  it("snapshot", () => {
    const nav = render(<Navbar />);
    expect(nav).toMatchSnapshot();
  });

  it("links have correct hrefs", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute(
      "href",
      "/shop"
    );
    expect(screen.getByRole("link", { name: /cart/i })).toHaveAttribute(
      "href",
      "/cart"
    );
  });
});

// GENERAL NAV TESTS
// See if the component renders, snapshot
// See if elements have the right hrefs
// See if text inside tag matches expected, "Home" "Shop" "Cart"

// USER EVENT TEST
// Note - Dynamic content shouldn't be tested for exact matching since it changes
// only static content should be checked exact matching like above
// Clicking on link brings you the right url
// Match snapshot for the new component that should be rendered
// Continue with same tests as needed for text matching
// Attributes etc.
