import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0a0a0b",
        surface: "#141416",
        "surface-hover": "#1b1b1e",
        border: "#232326",
        accent: {
          DEFAULT: "#ff6a00",
          soft: "rgba(255, 106, 0, 0.12)",
        },
        muted: "#9a9aa0",
        positive: "#22c55e",
        negative: "#ef4444",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        lg: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
