import { cva } from "../../../../styled-system/css";

export const button = cva({
  base: {
    display: "flex",
    border: "2px solid #000",
    cursor: "pointer",
    textStyle: "body",
    padding: ".5rem",
    transition: "background",
    rounded: ".5rem",
    color: "black",
  },
  variants: {
    size: {
      small: {},
      medium: {},
      large: {},
    },
    color: {
      primary: {
        backgroundColor: "purple",
      },
      danger: {
        backgroundColor: "danger",
        _hover: {
          backgroundColor: "darkred",
        },
      },
      success: {
        backgroundColor: "success",
      },
      warning: {
        backgroundColor: "warning",
      },
    },
    disabled: {
      true: {
        backgroundColor: "disabled",
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
