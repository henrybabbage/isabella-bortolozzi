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
                background: '#f4f3ef',
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
				'fade-out': {
					'100%': {
						opacity: '1',
					},
					'0%': {
						opacity: '0',
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
				'slide-in': {
					'0%': {
						transform: 'translateY(100vh)',
					},
					'100%': {
						transform: 'translateY(0%)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide-in': 'slide-in 0.5s ease-in',
				'fade-in': 'fade-in 0.3s ease-in-out',
				'fade-out': 'fade-out 0.3s ease-in-out',
			},
        },
      },
      plugins: [
        plugin(function ({ addUtilities }) {
			addUtilities(
				{
					'.scrollbar-hide': {
						/* IE and Edge */
						'-ms-overflow-style': 'none',

						/* Firefox */
						'scrollbar-width': 'none',

						/* Safari and Chrome */
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					},

					'.scrollbar-default': {
						/* IE and Edge */
						'-ms-overflow-style': 'auto',

						/* Firefox */
						'scrollbar-width': 'auto',

						/* Safari and Chrome */
						'&::-webkit-scrollbar': {
							display: 'block',
						},
					},
				},
				['responsive']
			)
		}),
        plugin(({ matchUtilities, theme }) => {
            matchUtilities(
                {
                    "animation-delay": (value) => {
                        return {
                            "animation-delay": value,
                        };
                    },
                },
                {
                    values: theme("transitionDelay"),
                }
            );
        }),
    ],
}
