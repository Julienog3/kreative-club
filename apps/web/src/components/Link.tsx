import { PropsWithChildren } from "react";

export { Link };

interface LinkProps {
  href: string;
  className?: string;
}

function Link({ children, ...props }: LinkProps & PropsWithChildren) {
  return <a {...props}>{children}</a>;
}
