import { PropsWithChildren } from "react";
import Button, { ButtonProps } from "../Button/Button";
import { Link } from "react-router-dom";

interface ButtonWithLinkProps extends ButtonProps {
  to: string;
}

const ButtonWithLink = ({
  to,
  children,
  ...props
}: ButtonWithLinkProps & PropsWithChildren): JSX.Element => {
  return (
    <Link to={to}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default ButtonWithLink;
