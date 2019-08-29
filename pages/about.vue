<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('updateTitle', '关于')
  }
}
</script>
