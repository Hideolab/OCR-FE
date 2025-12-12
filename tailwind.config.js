/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '87.5rem',
      },
      colors: {
        'primary': '#0f121a',
        'card': '#1a1d26',
        'secondary': '#252a37',
        'border': '#292e3d',
        'accent': '#3c83f6',
        'muted': '#818898',
        'light': '#f3f4f7',
        'card-opacity1': '#171b26',
        'card-opacity': '#171b2680',
        'header': 'rgba(15, 18, 26, 0.95)',
        'accent-light': 'rgba(60, 131, 246, 0.05)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

