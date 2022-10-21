/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui"),function ({ addVariant }) {
    addVariant('mobile', "@media screen and (max-width: theme('screens.sm'))"); // instead of hard-coded 640px use sm breakpoint value from config. Or anything
  }],
  daisyui: {
    themes: ["bumblebee"],
  },
}
