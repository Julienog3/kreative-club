import { defineLayerStyles } from "@pandacss/dev";

export const layerStyles = defineLayerStyles({
  container: {
    description: "container styles",
    value: {
      backgroundColor: "white",
      border: "3px solid black",
      boxShadow: "4px 4px 0px black",
      borderRadius: "13px",
    },
  },
});
