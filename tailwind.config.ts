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
        // Khan Academy-inspired colors
        primary: {
          DEFAULT: "#14bf96", // Khan Academy teal/green
          light: "#1ed3a5",
          dark: "#0fa879",
        },
        secondary: {
          DEFAULT: "#ff9500", // Warm orange for energy
          light: "#ffb347",
          dark: "#e68200",
        },
        // Trust and credibility colors
        trust: {
          DEFAULT: "#1865f2", // Blue for credibility
          light: "#4a90ff",
          dark: "#0d47c4",
        },
        // Thai-friendly accent colors
        accent: {
          green: "#00a862",
          blue: "#0072ce",
          orange: "#f77e21",
        },
      },
      fontFamily: {
        sans: ["Sarabun", "Prompt", "Kanit", "system-ui", "sans-serif"],
        display: ["Prompt", "Sarabun", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

