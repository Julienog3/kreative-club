import { PropsWithChildren } from "react";
import { State } from "..";
import { chip } from "./Chip.style";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: State;
}

const Chip = ({ variant, children }: ButtonProps & PropsWithChildren) => {
  return (
    <span role="status" className={chip({ color: variant })}>
      {children}
    </span>
  );
};

export default Chip;
