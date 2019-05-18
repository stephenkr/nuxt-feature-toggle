const { resolve } = require('path')

async function featureToggleModule (moduleOptions) {
  const options = {
    ...this.options['feature-toggle'],
    ...this.options.featureToggle,
    ...moduleOptions
  }

  let toggles = {}

  if (typeof options.toggles === 'function') {
    try {
      toggles = await options.toggles()
    } catch (e) {
      throw new Error(e)
    }
  } else if (typeof options.toggles === 'object') {
    toggles = options.toggles
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'feature-toggles.js',
    options: {
      toggles
    },
    ssr: true
  })

  this.addTemplate({
    fileName: 'feature-toggle.vue',
    src: resolve(__dirname, 'feature-toggle.vue')
  })
}

module.exports = featureToggleModule
module.exports.meta = require('../package.json')
