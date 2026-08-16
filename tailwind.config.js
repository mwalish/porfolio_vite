/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6c63ff',
        'primary-light': '#8b83ff',
        secondary: '#00d4aa',
        accent: '#ff6584',
        'bg-dark': '#0a0a1a',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
