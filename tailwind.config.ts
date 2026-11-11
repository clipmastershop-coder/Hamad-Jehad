import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#17296C",
          50: "#eef1f8",
          100: "#d6dcee",
          600: "#1e3380",
          700: "#17296C",
          900: "#0e1a47",
        },
        slate: {
          DEFAULT: "#394f75",
        },
        cyan: {
          DEFAULT: "#31bbf4",
          600: "#1ea3dc",
        },
        surface: "#F7F8FA",
        ink: "#171B2D",
      },
      fontFamily: {
        arabic: ["var(--font-ar)", "sans-serif"],
        latin: ["var(--font-en)", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
      letterSpacing: {
        tight2: "-0.01em",
      },
    },
  },
  plugins: [],
};
export default config;
