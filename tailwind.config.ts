import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Enables dark mode support
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgba(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          green: {
            50: "#f0fdf4", // Light green for backgrounds
            600: "#16a34a", // Green for buttons and highlights
            700: "#15803d", // Dark green for hover states
          },
          gray: {
            50: "#f9fafb", // Lightest gray
            100: "#f3f4f6", // Lighter gray
            300: "#d1d5db", // Border gray
            500: "#6b7280", // Mid-gray for text
            700: "#374151", // Dark gray for headings
          },
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      spacing: {
        72: "18rem", // Extra spacing utilities
        84: "21rem",
        96: "24rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem", // Extra large radius
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", // Card shadow 
        "card-hover": "0 6px 10px rgba(0, 0, 0, 0.15)", //  hover states
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], 
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // animation 
    require("@tailwindcss/typography"), // text
    require("@tailwindcss/forms"), 
    require("@tailwindcss/aspect-ratio"), 
  ],
};

export default config;
