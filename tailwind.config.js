/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'logo': "url('../public/img/sss_logo.png')"
      },
      colors: {
        'solidGray': 'rgb(53, 53, 53)',
        'accentRed': 'rgb(138, 54, 84)',
        'accentGold': 'rgb(233, 200, 98)',
        'juliaGreen': 'rgb(84, 110, 69)',
        'jacobBlue': 'rgb(112, 142, 154)',
      },
      dropShadow: {
        'mid': '0 10px 3px rgba(0,0,0,0.95)',
        'close': '0 5px 3px rgba(0,0,0,0.95)'
      },
      fontFamily: {
        'dinRegular': ['"D-DIN condensed"'],
        'dinBold': ['"D-DIN bold"']
      },
      fontSize: {
        'veryLarge': '12rem'
      }
    },
  },
  plugins: [],
}
