/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1E9',
        cream: '#EDE6D8',
        beige: '#D8C9B5',
        sand: '#C9B8A2',
        taupe: '#A8927E',
        'taupe-deep': '#8A7462',
        ink: '#292929',
        'ink-soft': '#4A453F',
        coal: '#1B1916',
        'coal-soft': '#262320',
        'coal-card': '#2E2A25',
        'ivory-dark': '#E8E2D5',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', '"Helvetica Neue"', 'sans-serif'],
        arabic: ['Almarai', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
};
