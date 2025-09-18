/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsxts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
	   
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Georgia !important"],
        serif: ["Times New Roman", "sans-serif"],
        special: ["Anton", "sans-serif"],
      },
      colors: {
        dark: "#0a0b3b",
        light: "#64edf6",
      },
    },
  },
  plugins: [],
};
