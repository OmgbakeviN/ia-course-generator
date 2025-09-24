/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lemonade: '#b8fb3c',
        electric: '#03045e',
      }
    },
  },
  plugins: [],
}