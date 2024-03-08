import type { Config } from 'tailwindcss'
import animations from '@midudev/tailwind-animations'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        success: '#00A550',
        error: '#E93E40',
        primary: '#167DB7',
        primaryL1: '#5CA4CD',
        GrayL3: '#F5F5F5',
        GrayL2: '#B8B8B8',
        GrayD4: '#484B4D',
        secondary: '#FF6340',
        alert: '#F1C40F'
      }
    }
  },
  plugins: [animations]
}
export default config
