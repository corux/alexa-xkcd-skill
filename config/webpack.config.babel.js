import Path from 'path';
import BabiliPlugin from 'babili-webpack-plugin';

const path = (...parts) => Path.join(__dirname, '..', ...parts);

export default {
  entry: {
    index: ['babel-polyfill', path('src', 'index.js')]
  },
  // devtool: 'source-map',
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    library: 'handler',
    filename: '[name].js',
    path: path('build')
  },
  module: {
    rules: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new BabiliPlugin()
  ]
};
