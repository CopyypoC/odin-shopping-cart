import { describe, expect, it } from "vitest";
import { ProductCard } from "../src/components/Shop/ProductCard/ProductCard.jsx";
import { render, screen } from "@testing-library/react";

const mockProduct = {
  id: 1,
  title: "title",
  price: 1,
  description: "description",
  category: "category",
  image: "url",
};

describe("ProductCard component", () => {
  it("renders Add to cart button", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("renders (+) and (-) item button", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
  });

  it("renders product content", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText("$" + mockProduct.price)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toBeInTheDocument();
  });
});
