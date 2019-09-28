<template>
  <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
    <v-container v-if="$store.state.scoreReport">
      <v-card class="mb-2">
        <v-card-text class="d-flex flex-column">
          <label>姓名：{{ $store.state.scoreReport.name }}</label>
          <label>学号：{{ $store.state.scoreReport.number }}</label>
          <label>系所：{{ $store.state.scoreReport.departmentName }}</label>
          <label>班级：{{ $store.state.scoreReport.className }}</label>
        </v-card-text>
      </v-card>

      <v-row>
        <v-col
          v-for="(score, index) in $store.state.scoreReport.scores"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-card-text class="d-flex flex-row align-center">
              <v-avatar
                size="35"
                :color="score.score > 60 ? 'green' : 'red'"
                class="mr-4"
                >{{ score.score }}</v-avatar
              >
              {{ score.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </mescroll-vue>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { MyncmcApi } from '../../api/myncmc'

export default {
  middleware: 'needLogin',
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        auto: !this.$store.state.scoreReport,
        autoShowLoading: true,
        callback: this.downCallback
      }
    }
  },
  mounted() {
    this.$store.commit('updateTitle', '成绩查询')
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    async downCallback(mescroll) {
      try {
        if (!this.$store.state.isMyncmcLogin) {
          await MyncmcApi.login(
            this.$store.state.username,
            this.$store.state.jwxtPassword
          )
          this.$store.commit('updateMyncmcLogin', true)
        }

        // 获取成绩单
        const response = await MyncmcApi.getScoreReport()
        const scoreReport = response.data

        this.$store.commit('updateScoreReport', scoreReport)

        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess()
        })
      } catch (error) {
        if (error.response) {
          this.checkError(error.response.status)
        } else {
          this.$notify({
            group: 'error',
            type: 'error',
            title: '登陆失败',
            text: '请检查网络连接'
          })
          window.console.error(error)
        }
        mescroll.endErr()
      }
    },
    checkError(status) {
      if (status === 400 || status === 422) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: '登陆失败',
          text: '用户名或密码错误'
        })
        const router = this.$router
        setTimeout(() => router.push('/login'), 1000)
      } else if (status === 401) {
        this.$notify({
          group: 'error',
          type: 'warning',
          title: '登陆失败',
          text: '服务器忙，请稍候再试'
        })
        this.$store.commit('updateMyncmcLogin', false)
      } else if (status === 403) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: '登陆失败',
          text: '您的帐号已被锁定，请明天再试'
        })
      } else {
        this.$notify({
          group: 'error',
          type: 'error',
          title: '登陆失败',
          text: '请检查网络连接'
        })
      }
    }
  }
}
</script>
