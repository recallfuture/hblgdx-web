<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('changeTitle', '成绩查询')
  }
}
</script>
