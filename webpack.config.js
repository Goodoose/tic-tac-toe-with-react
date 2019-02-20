const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    index: './src/js/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['index'],
    }),
    new CleanWebpackPlugin(['dist/*']),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
};
