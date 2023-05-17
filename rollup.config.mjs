import resolve, { nodeResolve } from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import commonjs from "@rollup/plugin-commonjs"
import json from 'rollup-plugin-json'
import cleaner from 'rollup-plugin-cleaner';
import {uglify} from 'rollup-plugin-uglify'
import svg from 'rollup-plugin-svg'
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
        exports: 'auto'
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].esm.js'
      },
      {
        dir: 'dist',
        format: 'umd',
        name: 'Utils',
        entryFileNames: '[name].umd.js'
      }
    ],
    plugins: [resolve(), commonjs(), webWorkerLoader(), typescript({
      // ./__tests__/.* doesn't work
      exclude: ["**/__tests__", "**/*.test.ts", 'jest.config.ts']
    }), json(), svg(), cleaner({
      targets: [
        './dist/'
      ]
    })]
  },
  {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'umd',
      name: 'Utils',
      entryFileNames: '[name].umd.min.js'
    },
    plugins: [resolve(), commonjs(), webWorkerLoader(), typescript({
      exclude: ["**/__tests__", "**/*.test.ts", 'jest.config.ts']
    }), json(), svg({
      base64: true
    }), uglify()]
  },
  /* 单独生成声明文件 */
  {
    input: './src/index.ts',
    plugins: [dts()],
    output: {
      format: 'esm',
      file: 'dist/index.d.ts',
    },
  }
]
