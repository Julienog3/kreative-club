import { PropsWithChildren } from "react";
import { State } from "..";
import { button } from "./Button.style";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: State;
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
      className={button({ color: variant, disabled })}
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
