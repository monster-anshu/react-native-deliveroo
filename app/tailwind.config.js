/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00CCBB',
        background: '#ffffff',
        backgroundFaded: '#f5f5f5',
        border: '#eaeaea',
        danger: '#ff0000',
        secondary: '#093959',
        text: '#000000',
        textFaded: '#666666',
      },
    },
  },
  plugins: [],
};
