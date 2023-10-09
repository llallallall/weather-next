import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    extend: {
      colors: {
        primary: '#06283d',
        secondary: '#dff6ff'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s 0.5s forwards'
      },
      keyframes: {
        fadeIn: {
          // '0%': {
          //   scale: '0',
          //   opacity: '0',
          // },
          'to': {
            scale: '1',
            opacity: '1',
          },
        },
      }
    },
  },
  plugins: [],
}
export default config
