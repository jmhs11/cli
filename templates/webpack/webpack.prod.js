const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg|webp|ico|gif)$/i,
        use: 'image-webpack-loader',
      },
    ],
  },
});
