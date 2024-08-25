/**
 * 参考自 {@link https://github.com/pd4d10/vite-plugin-svgr/blob/main/src/index.ts}
 */
import fs from 'node:fs'
import type { FilterPattern } from '@rollup/pluginutils'
import { createFilter } from '@rollup/pluginutils'
import type { Config } from '@svgr/core'
import type { Plugin } from 'vite'
import { transformWithEsbuild } from 'vite'

export interface VitePluginSvgrOptions {
  svgrOptions?: Config
  esbuildOptions?: Parameters<typeof transformWithEsbuild>[2]
  exclude?: FilterPattern
  include?: FilterPattern
}

export default function vitePluginSvgr({
  svgrOptions,
  esbuildOptions,
  include = '**/*.svg?svg',
  exclude,
}: VitePluginSvgrOptions = {}): Plugin {
  const filter = createFilter(include, exclude)
  const postfixRE = /[?#].*$/

  return {
    name: 'vite-plugin-svgr',
    enforce: 'pre', // to override `vite:asset`'s behavior
    async load(id) {
      if (filter(id)) {
        const { transform } = await import('@svgr/core')
        const { default: jsx } = await import('@svgr/plugin-jsx')

        const filePath = id.replace(postfixRE, '')
        const svgCode = await fs.promises.readFile(filePath, 'utf8')

        const componentCode = await transform(svgCode, svgrOptions, {
          filePath,
          caller: {
            defaultPlugins: [jsx],
          },
        })

        const res = await transformWithEsbuild(componentCode, id, {
          loader: 'jsx',
          ...esbuildOptions,
        })

        return {
          code: res.code,
          map: null, // TODO:
        }
      }
    },
  }
}
