import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Added 'src/' to these paths so Tailwind knows where to look
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "vw-title": "clamp(2.5rem, 8vw, 6rem)",
        "vw-body": "clamp(1rem, 2vw, 1.5rem)",
      },
      fontFamily: {
        sans: [
          '"Inter var"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
