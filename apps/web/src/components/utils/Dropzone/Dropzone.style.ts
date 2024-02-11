import { cva } from "#root/styled-system/css";

export const dropzone = cva({
  base: {
    textStyle: "body",
    w: "0.1px",
    h: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
});