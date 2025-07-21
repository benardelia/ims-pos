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
        condensed: ['"Roboto Condensed Variable"', 'sans-serif'],
        plus: ['"Plus Jakarta Sans Variable"', 'sans-serif'],
        roboto: ['"Roboto Variable"','sans-serif']
      },
      colors: {
        custom: '#C0E863',
      },
    },
  },
  plugins: [
  
  ],
  safelist: [
    'backdrop-blur',
    'backdrop-blur-sm',
    'backdrop-blur-md',
    'backdrop-blur-lg',
    'backdrop-blur-xl',
    'backdrop-blur-2xl',
  ]
}

