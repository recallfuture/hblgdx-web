<template>
  <v-container>
    <v-card v-for="(item, index) in items" :key="index" class="mb-4">
      <v-card-title>{{ item.q }}</v-card-title>
      <v-card-text>{{ item.a }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          q: '登录失败怎么办？',
          a:
            '看看错误提示，大多数情况我已经提示好了，' +
            '例外情况是如果有“Timeout”，那是学校服务器超时，' +
            '稍等会再登录就进去了；如果没有，请截图并反馈'
        },
        {
          q: '晚上查询的时候怎么一直提示400出错？',
          a: '因为半夜有段时间教学系统维护，什么也查不了'
        },
        {
          q: '成绩刷新经常出错怎么办？',
          a: '少刷新'
        }
      ]
    }
  },
  mounted() {
    this.$store.commit('updateTitle', '常见问题')
  }
}
</script>
