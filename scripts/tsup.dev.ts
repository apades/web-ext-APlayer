import { defineConfig } from 'tsup'
import { getDefinesObject } from '@apad/env-tools/lib/bundler.js'
import { shareConfig } from './tsup.shared'

const customDefine = getDefinesObject('dev')
delete customDefine['process.env']

export default defineConfig({
  ...shareConfig,
  treeshake: false,
  minify: false,
  watch: true,
  sourcemap: 'inline',
  define: {
    ...(shareConfig as any).define,
    ...customDefine,
  },
  splitting: false,
})
