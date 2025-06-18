import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react";

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
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
  it("renders empty cart", async () => {
    const { routes } = await import("../src/routes/routes.jsx");
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });

  it("renders cart item after adding to cart", async () => {
    const { routes } = await import("../src/routes/routes.jsx");
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

  it("renders total price and checkout button with item in cart", async () => {
    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useOutletContext: () => ({
          cartItems: mockProductList,
        }),
      };
    });

    const { Cart } = await import("../src/components/Cart/Cart.jsx");

    await act(async () => {
      render(<Cart />);
    });

    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
    const totalPrice = screen.getByTestId("TotalPrice");

    expect(checkoutBtn).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
  });

  it("renders empty state after clicking checkout button", async () => {
    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useOutletContext: () => ({
          cartItems: mockProductList,
        }),
      };
    });

    const { routes } = await import("../src/routes/routes.jsx");
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    const user = userEvent.setup();

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });

    await user.click(checkoutBtn);
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
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
