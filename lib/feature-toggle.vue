<template>
  <div v-if="canShow">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'feature-toggle',
  props: {
    name: String,
    value: [String, Boolean],
    prefix: {
      type: String,
      default: undefined
    }
  },
  computed: {
    prefixValue () {
      return this.prefix || this.$featureToggle.queryStringPrefix;
    },

    queryString() {
      return this.$featureToggle.queryString
    },

    isQueryStringAllowed() {
      return this.queryString && this.isAllowed()
    },

    queryStringKey() {
      return `${this.prefixValue}_${this.name}`
    },

    hasQueryStringWithToggle(){
      const key = this.queryStringKey
      return !!this.$route.query[key];
    },

    canShowWithQueryString() {
      const key = this.queryStringKey

      return this.$route.query[key] == this.value + ''
    },

    canShow() {
      return (
        !!(this.$featureToggle &&
          this.$featureToggle.toggles &&
          this.$featureToggle.toggles[this.name] === this.value &&
          !this.hasQueryStringWithToggle) ||
        !!(this.queryString &&
          this.isQueryStringAllowed &&
          this.canShowWithQueryString)
      )
    }
  },
  methods: {
    isAllowed() {
      const isQueryStringAllowed = this.$featureToggle.isQueryStringAllowedFn

      return (
        this.queryString &&
        (!isQueryStringAllowed || isQueryStringAllowed(this.$props))
      )
    }
  }
}
</script>