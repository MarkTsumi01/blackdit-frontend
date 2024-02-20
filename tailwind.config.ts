import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        spacingUnit: 4, // in px
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        dividerWeight: "1px", // h-divider the default height applied to the divider component
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "2px", // rounded-small
          medium: "6px", // rounded-medium
          large: "12px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#0f172a", //font color
            default: "#0B154B",
            primary: {
              foreground: "#A3A3A3",
              DEFAULT: "#F0B09D",
            },
            secondary: {
              foreground: "#fdfdfe",
              DEFAULT: "#006FEE",
            },
            divider: "#EFEFEF",
          },
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#FFFFFF", //font color
            default: "#0B154B",
            primary: {
              foreground: "#A3A3A3",
              DEFAULT: "#F0B09D",
            },
            secondary: {
              foreground: "#0e0c0c",
              DEFAULT: "#006FEE",
            },
            divider: "#EFEFEF",
          },
        },
      },
    }),
  ],
};
export default config;
