import React from "react";
import { card } from "./Card.style";
import { css } from "../../../../styled-system/css";
import { SystemStyleObject } from "@pandacss/dev";

interface CardProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  withShadow?: boolean;
  css?: SystemStyleObject;
  children: React.ReactNode;
}

const Card = (props: CardProps): JSX.Element => {
  const { withShadow = false, css: cssProp = {}, children } = props;

  const className = css(card.raw({ shadow: withShadow }), cssProp);

  return (
    <article className={className} {...props}>
      {children}
    </article>
  );
};

export default Card;
