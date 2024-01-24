module.exports = {
	root: true,
	extends: ['share/nest'],
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	ignorePatterns: ['.eslintrc.js'],
}
