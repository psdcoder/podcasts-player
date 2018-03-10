const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  dist: resolve(__dirname, 'build'),
  public: resolve(__dirname, 'public'),
  src: resolve(__dirname, 'src'),
  nodeModules: resolve(__dirname, 'node_modules'),
};

module.exports = {
  mode: 'development',
  entry: join(paths.src, 'index.jsx'),
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
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
    new HtmlWebpackPlugin({
      template: join(paths.public, 'index.tpl.html'),
    }),
  ],
};
