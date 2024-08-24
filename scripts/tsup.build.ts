import { defineConfig } from 'tsup'
import { getDefinesObject } from '@apad/env-tools/lib/bundler.js'
import { shareConfig } from './tsup.shared'

const customDefine = getDefinesObject('prod')
delete customDefine['process.env']

export default defineConfig({
  ...shareConfig,
  treeshake: true,
  minify: true,
  sourcemap: false,
  define: {
    ...(shareConfig as any).define,
    ...customDefine,
  },
})
