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
        heading: ['Kanit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
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
      
      // Animasyon keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(50px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        'bounce': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '70%': { transform: 'scale(0.9)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-5px)' },
          '20%': { transform: 'translateX(5px)' },
          '30%': { transform: 'translateX(-5px)' },
          '40%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '60%': { transform: 'translateX(5px)' },
          '70%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(3px)' },
          '90%': { transform: 'translateX(-1px)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(59, 130, 246, 0.5)' },
        },
        'glow-orange': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(249, 115, 22, 0.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'wobble': {
          '0%, 100%': { transform: 'translateX(0%)' },
          '15%': { transform: 'translateX(-25%) rotate(-5deg)' },
          '30%': { transform: 'translateX(20%) rotate(3deg)' },
          '45%': { transform: 'translateX(-15%) rotate(-3deg)' },
          '60%': { transform: 'translateX(10%) rotate(2deg)' },
          '75%': { transform: 'translateX(-5%) rotate(-1deg)' },
        },
        'spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.05)' },
        },
        'breathing': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        'text-focus-in': {
          '0%': { filter: 'blur(12px)', opacity: '0' },
          '100%': { filter: 'blur(0px)', opacity: '1' },
        },
        'text-pop': {
          '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
          '50%': { transform: 'scale(1.05) translateY(-5px)', opacity: '0.8' },
          '100%': { transform: 'scale(1) translateY(0px)', opacity: '1' },
        },
        'reveal-from-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'reveal-from-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'stagger-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      
      // Animasyon tanımları
      animation: {
        // Temel giriş animasyonları
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-fast': 'fade-in 0.3s ease-out forwards',
        'fade-in-slow': 'fade-in 0.8s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'slide-left': 'slide-left 0.5s ease-out forwards',
        'slide-right': 'slide-right 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'scale-out': 'scale-out 0.4s ease-in forwards',
        
        // Döngü animasyonları
        'pulse': 'pulse 2s infinite',
        'pulse-scale': 'pulse-scale 2s infinite',
        'bounce': 'bounce 1s infinite',
        'bounce-in': 'bounce-in 0.9s ease-out forwards',
        'shake': 'shake 0.8s ease-in-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-orange': 'glow-orange 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'wobble': 'wobble 1.5s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'spin-slow': 'spin-slow 2s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'breathing': 'breathing 3s ease-in-out infinite',
        
        // Metin animasyonları
        'text-focus-in': 'text-focus-in 0.8s ease-out forwards',
        'text-pop': 'text-pop 0.6s ease-out forwards',
        
        // Reveal efektleri
        'reveal-from-left': 'reveal-from-left 0.6s ease-out forwards',
        'reveal-from-right': 'reveal-from-right 0.6s ease-out forwards',
        
        // Stagger efektleri
        'stagger-fade-in': 'stagger-fade-in 0.6s ease-out forwards',
        
        // Mobil için optimize edilmiş animasyonlar
        'fade-in-mobile': 'fade-in 0.3s ease-out forwards',
        'slide-up-mobile': 'slide-up 0.4s ease-out forwards',
        'scale-in-mobile': 'scale-in 0.3s ease-out forwards',
      },
      
      // Will-change optimizasyonları
      willChange: {
        'auto': 'auto',
        'scroll': 'scroll-position',
        'contents': 'contents',
        'transform': 'transform',
        'opacity': 'opacity',
        'transform-opacity': 'transform, opacity',
        'transform-opacity-filter': 'transform, opacity, filter',
      },
      
      // Motion-reduce desteği
      animationDuration: {
        DEFAULT: '300ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
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
