import { PropsWithChildren } from "react";
import { card } from "./Card.style";
import { css } from "../../../../styled-system/css";
import { SystemStyleObject } from "@pandacss/dev";

interface CardProps {
  withShadow?: boolean;
  css?: SystemStyleObject;
}

const Card = ({
  withShadow = false,
  css: cssProp = {},
  children,
}: CardProps & PropsWithChildren): JSX.Element => {
  const className = css(card.raw({ shadow: withShadow }), cssProp);

  return <article className={className}>{children}</article>;
};

export default Card;
