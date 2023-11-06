import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button test", () => {
  test("Should display content", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Hello world !</Button>);
    expect(screen.getByText(/Hello world !/i)).toBeDefined();
  });

  test("Should call function on click", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText(/Click me/i));
    expect(handleClick).toBeCalledTimes(1);
  });

  test("Should be disabled", () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled={true}>
        Disabled button
      </Button>,
    );

    fireEvent.click(screen.getByText(/Disabled button/i));
    expect(handleClick).toBeCalledTimes(0);
  });
});
