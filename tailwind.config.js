/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      colors: {
        'pixygreen': '#238E8C',
        'pixycyan': '#B7D1D0',
        'pixypink': '#D3A9A9',
        'pixybeige': '#F2CDBE',
      },
      fontFamily: {
        Satisfy: ['Satisfy'],
        Montserrat: ['Montserrat', 'sans'],
        Hachi: ['Hachi Maru Pop'],
        Poppins: ['Poppins']
      },
    },
  },
  plugins: [],
}