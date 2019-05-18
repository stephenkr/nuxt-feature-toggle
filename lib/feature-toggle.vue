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
    value: [String, Boolean]
  },
  computed: {
    canShow() {
      return (
        this.$featureToggles && this.$featureToggles[this.name] === this.value
      )
    }
  }
}
</script>