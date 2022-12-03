// @ts-check

const defaults = require('tailwindcss/defaultTheme');

/** @type {import("tailwindcss").Config } */
module.exports = {
	content: ['./src/**/*.{tsx,ts,css}'],

	theme: {
		fontFamily: {
			mono: ['"JetBrains Mono"', ...defaults.fontFamily.mono],
			sans: ['"GeneralSans-Variable"', ...defaults.fontFamily.sans],
		},
	},

	plugins: [],
};
