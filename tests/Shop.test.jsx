import { afterEach, describe, expect, it, vi } from "vitest";
import { getProducts } from "../src/api/getProducts.js";
import { render, screen } from "@testing-library/react";
import { Shop } from "../src/components/Shop/Shop.jsx";
import { act } from "react";

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

const mockRes = [
  {
    id: 1,
    title: "title",
    price: 1,
    description: "description",
    category: "category",
    image: "url",
  },
];

describe("Shop fetch", () => {
  it("fetches product data successfully", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes),
      })
    );

    const data = await getProducts();
    expect(data).toEqual(mockRes);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("fetch throws error on bad response", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      })
    );

    await expect(getProducts()).rejects.toThrow("Not Found");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("fetch throws error on failure", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    globalThis.fetch = vi.fn(() => Promise.reject("Fail"));

    await expect(getProducts()).rejects.toThrow("Fail");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("Shop component", () => {
  it("renders 1 product after successful fetch", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes),
      })
    );

    await act(async () => {
      render(<Shop />);
    });
    expect(screen.getByTestId("ProductCard")).toBeInTheDocument();
    expect(screen.getAllByTestId("ProductCard").length).toBe(1);
  });
});
