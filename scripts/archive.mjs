import fs from 'fs-extra'
import archiver from 'archiver'
import packageData from '../package.json' assert { type: 'json' }
import { pr } from './utils.mjs'

const getBuildName = ver => `build-${ver}.zip`
const codeBuildOutDir = pr('../dist')
const zipOutDir = pr('../build')
if (!fs.existsSync(zipOutDir)) {
  fs.mkdirSync(zipOutDir)
}

async function main() {
  const version = packageData.version
  const archive = archiver('zip', {
    zlib: { level: 9 },
  })
  archive.pipe(fs.createWriteStream(pr(zipOutDir, getBuildName(version))))
  archive.directory(codeBuildOutDir, false)
  await archive.finalize()
}

main()
