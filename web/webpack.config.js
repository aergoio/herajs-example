const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        'regenerator-runtime/runtime',
        './web/src/index.js',
    ],
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          },
        ]
        },
      ]
    },
    resolve: {
      alias: {
        'herajs$': 'herajs/dist/herajs.js'
      },
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          name: 'vendor',
        },
    },
    devServer: {
        open: true
    }
};