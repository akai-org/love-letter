/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // new color palette
      colors: {
        'llred': '#5e0000',
      },
      // smaller font sizes
      fontSize: {
        'xxs': '.5rem',
      },
    },
  },
  plugins: [],
}

