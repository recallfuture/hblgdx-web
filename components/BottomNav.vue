<template>
  <v-bottom-navigation grow absolute>
    <v-btn
      v-for="(route, index) in routes"
      :key="index"
      :to="route.to"
      style="height: inherit;"
    >
      <span>{{ route.title }}</span>
      <v-icon>{{ route.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomNav',
  data() {
    return {
      activeBtn: 0,
      routes: [
        {
          title: '作业',
          icon: 'edit',
          to: '/homework'
        },
        {
          title: '资源',
          icon: 'folder',
          to: '/resource'
        },
        {
          title: '成绩',
          icon: 'check_box',
          to: '/score'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.icon-img {
  width: 30px;
}
</style>
