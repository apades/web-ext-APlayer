import path from 'node:path'
import type { defineConfig } from 'tsup'
import fs from 'fs-extra'
import esbuildMetaUrl from '@chialab/esbuild-plugin-meta-url'
// import svgrPlugin from 'esbuild-plugin-svgr'
import { manifest } from '../src/manifest'
import inlineImport from './plugin/inlineImport'
import svgrPlugin from './plugin/svgr'

export const pr = (...p: any) => path.resolve(__dirname, ...p)

export const tsconfig = pr('../tsconfig.json')
export const outDir = pr('../dist')

export const shareConfig: Parameters<typeof defineConfig>[0] = {
  esbuildPlugins: [
    svgrPlugin(),
    inlineImport(),
    esbuildMetaUrl({}),
  ],
  esbuildOptions(options) {
    options.alias ??= {}
    Object.assign(options.alias, {
      '@': pr('../src'),
    })
  },
  outExtension() {
    return {
      js: `.js`,
    }
  },
  target: 'esnext',
  tsconfig,
  splitting: true,
  format: 'esm',
  clean: true,
  shims: true,
  outDir,
  entry: {
    'background': pr('../src/background/index.ts'),
    // 包含player的cs
    'main': pr('../src/content-scripts/main.tsx'),
    // 注入world: main的脚本
    'world': pr('../src/content-scripts/world.ts'),
    // 修改cs的clog脚本
    'all-frames': pr('../src/content-scripts/all-frames.ts'),
    // popup的脚本
    'popup': pr('../src/popup/index.tsx'),
    'style': pr('../src/styles/index.ts'),
  },
  noExternal: [/(.*)/],
  async onSuccess() {
    fs.copySync(pr('../_locales'), pr(outDir, './_locales'))
    fs.copySync(pr('../static'), pr(outDir, './static'))

    manifest.web_accessible_resources ??= []
    manifest.web_accessible_resources.push({
      resources: fs.readdirSync(pr(outDir)),
      matches: ['<all_urls>'],
    })
    fs.writeJSONSync(pr(outDir, './manifest.json'), manifest, { spaces: 2 })

    const popupHtmlFile = pr('../src/popup/index.html')
    const popupHtmlText = fs
      .readFileSync(popupHtmlFile, 'utf-8')
      .replace(
        '<script src="./index.tsx" type="module"></script>',
        '<script src="./popup.js" type="module"></script>',
      )
    fs.writeFileSync(pr(outDir, './popup.html'), popupHtmlText, 'utf-8')
  },
  define: {
    'process.env.NODE_ENV': process.env.NODE_ENV
      ? `"${process.env.NODE_ENV}"`
      : '"development"',
  },
  platform: 'browser',
}

export { manifest }
