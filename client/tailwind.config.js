/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#09090B",
          card: "#18181B",
          cardHover: "#27272A",
          border: "#27272A",
          cyan: "#00E5FF",
          red: "#FF3B30",
          yellow: "#FFC107",
          green: "#00C853",
          purple: "#A855F7"
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'radar': 'radarSweep 4s linear infinite',
        'emergency-strobe': 'strobeBg 1s infinite alternate',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 229, 255, 0.8)' }
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        strobeBg: {
          '0%': { backgroundColor: 'rgba(255, 59, 48, 0.05)', borderColor: 'rgba(255, 59, 48, 0.4)' },
          '100%': { backgroundColor: 'rgba(255, 59, 48, 0.25)', borderColor: 'rgba(255, 59, 48, 0.9)' }
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        }
      }
    },
  },
  plugins: [],
}
