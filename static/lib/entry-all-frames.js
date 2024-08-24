(function () {
  'use strict';
  (async () => {
    await Promise.all([
      import(chrome.runtime.getURL('all-frames.js')),
    ])
  })().catch(console.error)
})()
