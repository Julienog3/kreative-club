import { PropsWithChildren } from "react";
import { css } from "../../../../styled-system/css";

interface ButtonProps {
  type?: "button" | "submit" | "reset"
  onClick: () => void
}

const Button = ({ type = 'button', onClick, children }: ButtonProps & PropsWithChildren) => {
  return (
    <button 
      className={css({ 
        padding: 2, 
        backgroundColor: 'violet.500',
        rounded: 'md',
        border: '2px solid #000',
        cursor: 'pointer',
        textStyle: 'body'
      })} 
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;