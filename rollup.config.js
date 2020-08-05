import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const plugins = [typescript(), resolve(), commonjs()];

function isProduction(env = 'production') {
  return process.env.NODE_ENV === env;
}

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: isProduction() ? 'umd' : 'esm',
    name: 'panamera',
  },
  plugins: isProduction()
    ? [
        ...plugins,
        babel({
          extensions: ['.ts'],
          babelHelpers: 'runtime',
          skipPreflightCheck: true,
        }),
        terser(),
      ]
    : plugins,
};
