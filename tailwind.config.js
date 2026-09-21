/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FCFAF6',
        'ivory-dark': '#F5EFE6',
        cream: '#F7F3EB',
        sand: '#EAE2D5',
        mocha: {
          light: '#8C6D52',
          DEFAULT: '#5A4231',
          dark: '#3D2A1D',
          deep: '#281C13',
        },
        gold: {
          light: '#E6CF9B',
          DEFAULT: '#B89758',
          dark: '#8C6E36',
        },
        terracotta: '#A65B44',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(90, 66, 49, 0.08)',
        card: '0 15px 35px rgba(90, 66, 49, 0.12)',
        lift: '0 20px 40px rgba(90, 66, 49, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
