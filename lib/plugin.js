import Vue from 'vue'

export default (ctx, inject) => {
  const { toggles: _toggles, queryString: _queryString, queryStringPrefix } = JSON.parse(`<%= JSON.stringify(options) %>`)
  const runtimeConfig = (ctx.$config && ctx.$config.featureToggle) || {}
  const queryString = typeof runtimeConfig.queryString !== 'undefined' ? runtimeConfig.queryString : _queryString
  let queryToggles = {}

  if (queryString && ctx.route) {
    queryToggles = Object.entries(ctx.route.query)
      .filter(([key]) => key.startsWith(`${queryStringPrefix}_`))
      .reduce((toggles, [key, value]) => ({
        ...toggles,
        [key.replace(`${queryStringPrefix}_`, '')]: value
      }), {})
  }
  const toggles = {
    ..._toggles,
    ...(runtimeConfig.toggles || {}),
    ...queryToggles
  }
  Vue.component('feature-toggle', () => import('./feature-toggle.vue'))

  const featureToggle = {
    toggles,
    queryString,
    queryStringPrefix,
    isQueryStringAllowed: (fn) => {
      featureToggle.isQueryStringAllowedFn = fn
    }
  }

  ctx.$featureToggle = featureToggle
  inject('featureToggle', featureToggle)
}
