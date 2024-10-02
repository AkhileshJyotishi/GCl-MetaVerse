import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "url('/home-bg.jpg')",
        "mobile-hero-pattern": "url(/render-copy-1.jpg)",

        "instructions-bg": "url('/instructions-bg.png')",

      },
      backgroundPosition: {
        bottom: 'bottom',
        'bottom-4': 'center bottom 1rem',
        center: 'center',
        left: 'left',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        right: 'right',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
        top: 'top',
        'top-4': 'center top 1rem',
        "50% 0%": "50% 0%"
      },
      backgroundSize: {
        "250%": "250%",
        "val": "250%"
      },
      keyframes: {
        zoom: {
          '0%': { backgroundSize: '100%' },
          '100%': { backgroundSize: '150%' },
        },
        scaleBg: {
          '0%': { transform: 'scale(1)' },   // Start at original size
          '100%': { transform: 'scale(2)' }, // Scale to 200%
        },
      },
      animation: {
        'slow-zoom': 'zoom 30s ease-in-out infinite',
        'scale-bg': 'scaleBg 30s ease-in-out infinite',
      },

    },
  },
  plugins: [],
};
export default config;
