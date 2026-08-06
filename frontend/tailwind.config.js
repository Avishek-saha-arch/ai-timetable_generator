/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    // Dynamic color classes used for timetable subject chips (built from data, not literals)
    { pattern: /(bg|border|text)-(blue|indigo|sky|amber|emerald|violet|pink|slate)-(50|100|200|600|700)/ },
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#284A50',
          secondary: '#416F7D',
          accent: '#52A8AD',
          highlight: '#FFA20A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
