<template>
  <div>
    <v-card class="mb-2">
      <v-card-text class="text-center">
        有0门课程有待交作业
      </v-card-text>
    </v-card>

    <v-card v-for="(course, index) in courses" :key="index" class="mb-2">
      <v-card-text class="d-flex flex-row align-center">
        <v-icon color="orange" class="mr-4">bookmark</v-icon>
        {{ course.name }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [{ id: '1', name: 'c++' }, { id: '1', name: 'c#' }]
    }
  },
  mounted() {
    this.$store.commit('changeTitle', '作业查询')
  }
}
</script>
