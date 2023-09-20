/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "480px", // Custom small breakpoint
        md: "768px", // Custom medium breakpoint
        lg: "1080px", // Custom large breakpoint
        xl: "1240px", // Custom extra large breakpoint
        xld: "1400px",
        "2xl": "1648px",
        "2xld": "1700px",
      },
      colors: {
        light: {
          100: "#F2F3F4",
          200: "#B4BBC0",
          300: "#F2F2F2",
          400: "#687681",
        },
        dark: {
          100: "#041B2D",
          200: "#161616",
          300: "#1C1C1D",
          400: "#333333",
          500: "#292929",
          600: "#373737",
          700: "#555",
        },
        secondary: "#EA4492",
        third: "#B3B3B3",
      },
      fontFamily: {
        sans: "var(--font-inter)",
        poppins: "var(--font-poppins)",
        readex: "var(--font-readex-pro)",
      },
      boxShadow: {
        card: "-5px -5px 15px 0px rgba(0, 0, 0, 0.05), 5px 5px 15px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.02)",
        box: "5px 5px 5px 0px rgba(0, 0, 0, 0.15)",
        tab: "3px 4px 4px 0px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [],
};
