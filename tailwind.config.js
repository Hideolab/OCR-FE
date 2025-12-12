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
        'primary-100': '#1a1d26',
        'primary-150': '#171b26',
        'primary-175': '#171b2680',
        'primary-200': '#252a3780',
        'secondary': '#252a37',
        'secondary-300': '#3c83f60d',
        'light-gray': '#292e3d',
        'light-blue': '#3c83f6',
        'gray-250': '#818898',
        'slate-30': '#f3f4f7',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

