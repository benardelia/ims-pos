/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        open: ['"Nunito Sans Variable"', 'sans-serif'],
      },
      colors: {
        custom: '#C0E863',
      },
    },
  },
  plugins: [],
}

