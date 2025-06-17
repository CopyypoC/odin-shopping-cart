import { describe, expect, it } from "vitest";
import { Cart } from "../src/components/Cart/Cart.jsx";
import { render, screen } from "@testing-library/react";

describe("Cart component", () => {
  it("renders Cart div", () => {
    render(<Cart />);
    expect(screen.getByTestId("Cart")).toBeInTheDocument();
  });
});
