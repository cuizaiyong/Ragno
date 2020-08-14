const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('path');
const { extractArgv } = require('./args');
/**
 * @type {import('webpack').Configuration}
 */
const webpack = {
  entry: resolve('src/index.ts'),
  watch: extractArgv(process).includes('watch'),
  devtool: extractArgv(process).includes('watch') ? 'cheap-module-eval-source-map' : 'none',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    path: resolve('dist'),
    library: 'panamera',
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: { loader: 'babel-loader' } }],
  },
};
exports.platform = {
  panamera: merge(webpack, {
    mode: 'none',
    output: { libraryTarget: 'umd', filename: 'panamera.js' },
  }),
  'panamera.min': merge(webpack, {
    mode: 'production',
    output: { libraryTarget: 'umd', filename: 'panamera.min.js' },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
  }),
  'panamera.amd': merge(webpack, {
    mode: 'none',
    output: { libraryTarget: 'amd', filename: 'panamera.amd.js' },
  }),
  'panamera.amd.min': merge(webpack, {
    mode: 'production',
    output: { libraryTarget: 'amd', filename: 'panamera.amd.min.js' },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
  }),
  'panamera.cjs': merge(webpack, {
    mode: 'none',
    output: { libraryTarget: 'commonjs2', filename: 'panamera.cjs.js' }
  }),
  'panamera.cjs.min': merge(webpack, {
    mode: 'production',
    output: { libraryTarget: 'commonjs2', filename: 'panamera.cjs.min.js' },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
  }),
};

function join(filename) {
  return path.join(__dirname, '..', filename);
}
