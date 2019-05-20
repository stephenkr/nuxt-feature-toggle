import Vue from 'vue'

export default (ctx, inject) => {
  const { toggles, queryString } = JSON.parse(`<%= JSON.stringify(options) %>`)

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
