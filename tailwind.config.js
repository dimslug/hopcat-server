/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./public/index.html",
      "./src/**/*.{html,js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  prefix: "tw-",
  preflight: "false",

  theme: {
      extend: {},
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
  }