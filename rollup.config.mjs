import resolve, { nodeResolve } from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import commonjs from "@rollup/plugin-commonjs"
import json from 'rollup-plugin-json'
import cleaner from 'rollup-plugin-cleaner';
import {uglify} from 'rollup-plugin-uglify'
import svg from 'rollup-plugin-svg'
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import dts from 'rollup-plugin-dts';
import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  {
    input: Object.fromEntries(
      glob.sync('src/**/*.ts').filter(file => !file.includes('/types/') && !file.includes('/worker/')).map(file => [
        // This remove `src/` as well as the file extension from each
        // file, so e.g. src/nested/foo.js becomes nested/foo
        path.relative(
          'src',
          file.slice(0, file.length - path.extname(file).length)
        ),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url))
      ])
    ),
    output: [
      {
        dir: 'dist',
        format: 'esm',
      }
    ],
    plugins: [resolve(), commonjs(), webWorkerLoader(), typescript({
      // ./__tests__/.* doesn't work
      exclude: ["**/__tests__", "**/*.test.ts", 'jest.config.ts']
    }), json(), svg()]
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
