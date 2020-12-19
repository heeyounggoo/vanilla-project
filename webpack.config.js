const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: __dirname + '/public',
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wallet',
      template: 'src/index.html',
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
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      }
    ],
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/')
    }
  },
  devServer: {
    contentBase:'./public',
    proxy: {
      '/api': {
        target: 'http://localhost:5000/'
      }
    },
    open: true
  }
}