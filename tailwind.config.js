/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'skewX(-20deg) translateX(-150%)' },
          '100%': { transform: 'skewX(-20deg) translateX(200%)' },
        },
      },
    },
  },
  plugins: [],
}


