/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        preto: '#000000',
        branco: '#FFFFFF',
        brancoMedio: '#F8F7F6',
        cinzaClaro: '#D9D8D7',
        cinzaMedio: '#AEAAA6',
        cinzaEscuro: '#707070',
        verdeClaro: '#99B3A3',
        VerdeMedio: '#308D54',
        VerdeEscuro: '#1A8C46',
        azulClaro: '#98B8D0',
        azulCinza: '#8D9AAE',
        azulEscuro: '#47799D',
      },
      fontSize: {
        ss: '0.6rem',
      },
      spacing: {
        0.1: '0.10rem',
        100: '40rem',
        18: '4.5rem',
      },
      lineHeight: {
        'extra-loose': '1rem',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
