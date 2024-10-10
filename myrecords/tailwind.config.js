/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        afacad: ['Afacad', 'sans-serif'],
        abel: ['Abels', 'sans-serif']
      },
    },
  },
  plugins: [],
}

