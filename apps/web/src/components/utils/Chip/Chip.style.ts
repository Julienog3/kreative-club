import { cva } from "../../../../styled-system/css";

export const chip = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: ".25rem",
    border: "2px solid #000",
    textStyle: "body",
    padding: ".25rem .75rem",
    transition: "background",
    rounded: "999px",
    color: "black",
  },
  variants: {},
});
