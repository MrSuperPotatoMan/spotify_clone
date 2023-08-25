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
      },
      colors: {
        'primary': '#1db954',
        'base-gray': '#171717',
        'base-gray-lighter': '#1a1a1a',
        'font-base': '#fffff',
        'font-gray': '#6b7280'
      },
      boxShadow: {
        'default': '0px 0px 6px 0px #050505'
      }
    },
  },
}
