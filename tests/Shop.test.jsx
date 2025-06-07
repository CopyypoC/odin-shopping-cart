import { afterEach, describe, expect, it, vi } from "vitest";
import { getProducts } from "../src/api/getProducts.js";
import { render } from "@testing-library/react";
import { Shop } from "../src/components/Shop/Shop.jsx";

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("Shop products", () => {
  it("fetches product data successfully", async () => {
    const mockRes = {
      id: 1,
      title: "title",
      price: 1,
      description: "description",
      category: "category",
      image: "url",
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes),
      })
    );

    const data = await getProducts();
    expect(data).toEqual(mockRes);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products");
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
  it("renders a product after successful fetch", () => {});
});
