const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    assetModuleFilename: '[name][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.m?js$/i,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|svg|webp|ico|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new DotenvWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
