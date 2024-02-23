import { cva } from "../../../../styled-system/css";

export const card = cva({
  base: {
    layerStyle: "container",
    overflow: "hidden",
    // transition: "all .5s",
    // _hover: {
    //   boxShadow: "5px 5px 0px black",
    // },
  },
  variants: {
    shadow: {
      true: {
        boxShadow: "4px 4px 0px black",
      },
    },
  },
});
