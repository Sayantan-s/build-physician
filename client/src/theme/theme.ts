import type { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: {
      light: "#EEE3FF",
      base: "#AD7BFF",
      dark: "#8B61CB",
    },
    secondary: {
      danger: {
        light: "#FCE9EA",
        base: "#EA9797",
      },
      warning: {
        light: "#FFFAEE",
        base: "#FBE8A4",
      },
      success: {
        light: "#EAFAED",
        base: "#99E9AC",
      },
    },
    neutral: {
      base: "#60646D",
      light: "#E7E8EA",
      white: "#fff",
      black: "#000",
    },
    bg: {
      light: "#F9F4EF",
      dark: "#252324",
    },
  },
  font: {
    type: {
      prompt: [`"Prompt"`, "sans-serif"],
    },
    size: {
      xs: 1.2,
      sm: 1.4,
      base: 1.6,
      md: 1.8,
      lg: 2.0,
      xl: 2.4,
      "2xl": 3.6,
      "3xl": 4.0,
      "4xl": 4.8,
    },
  },
};
