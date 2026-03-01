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
          lilac: {
            light: '#e2d9f0',
            mid: '#c7b6de',
            dark: '#6b4d91',
            soft: '#f3eef9',
          },
          text: {
            dark: '#1a1a1a',
            muted: '#6a6670',
          },
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'silk-gradient': 'linear-gradient(120deg, #e2d9f0, #ffffff, #f0e9f9)',
        'button-gradient': 'linear-gradient(to right, #c7b6de, #bda8d8)',
        'announcement-gradient': 'linear-gradient(90deg, #d8c9ea, #c9b7df, #d8c9ea)',
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
