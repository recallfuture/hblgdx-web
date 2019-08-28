<template>
  <div>
    <v-card class="mb-2">
      <v-card-text>
        <label>姓名：</label><br />
        <label>学号：</label><br />
        <label>系所：</label><br />
        <label>班级：</label>
      </v-card-text>
    </v-card>

    <v-card v-for="(score, index) in scores" :key="index" class="mb-2">
      <v-card-text class="d-flex flex-row align-center">
        <v-avatar size="35" color="green" class="mr-4">{{
          score.score
        }}</v-avatar>
        {{ score.name }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scores: [
        { name: '软件工程', score: 80 },
        { name: '网络原理', score: 40 },
        { name: '数据结构', score: 60 },
        { name: '操作系统', score: 90 }
      ]
    }
  },
  mounted() {
    this.$store.commit('changeTitle', '成绩查询')
  }
}
</script>
