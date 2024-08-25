import react from '@vitejs/plugin-react'
import { getDefinesObject } from '@apad/env-tools/lib/bundler.js'
import { defineConfig } from 'vite'
import { pr } from './utils.mjs'
import vitePluginSvgr from './plugin/svgr-vite'

export default defineConfig({
  plugins: [
    vitePluginSvgr(),
    react(),
  ],
  resolve: {
    alias: {
      '@': pr('../src'),
    },
  },
  define: {
    ...getDefinesObject('dev'),
  },
})
