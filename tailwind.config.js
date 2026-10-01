/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          cream: '#F4ECD8',
          orange: '#FF5E3A',
          teal: '#00A896',
          yellow: '#FFC857',
          dark: '#1C1A17',
          blue: '#2B59C3',
        }
      },
      fontFamily: {
        sans: ['Space Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'retro': '8px 8px 0px 0px rgba(28,26,23,1)',
        'retro-sm': '4px 4px 0px 0px rgba(28,26,23,1)',
        'retro-hover': '12px 12px 0px 0px rgba(28,26,23,1)',
        'retro-active': '4px 4px 0px 0px rgba(28,26,23,1)',
      }
    },
  },
  plugins: [],
}
