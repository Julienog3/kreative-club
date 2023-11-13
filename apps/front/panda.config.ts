import { defineConfig } from "@pandacss/dev";
import { textStyles } from "./styles/text-styles";
import { layerStyles } from "./styles/layer-styles";

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  utilities: {
    color: {
      values: "colors",
    },
  },
  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        purple: { value: "#D6ACFF" },
        blue: { value: "#778DFF" },
        cyan: { value: "#ACD7FF" },
        green: { value: "#AFFFC1" },
        yellow: { value: "#FEFFAB" },
        red: { value: "#FFB0B9" },
        darkred: { value: "#E09DA5" },
        gray: { value: "#E8E8E8" },
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
        warning: { value: "{colors.yellow}" },
        success: { value: "{colors.green}" },
        disabled: { value: "{colors.gray}" },
      },
    },
    extend: { textStyles, layerStyles },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
