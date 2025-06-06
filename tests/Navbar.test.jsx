import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  MemoryRouter,
} from "react-router-dom";
import { Navbar } from "../src/components/Navbar/Navbar.jsx";
import { routes } from "../src/routes/routes.jsx";
import userEvent from "@testing-library/user-event";

describe("Navbar", () => {
  it("renders Home, Shop, and Cart link text", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const nav = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(nav).toMatchSnapshot();
  });

  it("links have correct hrefs", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
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

describe("Navbar routes", () => {
  vi.mock("../src/components/Home/Home.jsx", () => ({
    Home: () => <div data-testid="HomeMock"></div>,
  }));

  vi.mock("../src/components/Shop/Shop.jsx", () => ({
    Shop: () => <div data-testid="ShopMock"></div>,
  }));

  vi.mock("../src/components/Cart/Cart.jsx", () => ({
    Cart: () => <div data-testid="CartMock"></div>,
  }));

  it("renders Navbar and Home on clicking Home link", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });

    render(<RouterProvider router={router} />);
    const homeLink = screen.getByRole("link", { name: /home/i });

    await user.click(homeLink);
    expect(screen.getByTestId("Navbar")).toBeInTheDocument();
    expect(screen.getByTestId("HomeMock")).toBeInTheDocument();
  });

  it("renders Navbar and Shop on clicking Shop link", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);
    const shopLink = screen.getByRole("link", { name: /shop/i });

    await user.click(shopLink);
    expect(screen.getByTestId("Navbar")).toBeInTheDocument();
    expect(screen.getByTestId("ShopMock")).toBeInTheDocument();
  });

  it("renders Navbar and Cart on clicking Cart link", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);
    const cartLink = screen.getByRole("link", { name: /cart/i });

    await user.click(cartLink);
    expect(screen.getByTestId("Navbar")).toBeInTheDocument();
    expect(screen.getByTestId("CartMock")).toBeInTheDocument();
  });

  it("renders ErrorPage on bad url", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/error-test-url"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("ErrorPage")).toBeInTheDocument();
  });
});
