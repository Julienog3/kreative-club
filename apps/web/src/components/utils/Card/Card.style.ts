import { cva } from "../../../../styled-system/css";

export const card = cva({
  base: {
    layerStyle: "container",
    p: "1rem",
  },
  variants: {
    shadow: {
      true: {
        boxShadow: "4px 4px 0px black",
      },
    },
  },
});
