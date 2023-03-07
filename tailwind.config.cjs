/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {

    extend: {
      colors: {
        'logo': '#b80000'
      },
    },
  },
  plugins: [],
}
