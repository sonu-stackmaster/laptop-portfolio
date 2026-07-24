/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          glow: '#8b5cf6',
          darkBg: '#090514',
          cardBg: 'rgba(23, 15, 38, 0.75)',
        },
        orange: {
          glow: '#f97316',
          paleBg: '#faf5ef',
          cardBg: 'rgba(255, 255, 255, 0.85)',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'blur(60px)' },
          '50%': { opacity: '1', filter: 'blur(90px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
