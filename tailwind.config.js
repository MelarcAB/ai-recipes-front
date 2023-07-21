/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'roboto': ['"Roboto"', 'sans-serif', 'ui-sans-serif', 'system-ui'],
        'poppins': ['"Poppins"'],
      },
    },
  },
  plugins: [
  ],
}