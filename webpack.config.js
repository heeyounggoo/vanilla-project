const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/App.js',
  output: {
    path: __dirname + '/public',
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
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
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
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