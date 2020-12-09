const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: __dirname + '/public',
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/')
    }
  },
  devServer: {
    contentBase:'./public',
    open: true
  }
}