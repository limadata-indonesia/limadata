/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink:     "#0A1F3C",
        muted:   "#4A6A8A",
        faint:   "#8AAEC8",
        accent:  "#0077C8",
        line:    "#C8DFF2",
        surface: "#FFFFFF",
        tint:    "#EFF6FF",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
