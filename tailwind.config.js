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
            screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1440px',
			},
            colors: {
				primary: '#222222',
				secondary: '#BFBFBF',
			},
            fontFamily: {
				serif: ['var(--font-serif)', ...fontFamily.serif],
			},
            fontSize: {
                sm: ['14px', '20px'],
                base: ['16px', '24px'],
                lg: ['18px', '24px'],
                xl: ['20px', '24px'],
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
            keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'fade-in': {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0)',
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-in': 'slide-in 1s ease-in',
				'fade-in': 'fade-in 0.5s ease-in-out',
			},
        },
      },
      plugins: [],
}
