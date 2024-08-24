import packageJson from '../package.json'

const version = packageJson.version

export const manifest: chrome.runtime.ManifestV3 = {
  name: '__MSG_appName__',
  description: '__MSG_appDesc__',
  author: {
    email: 'apad2@qq.com',
  },
  manifest_version: 3,
  version,
  action: {
    default_popup: 'popup.html',
  },
  host_permissions: ['<all_urls>'],
  background: {
    service_worker: 'background.js',
    type: 'module',
  },
  content_scripts: [
    {
      js: ['static/lib/before-init-world.js'],
      run_at: 'document_start',
      matches: ['<all_urls>'],
    },
    {
      js: ['static/lib/entry-world.js'],
      run_at: 'document_start',
      world: 'MAIN',
      matches: ['<all_urls>'],
    },
    {
      matches: ['<all_urls>'],
      js: ['static/lib/entry-all-frames.js'],
      run_at: 'document_end',
      all_frames: true,
    },
    {
      matches: ['<all_urls>'],
      js: ['static/lib/entry-main.js'],
      run_at: 'document_end',
    },
  ],
  default_locale: 'en',
}
