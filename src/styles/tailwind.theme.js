const customTheme = {
  screens: {
    sm: '320px',
    md: '720px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1920px',
  },
  extend: {
    colors: {
      primary: {
        DEFAULT: 'var(--primary)',
        dark: 'var(--primary-dark)'
      },
      white: {
        DEFAULT: 'var(--white)',
      },
      neutral: {
        gray: 'var(--neutral-gray)',
        'gray-dark': 'var(--neutral-gray-dark)',
        'gray-light': 'var(--neutral-gray-light)',
      }
    },
    fontFamily: {
      lato: ['var(--font-lato)'],
    },
    fontSize: {
      '8xl': 'var(--8xl)',
      '7xl': 'var(--7xl)',
      '6xl': 'var(--6xl)',
      '4xl': 'var(--4xl)',
      h2xl: 'var(--h2xl)',
      '3xl': 'var(--3xl)',
      subtext: 'var(--subtext)',
      '2xl': 'var(--2xl)',
      xl: 'var(--xl)',
      lg: 'var(--lg)',
      base: 'var(--base)',
      sm: 'var(--sm)',
      xs: 'var(--xs)',
    },
    height: {
      '100': '28rem', // 448px
      '104': '32rem', // 512px
      '108': '36rem', // 576px
      '112': '40rem', // 640px
      '116': '44rem', // 704px
      '120': '48rem', // 768px
      '124': '52rem', // 832px
      '128': '56rem', // 896px
    },
    width: {
      '100': '28rem', // 448px
      '104': '32rem', // 512px
      '108': '36rem', // 576px
      '112': '40rem', // 640px
      '116': '44rem', // 704px
      '120': '48rem', // 768px
      '124': '52rem', // 832px
      '128': '56rem', // 896px
    }
  },
};

exports.theme = customTheme;
