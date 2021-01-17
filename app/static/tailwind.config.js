// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      'sans': ["Cabin", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      'russo': ["Russo One", "sans-serif"]
    },
    extend:{
      colors: {
        "white": "#FFF",
        "black": '#22292f',
        'transparent': 'transparent',
        gray: {
          100: '#F7FAFC',
          200: '#D9E2EC',
          300: '#BCCCDC',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
        },
        green: {
          100: '#EFFCF6',
          200: '#C6F7E2',
          300: '#8EEDC7',
          400: '#65D6AD',
          500: '#3EBD93',
          600: '#27AB83',
          700: '#199473',
          800: '#0C6B58',
          900: '#014D40',
        },
        purple: {
          100: '#FAF5FF',
          200: '#E9D8FD',
          300: '#D6BCFA',
          400: '#B794F4',
          500: '#9F7AEA',
          600: '#805AD5',
          700: '#6B46C1',
          800: '#553C9A',
          900: '#44337A',
        },
        red: {
          100: '#fff5f5',
          200: '#fed7d7',
          300: '#feb2b2',
          400: '#fc8181',
          500: '#f56565',
          600: '#e53e3e',
          700: '#c53030',
          800: '#9b2c2c',
          900: '#742a2a',
        },
        smoke:{
          100: 'rgba(0, 0, 0, 0.1)',
          200: 'rgba(0, 0, 0, 0.25)',
          400: 'rgba(0, 0, 0, 0.4)',
          500: 'rgba(0, 0, 0, 0.5)',
          600: 'rgba(0, 0, 0, 0.6)',
          700: 'rgba(0, 0, 0, 0.75)',
          900: 'rgba(0, 0, 0, 0.9)',
        }
      }
    }
  }
}
