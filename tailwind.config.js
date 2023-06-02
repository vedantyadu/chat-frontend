/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        pen: 'url(src/assets/pen.svg) 24 24, pointer',
        eraser: 'url(src/assets/eraser.svg) 24 24, pointer',
      },
      fontFamily: {
        Montserrat: ['Montserrat'],
      },
    },
  },
  plugins: [],
}

