/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      primary: '#0095DA',
      black: '#000000',
      white: '#FFFFFF',
      blue: {
        100: '#E6F5FF',
        200: '#BFE6FF',
        300: '#99D6FF',
        400: '#4DC0FF',
        500: '#00A6FF',
        600: '#0095DA',
        700: '#006699',
        800: '#004D66',
        900: '#00334D',
      },
      gray: {
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },
    },
  },
  plugins: [],
};
