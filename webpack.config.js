module.exports = {
  entry: {
		hive: './src/hive.js',
		Tone: './lib/Tone.js',
  },
  output: {
		filename: '[name]-bundle.js',
		// path: '.',
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
		]
	}
};