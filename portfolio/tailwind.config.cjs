module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian Nexus Palette
        surface: {
          DEFAULT: '#131314',
          container: {
            lowest: '#0e0e0f',
            low: '#1b1b1c',
            DEFAULT: '#201f21',
            high: '#2b2a2c',
            highest: '#353436',
          },
          variant: '#49474a',
        },
        primary: {
          DEFAULT: '#dbfcff',
          container: '#00f0ff',
          fixed: '#dbfcff',
        },
        secondary: {
          DEFAULT: '#ccc2dc',
          container: '#b600f8',
        },
        on: {
          surface: '#e5e2e3',
          'surface-variant': '#cac4cf',
          primary: '#003739',
          'primary-fixed': '#002022',
          secondary: '#332d41',
        },
        outline: {
          DEFAULT: '#948f99',
          variant: '#49474a',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        // Accent shortcuts
        cyan: {
          DEFAULT: '#00f0ff',
          light: '#dbfcff',
          dark: '#003739',
        },
        violet: {
          DEFAULT: '#b600f8',
          light: '#ccc2dc',
        },
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'inter': ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
        'title-lg': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'title-md': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
        'label-md': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
        'label-sm': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(0, 240, 255, 0.3)',
        'glow-cyan-lg': '0 0 30px rgba(0, 240, 255, 0.25)',
        'glow-violet': '0 0 15px rgba(182, 0, 248, 0.3)',
        'glow-violet-lg': '0 0 30px rgba(182, 0, 248, 0.25)',
        'ambient': '0 4px 40px -10px rgba(229, 226, 227, 0.04)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'progress-fill': 'progressFill 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'stagger-in': 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)' },
          '100%': { opacity: '1', boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scrollLine: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(12px)', opacity: '0.3' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
      transitionTimingFunction: {
        'obsidian': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
};
