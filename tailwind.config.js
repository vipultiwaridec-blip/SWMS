/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#174c3c',
        paper: '#f6f5ef',
        ink: '#1c2924',
        sage: '#dce8df',
        signal: '#e4a63a',
      },
      fontFamily: { sans: ['DM Sans', 'ui-sans-serif', 'system-ui'] },
      borderRadius: { card: '14px' },
    },
  },
  plugins: [],
};
