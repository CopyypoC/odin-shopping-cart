import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Home } from "../src/components/Home/Home.jsx";

describe("Home component", () => {
  it("matches snapshot", () => {
    const home = render(<Home />);

    expect(home).toMatchSnapshot();
  });
});
