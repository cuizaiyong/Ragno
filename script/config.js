const path = require('path');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const { extractArgv } = require('./args');
/**
 * @type {import('webpack').Configuration}
 */
const webpack = {
  entry: resolve('src/index.ts'),
  watch: extractArgv(process).includes('watch'),
  output: {
    path: resolve('dist'),
    library: 'Panamera',
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
  }),
  'panamera.amd': merge(webpack, {
    mode: 'none',
    output: { libraryTarget: 'amd', filename: 'panamera.amd.js' },
  }),
  'panamera.amd.min': merge(webpack, {
    mode: 'production',
    output: { libraryTarget: 'amd', filename: 'panamera.amd.min.js' },
  }),
  'panamera.cjs': merge(webpack, {
    mode: 'none',
    output: { libraryTarget: 'commonjs', filename: 'panamera.cjs.js' },
  }),
  'panamera.cjs.min': merge(webpack, {
    mode: 'production',
    output: { libraryTarget: 'commonjs', filename: 'panamera.cjs.min.js' },
  }),
};

function join(filename) {
  return path.join(__dirname, '..', filename);
}
