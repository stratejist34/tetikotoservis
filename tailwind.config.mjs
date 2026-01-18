import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Renk tanımları
      colors: {
        primary: {
          DEFAULT: '#1e3a8a', // Koyu mavi (navbar)
          light: '#3b82f6',   // Açık mavi (hero)
          dark: '#1e2a4a',    // Çok koyu mavi
        },
        accent: {
          DEFAULT: '#f97316',  // Turuncu (butonlar)
          hover: '#fb923c',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Manrope', 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['"ManifoldExtended"', 'sans-serif'],
        sport: ['"Exo 2"', 'sans-serif'],
      },
      fontSize: {
        'base': '16px',
        'h1': '28px',
        'h2': '24px',
        'h3': '20px',
        'h4': '18px',
        'h5': '16px',
        'h6': '14px',
      },

      // Transition efektleri - Mikro-animasyonlar için optimize
      transitionDuration: {
        DEFAULT: '300ms',
        fast: '150ms',
        slow: '500ms',
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },

      // Transition easing fonksiyonları
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'sharp': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      // Transform ölçekleri
      scale: {
        DEFAULT: '1',
        '5': '0.05',
        '10': '0.1',
        '25': '0.25',
        '50': '0.5',
        '75': '0.75',
        '90': '0.9',
        '95': '0.95',
        '105': '1.05',
        '110': '1.1',
        '125': '1.25',
        '150': '1.5',
      },

      // Opacity seviyeleri
      opacity: {
        '1': '0.01',
        '2': '0.02',
        '3': '0.03',
        '4': '0.04',
        '5': '0.05',
        '10': '0.1',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
      },

      // Z-index seviyeleri
      zIndex: {
        auto: 'auto',
        base: '1',
        docked: '10',
        dropdown: '1000',
        sticky: '1100',
        banner: '1200',
        overlay: '1300',
        modal: '1400',
        popover: '1500',
        skip: '1600',
        toast: '1700',
        header: '1800',
        floating: '1900',
        fixed: '2000',
      },

      // Animasyon keyframes - Optimized: Only essential animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },

      // Animasyon tanımları - Optimized: Only essential animations
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'pulse': 'pulse 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
      },

      // Will-change optimizasyonları - minimal
      willChange: {
        'auto': 'auto',
        'transform': 'transform',
        'opacity': 'opacity',
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1200px',
      },
    },
  },
  plugins: [
    typography({
      rtl: false,
      DEFAULT: {
        css: {
          h1: {
            fontSize: '28px',
            lineHeight: '1.2',
          },
          h2: {
            fontSize: '24px',
            lineHeight: '1.3',
          },
          h3: {
            fontSize: '20px',
            lineHeight: '1.4',
          },
          h4: {
            fontSize: '18px',
            lineHeight: '1.4',
          },
          h5: {
            fontSize: '16px',
            lineHeight: '1.5',
          },
          h6: {
            fontSize: '14px',
            lineHeight: '1.5',
          },
        },
      },
    }),
  ],
}
