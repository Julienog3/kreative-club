import { PropsWithChildren } from "react";
import Button, { ButtonProps } from "../Button/Button";
import { Link } from "../../../renderer/Link";

interface ButtonWithLinkProps extends ButtonProps {
  to: string;
}

const ButtonWithLink = ({
  to,
  children,
  ...props
}: ButtonWithLinkProps & PropsWithChildren): JSX.Element => {
  return (
    <Link href={to}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default ButtonWithLink;
