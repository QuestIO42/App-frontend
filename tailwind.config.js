/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{tsx,ts,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'roxo-claro': '#5A4AC2',
        'roxo-medio': '#877DBF',
        'roxo-escuro': '#3E347B',
        amarelo: '#F2DB3F',
        vermelho: '#F2543F',
        'verde-claro': '#3FF29B',
        'verde-escuro': '#5D9D7E',
        cinza: '#454545',
        'preto-texto': 'rgba(0, 0, 0, 0.75)',
        branco: '#FFFFFF',
        laranja: '#F2953F',
        preto: '#1E1E1E',
      },
      fontFamily: {
        spaceMono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'default-btn': '0 0 0 0px #FFFFFF, 8px 8px #5A4AC2',
        'default-btn-hover': '0 0 0 0px #FFFFFF, 8px 8px #3E347B',
        'default-black': '0 0 0 0px #FFFFFF, 8px 8px #1E1E1E',
      },
      backgroundImage: {
        'grid-pattern': 'url(/grid.svg)',
      },
    },
  },
  plugins: [],
};
