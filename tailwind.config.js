import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#167db7',
          300: '#5eb2e6'
        },
        secondary: {
          DEFAULT: '#ff6340'
        },
        success: '#00A550',
        error: '#E93E40',
        primaryL1: '#5CA4CD',
        GrayL3: '#F5F5F5',
        GrayL2: '#B8B8B8',
        GrayD4: '#484B4D',
        alert: '#F1C40F'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [animations]
}
export default config
