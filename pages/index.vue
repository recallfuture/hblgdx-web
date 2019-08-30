<template>
  <v-container>
    <h1 class="text-center">欢迎使用校园查！</h1>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('updateTitle', '首页')
  }
}
</script>
