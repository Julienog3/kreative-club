import React from "react";
import { PropsWithChildren } from "react";
import { css } from "../../../../styled-system/css";

const Card = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <article
      className={css({
        border: "3px solid #000",
        boxShadow: "4px 4px 0px #000",
        borderRadius: "13px",
        bgColor: "#fff",
        padding: 8,
      })}
    >
      {children}
    </article>
  );
};

export default Card;
