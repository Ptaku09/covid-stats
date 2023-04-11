/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'color-corners':
          'linear-gradient(135deg, rgb(203 213 225) 100px, transparent 100px), linear-gradient(-45deg, rgb(203 213 225) 110px, transparent 110px)',
      },
    },
  },
  plugins: [],
};
