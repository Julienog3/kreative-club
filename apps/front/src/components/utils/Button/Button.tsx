import { PropsWithChildren } from "react";
import { State } from "..";
import { button } from "./Button.style";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: State;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  type = "button",
  disabled = false,
  variant,
  onClick,
  children,
}: ButtonProps & PropsWithChildren) => {
  return (
    <button
      role="button"
      className={button({ color: variant })}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
