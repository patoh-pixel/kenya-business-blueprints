import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          950: "#0A2463",
          900: "#0D2D7A",
          800: "#1B4FD8",
          700: "#2563EB",
          600: "#3B82F6",
          50: "#EFF6FF",
        },
        red: {
          950: "#7F0016",
          700: "#D90429",
          600: "#EF233C",
          50: "#FFF1F2",
        },
        gold: { DEFAULT: "#F5A623", light: "#FEF3C7" },
        ink: "#0A0F1E",
        cream: "#FFFBF5",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
