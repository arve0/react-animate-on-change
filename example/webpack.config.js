var path = require('path')

module.exports = {
  context: path.resolve(__dirname),
  entry: [
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
}
