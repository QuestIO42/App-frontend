/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{tsx,ts,js,jsx}'],
  theme: {
    fontSize: {
      sm: '13.3px',
      base: '16px',
      xl: '19.2px',
      '2xl': '23px',
      '3xl': '27.6px',
      '4xl': '33.2px',
      '5xl': '39.8px',
      '6xl': '47.8px',
    },
    extend: {
      colors: {
        roxo: {
          300: 'var(--roxo-300)',
          500: 'var(--roxo-500)',
          900: 'var(--roxo-900)',
        },
        amarelo: 'var(--amarelo)',
        vermelho: {
          300: 'var(--vermelho-300)',
          900: 'var(--vermelho-900)',
        },
        verde: {
          300: 'var(--verde-300)',
          900: 'var(--verde-900)',
        },
        cinza: 'var(--cinza)',
        cinzaClaro: 'var(--cinzaClaro)',
        preto: {
          texto: 'var(--preto-texto)',
          default: 'var(--preto)',
        },
        branco: 'var(--branco)',
        laranja: 'var(--laranja)',
      },
      fontFamily: {
        spaceMono: ["Space Mono", 'monospace'],
      },
      boxShadow: {
        'default-roxo-300': '0 0 0 0px #FFFFFF, 8px 8px #5A4AC2',
        'default-roxo-500': '0 0 0 0px #FFFFFF, 8px 8px #3E347B',
        'default-roxo-description': '0 0 0 0px #FFFFFF, 16px 16px #3E347B',
        'default-verde-300': '0 0 0 0px #FFFFFF, 8px 8px #3FF29B',
        'default-verde-900': '0 0 0 0px #FFFFFF, 8px 8px #5D9D7E',
        'default-cinza-300': '0 0 0 0px #FFFFFF, 8px 8px #DDDDDD',
        'default-cinza': '0 0 0 0px #FFFFFF, 8px 8px #BBBBBB',
        'default-preto': '0 0 0 0px #FFFFFF, 8px 8px #1E1E1E',
        'default-preto-900': '0 0 0 0px #FFFFFF, 8px 8px #000000',
        'default-laranja': '0 0 0 0px #FFFFFF, 8px 8px #97581F',
        'default-vermelho-300': '0 0 0 0px #FFFFFF, 8px 8px #F2543F',
        'default-vermelho-900': '0 0 0 0px #FFFFFF, 8px 8px #752c22',
      },
      backgroundImage: {
        'grid-pattern': 'url(./grid.svg)',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('progress-unfilled', ['&::-webkit-progress-bar', '&'])
      addVariant('progress-filled', [
        '&::-webkit-progress-value',
        '&::-moz-progress-bar',
        '&',
      ])
    }),
    require('@tailwindcss/typography'),
  ],
}
