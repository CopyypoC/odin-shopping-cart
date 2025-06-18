import { beforeEach, describe, expect, it, vi } from "vitest";
import { Cart } from "../src/components/Cart/Cart.jsx";
import { render, screen } from "@testing-library/react";
import { routes } from "../src/routes/routes.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react";

beforeEach(() => {
  vi.resetModules();
});

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

describe("Cart component", () => {
  it("renders empty cart", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });

  it("renders cart item after adding to cart", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });
    const user = userEvent.setup();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockProduct]),
      })
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    const cartNav = screen.getByRole("link", { name: /cart/i });
    const plusAmountBtn = screen.getByRole("button", { name: "+" });
    const addToCartBtn = screen.getByRole("button", { name: /cart/i });

    await user.click(plusAmountBtn);
    await user.click(addToCartBtn);
    await user.click(cartNav);

    const cartItem = screen.getByTestId("CartItem");

    expect(cartItem).toBeInTheDocument();
  });
});

// Render Empty cart
// Render checkout btn
// Render +/- btn
// Render amount input number
// Render remove item btn
// Check amount logic
// Check delete logic
// Check checkout btn logic
