(function () {
  'use strict'
  const extBaseUrl = document.documentElement.getAttribute('dm-url')
    ;(async () => {
    if (!extBaseUrl) {
      throw new Error('before-init-world.js not loaded')
    }
    await import(`${extBaseUrl}world.js`)
    document.documentElement.removeAttribute('dm-url')
  })().catch(console.error)
})()
