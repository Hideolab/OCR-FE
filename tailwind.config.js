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
        'background': '#0f121a',
        'surface': '#1a1d26',
        'primary': '#3c83f6',
        'secondary': '#252a37',
        'primary-150': '#171b26',
        'primary-175': 'rgba(23, 27, 38, 0.5)',
        'primary-200': 'rgba(37, 42, 55, 0.5)',
        'secondary-300': 'rgba(60, 131, 246, 0.05)',
        'light-gray': '#292e3d',
        'gray-250': '#818898',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

