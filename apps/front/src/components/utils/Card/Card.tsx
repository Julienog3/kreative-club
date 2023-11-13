import { PropsWithChildren } from "react";
import { card } from "./Card.style";

const Card = ({ children }: PropsWithChildren): JSX.Element => {
  return <article className={card()}>{children}</article>;
};

export default Card;
