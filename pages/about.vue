<template>
  <div>
    <v-card
      v-for="(item, index) in items"
      :key="index"
      :href="item.href"
      class="mb-2"
    >
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>{{ item.describe }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: '校园查',
          describe:
            '校园查是由两个人做的华北理工大学综合查询app，' +
            '而后又开发了现在的web版。'
        },
        {
          title: '程序猿',
          describe: 'SU<recallsufuture@gmail.com>',
          href: 'mailto:recallsufuture@gmail.com'
        },
        {
          title: '设计狮',
          describe: '老柯<2092379934@qq.com>',
          href: 'mailto:2092379934@qq.com'
        },
        {
          title: '项目前端源码',
          describe: 'https://github.com/recallfuture/hblgdx-web',
          href: 'https://github.com/recallfuture/hblgdx-web'
        },
        {
          title: '项目后端源码',
          describe: 'https://github.com/recallfuture/hblgdx-api',
          href: 'https://github.com/recallfuture/hblgdx-api'
        },
        { title: '开源协议', describe: 'MIT' }
      ]
    }
  },
  mounted() {
    this.$store.commit('updateTitle', '关于')
  }
}
</script>
