import Vue from 'vue'

export default (_, inject) => {
  const { toggles } = JSON.parse('<%= JSON.stringify(options) %>');

  Vue.component('feature-toggle', () => import('./feature-toggle.vue'))
  inject('featureToggles', {
    ...toggles
  })
}
