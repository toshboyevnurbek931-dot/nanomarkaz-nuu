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
        navy: {
          950: "#051139",
          900: "#0a1a4a",
          800: "#10215e",
          700: "#1a337a",
          600: "#2548a0",
        },
        gold: {
          400: "#f5c542",
          500: "#e8a317",
          600: "#c4840c",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 40px -16px rgba(5, 17, 57, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
