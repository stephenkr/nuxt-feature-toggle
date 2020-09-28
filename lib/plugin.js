import Vue from 'vue'

export default (ctx, inject) => {
  const { toggles: _toggles, queryString: _queryString } = JSON.parse(`<%= JSON.stringify(options) %>`)
  const runtimeConfig = (ctx.$config && ctx.$config.featureToggle) || {}

  const toggles = {
    ..._toggles,
    ...(runtimeConfig.toggles || {})
  }
  const queryString = typeof runtimeConfig.queryString !== 'undefined' ? runtimeConfig.queryString : _queryString

  console.log(toggles) // eslint-disable-line
  Vue.component('feature-toggle', () => import('./feature-toggle.vue'))

  const featureToggle = {
    toggles,
    queryString,
    isQueryStringAllowed: (fn) => {
      featureToggle.isQueryStringAllowedFn = fn
    }
  }

  ctx.$featureToggle = featureToggle
  inject('featureToggle', featureToggle)
}
