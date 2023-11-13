import { PropsWithChildren } from "react";
import { card } from "./Card.style";

interface CardProps {
  withShadow?: boolean;
}

const Card = ({
  withShadow = false,
  children,
}: CardProps & PropsWithChildren): JSX.Element => {
  return <article className={card({ shadow: withShadow })}>{children}</article>;
};

export default Card;
