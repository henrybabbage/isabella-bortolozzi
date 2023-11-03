/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {
            colors: {
				primary: '#222222',
				secondary: '#BFBFBF',
			},
            fontFamily: {
				serif: ['var(--font-serif)', ...fontFamily.serif],
			},
			zIndex: {
				100: '100',
				200: '200',
				300: '300',
				400: '400',
				500: '500',
				600: '600',
				700: '700',
				800: '800',
				900: '900',
				1000: '1000',
			},
        },
      },
      plugins: [],
}
