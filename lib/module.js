const { resolve } = require('path')
const resolveToggles = require('./resolveToggles')

async function featureToggleModule (moduleOptions) {
  const options = {
    ...this.options['feature-toggle'],
    ...this.options.featureToggle,
    ...moduleOptions,
    ...(this.publicRuntimeConfig && this.publicRuntimeConfig.featureToggle) || {}
  }

  // It's not recommended to use functions for runtimeConfig
  // so it's best to allow resolving a Promise only in module
  // but not in plugin.
  const toggles = await resolveToggles(options.toggles)

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'feature-toggles.js',
    options: {
      toggles,
      queryString: options.queryString
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
