import { defineConfig } from 'tsup'
import { upperFirst } from 'scule'
import pkg from './package.json'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  format: ['esm', 'cjs', 'iife'],
  globalName: upperFirst(pkg.name),
  target: 'es6',
  platform: 'neutral',
  minify: 'terser',
  dts: true,
})
