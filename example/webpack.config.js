var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'index.tsx'),
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  mode: 'development'
}
