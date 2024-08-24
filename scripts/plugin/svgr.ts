/**
 * 参考自 {@link https://github.com/kazijawad/esbuild-plugin-svgr/blob/main/src/index.js}
 */
import fs, { readFile } from 'node:fs/promises'
import path from 'node:path'
import { transform } from '@svgr/core'
import type { EsbuildPlugin } from './types'

export default function svgrPlugin(): EsbuildPlugin {
  return {
    name: 'svgr',
    setup(build) {
      const filter = /\.svg\?svg$/
      const alias = Object.entries(build.initialOptions.alias ?? {}) as [
        `${string}`,
        `${string}`,
      ][]

      build.onResolve({ filter }, async (args) => {
        // 处理alias
        const inputPath = alias.reduce((inputPath, [key, val]) => {
          if (!inputPath.includes(key))
            return inputPath
          return path.resolve(val, inputPath.replace(key, '.'))
        }, args.path)
        let filePath = path.resolve(args.resolveDir, inputPath)

        try {
          await fs.access(filePath)
        }
        catch {
          filePath = path.resolve(
            args.resolveDir,
            inputPath.replace(filter, ''),
          )
        }

        return {
          path: `${filePath}.svg?svg`,
        }
      })

      build.onLoad({ filter }, async (args) => {
        const inputPath = args.path.replace('?svg', '')
        const svg = await readFile(inputPath, { encoding: 'utf8' })

        const contents = await transform(svg, {
          plugins: ['@svgr/plugin-jsx'],
        }, { filePath: inputPath })

        return {
          contents,
          loader: 'jsx',
        }
      })
    },
  }
}
