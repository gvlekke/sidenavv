import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-server';
import sass from 'rollup-plugin-sass';

import { browser as browserModulePath, module as esModulePath, main as cjsModulePath } from './package.json';

const environment = process.env.NODE_ENV;
const isProduction = environment === 'production';
const showSourceMaps = environment === 'development';
const sourcemap = showSourceMaps ? 'inline' : false;

export default commandLineArgs => {
  return {
    input: 'src/index.js',
    output: [
      {
        file: esModulePath,
        format: 'esm',
        sourcemap
      },
      {
        file: cjsModulePath,
        format: 'cjs',
        sourcemap
      },
      {
        file: browserModulePath,
        format: 'iife',
        name: 'SimpleMathLibrary',
        sourcemap
      }
    ],
    plugins: [
      replace({
        ENVIRONMENT: JSON.stringify(environment)
      }),
      resolve(),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {}
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      terser(),
      sass({
        output: true
      }),
      !isProduction &&
        serve({
          contentBase: ['dist', 'static']
        })
    ],
    external: [],
    watch: {
      include: ['src/**'],
      exclude: 'node_modules/**',
      clearScreen: true,
      chokidar: {
        usePolling: true
      }
    }
  };
};
