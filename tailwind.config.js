/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Fresh wellness green (accent + buttons)
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Warm off-white page surfaces
        sand: {
          50: '#fdfdfb',
          100: '#faf9f5',
          200: '#f4f2ea',
          300: '#ece9dd',
        },
        // Dark green-tinted neutrals for text
        ink: {
          900: '#14201b',
          800: '#1f2d27',
          700: '#33433b',
          600: '#4a5a51',
          500: '#6b7a72',
          400: '#94a199',
          300: '#b8c2bb',
        },
        accent: '#65a30d',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,32,27,0.04), 0 8px 24px -12px rgba(20,32,27,0.12)',
        'soft-lg': '0 30px 60px -25px rgba(20,32,27,0.22)',
        ring: '0 0 0 1px rgba(20,32,27,0.05)',
        glow: '0 0 0 1px rgba(34,197,94,0.25), 0 8px 30px -8px rgba(34,197,94,0.45)',
        'glow-sm': '0 0 18px -4px rgba(34,197,94,0.55)',
        nav: '0 8px 40px -8px rgba(20,32,27,0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.7)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
      },
    },
  },
  plugins: [],
}
