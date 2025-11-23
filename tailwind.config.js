/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',      // Custom raw media query
        'tb':'950px',
      },
      colors: {
        'black-300': '#2d2d2d',
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"], // 👈 Add this line
      },
    },
  },
  plugins: [],
};
