import { PropsWithChildren } from "react";
import { css } from "../../../../styled-system/css";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  type = "button",
  disabled = false,
  onClick,
  children,
}: ButtonProps & PropsWithChildren) => {
  return (
    <button
      className={css({
        padding: 2,
        backgroundColor: disabled ? "gray.300" : "violet.500",
        rounded: "md",
        border: "2px solid #000",
        cursor: "pointer",
        textStyle: "body",
      })}
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
