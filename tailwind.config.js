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
        'spectralviolet' : '#471337',
        'spectralpink' : '#b13254',
        'spectralsalmon' : '#ff5349',
        'spectralorange' : '#ff7249',
        'spectralyellow' : '#ff9248',
        'primary': '#1769bb',
        'secondary': '#4b9bd4',
        'tertiary': '#44bcd7',
      },
      fontFamily: {
        Satisfy: ['Satisfy'],
        Montserrat: ['Montserrat', 'sans'],
        Hachi: ['Hachi Maru Pop'],
        Poppins: ['Poppins'],
        Indie: ['Indie Flower'],
      },
    },
  },
  plugins: [],
}