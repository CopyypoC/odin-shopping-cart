import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "../src/components/Shop/ProductCard/ProductCard.jsx";
import { render, screen } from "@testing-library/react";
import { Shop } from "../src/components/Shop/Shop.jsx";
import userEvent from "@testing-library/user-event";
import { act } from "react";

const mockProductList = [
  {
    id: 1,
    title: "title",
    price: 1,
    description: "description",
    category: "category",
    image: "url",
  },
];

const mockProduct = mockProductList[0];

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
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toBeInTheDocument();
  });

  it("increases product amount by 1 when clicking +", async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockProduct]),
      })
    );

    await act(async () => {
      render(<Shop />);
    });

    let amount = Number(screen.getByTestId("ProductAmount").textContent);
    const plusBtn = screen.getByRole("button", { name: "+" });

    expect(amount).toBe(0);
    await user.click(plusBtn);
    amount = Number(screen.getByTestId("ProductAmount").textContent);
    expect(amount).toBe(1);
  });

  it("decrease product amount by 1 when clicking -", async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockProduct]),
      })
    );

    await act(async () => {
      render(<Shop />);
    });

    let amount = Number(screen.getByTestId("ProductAmount").textContent);
    const plusBtn = screen.getByRole("button", { name: "+" });
    const minusBtn = screen.getByRole("button", { name: "-" });
    await user.click(plusBtn);

    amount = Number(screen.getByTestId("ProductAmount").textContent);
    expect(amount).toBe(1);

    await user.click(minusBtn);
    amount = Number(screen.getByTestId("ProductAmount").textContent);
    expect(amount).toBe(0);

    await user.click(minusBtn);
    amount = Number(screen.getByTestId("ProductAmount").textContent);
    expect(amount).toBe(0);
  });
});
