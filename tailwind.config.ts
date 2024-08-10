import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.3",
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
        borderWidth: {
          small: "1px",
          medium: "1px",
          large: "2px",
        },
      },
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#FF6700",
              50: "#FFF2E6",
              100: "#FFE0CC",
              200: "#FFB380",
              300: "#FF8533",
              400: "#FF6700",
              500: "#CC5200",
              600: "#993D00",
              700: "#662900",
              800: "#331400",
              900: "#1A0A00",
            },
            focus: "#BEF264",
            secondary: {
              DEFAULT: "#171717",
              50: "#F2F2F2",
              100: "#E6E6E6",
              200: "#CCCCCC",
              300: "#B3B3B3",
              400: "#999999",
              500: "#808080",
              600: "#666666",
              700: "#4D4D4D",
              800: "#333333",
              900: "#171717",
            },
          },
        },
      },
    }),
  ],
};
export default config;