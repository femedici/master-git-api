/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        git: {
          orange: '#F05032',
          dark: '#1a1a1a',
          gray: '#333333',
          light: '#f0f0f0'
        }
      }
    },
  },
  plugins: [],
}
