import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CartItem } from "../src/components/Cart/CartItem/CartItem.jsx";

const mockProductList = [
  {
    id: 1,
    amount: 2,
    title: "title",
    price: 1,
    description: "description",
    category: "category",
    image: "url",
  },
];

const mockProduct = mockProductList[0];

describe("CartItem component", () => {
  it("renders +/- buttons", () => {
    render(<CartItem product={mockProduct} />);

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
  });

  it("renders item content", () => {
    render(<CartItem product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText("$" + mockProduct.price * mockProduct.amount)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toBeInTheDocument();
  });
});
