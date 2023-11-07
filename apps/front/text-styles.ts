import { defineTextStyles } from "@pandacss/dev";

export const textStyles = defineTextStyles({
  title: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "Lexend Mega",
      fontWeight: "700",
      fontSize: "2.5rem",
      letterSpacing: "-.5rem",
      textDecoration: "None",
      textTransform: "None",
    },
  },
  body: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "Lexend",
      fontWeight: "400",
      fontSize: "16",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
});
