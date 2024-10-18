/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			russianGreen: {
				DEFAULT: '#6D986E',
				light: '#8FB28F',
				dark: '#4F7250',
			},
			page: {
				DEFAULT: '#f2e6cd',
				dark: '#5a4517',
			},
			brass: {
				DEFAULT: '#B19746',
				light: '#C1A85F',
				dark: '#8A7535',
			},
			coolBlack: {
				DEFAULT: '#002D66',
				light: '#00408A',
				dark: '#001F4D',
			},
			black: '#000000',
		},
	},
	plugins: [],
}
