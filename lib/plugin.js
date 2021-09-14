import Vue from 'vue'
import yn from 'yn'

const parseQueryToggles = (queryObject = {}, queryStringPrefix = '') => Object.entries(queryObject)
  .filter(([key]) => key.startsWith(`${queryStringPrefix}_`))
  .reduce((toggles, [key, value]) => ({
    ...toggles,
    [key.replace(`${queryStringPrefix}_`, '')]: value
  }), {})

export default (ctx, inject) => {
  const { $config, route, app: { router } } = ctx
  const { toggles: _toggles, queryString: _queryString, queryStringPrefix } = JSON.parse(`<%= JSON.stringify(options) %>`)
  const runtimeConfig = ($config && $config.featureToggle) || {}
  const queryString = typeof runtimeConfig.queryString !== 'undefined' ? runtimeConfig.queryString : _queryString
  let queryToggles = {}

  if (queryString) {
    if (router && route) {
      queryToggles = parseQueryToggles(route.query, queryStringPrefix)
      router.afterEach((to) => {
        featureToggle.toggles = {
          ..._toggles,
          ...(runtimeConfig.toggles || {}),
          ...parseQueryToggles(to.query, queryStringPrefix)
        }
      })
    }
  }

  const toggles = {
    ..._toggles,
    ...(runtimeConfig.toggles || {}),
    ...queryToggles
  }

  Object.entries(toggles).forEach(([key, value]) => {
    toggles[key] = yn(value) ?? value
  })

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
