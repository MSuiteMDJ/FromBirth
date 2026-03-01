import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Limit scanning to the UI package's source/components directory to avoid
    // matching pnpm workspace symlinks inside node_modules which degrades
    // performance during build.
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
    // Explicitly exclude node_modules if any broader patterns remain
    '!**/node_modules/**',
  ],
  theme: {
    extend: {
      colors: {
        fb: {
          lilac: '#B49BCC',
          hitPink: '#E8B4B8',
          hitBlue: '#B8C6E8',
          text: {
            dark: '#2D2D2D',
            muted: '#4A4A4A',
          },
          offWhite: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ['Helvetica', 'Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        /* removed silk gradients for minimalist direction */
      },
      backdropBlur: {
        'glass': '14px',
      },
      letterSpacing: {
        luxury: '0.07em',
        wide: '0.1em',
      },
    },
  },
  plugins: [],
}
export default config
