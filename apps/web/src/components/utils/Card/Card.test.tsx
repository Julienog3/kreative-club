import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card test", () => {
  test("Should display content", () => {
    render(
      <Card>
        <p>Hello world !</p>
      </Card>,
    );

    expect(screen.getByText(/Hello world !/i)).toBeDefined();
  });
});
