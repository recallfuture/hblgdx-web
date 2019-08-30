<template>
  <div>
    <v-card class="mb-4 text-center">
      <v-card-text>
        <p class="title font-weight-bold">向我发送反馈邮件</p>
        <p>邮箱地址：recallsufuture@gmail.com</p>
        <p>也可以直接点击下面的按钮开始编写邮件</p>
        <v-btn
          color="orange"
          href="mailto:recallsufuture@gmail.com?subject=问题反馈"
        >
          去反馈
        </v-btn>
      </v-card-text>
    </v-card>

    <v-card class="mb-4 text-center">
      <v-card-text>
        <p class="title font-weight-bold">在Github上提交Issue</p>
        <p>
          在本项目的Issues中提出问题或是希望添加的新功能，如果能顺便给个star那就更好了
        </p>
        <v-btn
          color="orange"
          href="https://github.com/recallfuture/hblgdx/issues"
        >
          去反馈
        </v-btn>
      </v-card-text>
    </v-card>

    <div class="text-center pt-4">
      <p>请在反馈时将遇到的问题描述详细，最好配上截图</p>
      <p>感谢每一位反馈者为这个项目作出的贡献</p>
      <v-icon color="red">favorite</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('updateTitle', '问题反馈')
  }
}
</script>
