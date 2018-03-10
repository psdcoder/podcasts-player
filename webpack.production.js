const { join, resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  dist: resolve(__dirname, 'build'),
  public: resolve(__dirname, 'public'),
  src: resolve(__dirname, 'src'),
  nodeModules: resolve(__dirname, 'node_modules'),
};

module.exports = {
  mode: 'production',
  entry: join(paths.src, 'index.jsx'),
  output: {
    path: paths.dist,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: paths.nodeModules,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [paths.src, paths.nodeModules],
  },
  plugins: [
    new CleanWebpackPlugin(paths.dist),
    new HtmlWebpackPlugin({
      template: join(paths.public, 'index.tpl.html'),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
};
