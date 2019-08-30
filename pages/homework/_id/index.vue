<template>
  <div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
      <v-card v-for="(homework, index) in homeworks" :key="index" class="mb-2">
        <v-card-text class="d-flex flex-row align-center">
          <v-icon v-if="!homework.resultUrl" color="red" class="mr-4"
            >error</v-icon
          >
          {{ homework.title }}
        </v-card-text>
      </v-card>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { JxxtApi } from '../../../api/jxxt'

export default {
  middleware: 'needLogin',
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        autoShowLoading: true,
        callback: this.downCallback
      },
      homeworks: [] // 列表数据
    }
  },
  mounted() {
    this.$store.commit('updateTitle', '作业查询')
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    async downCallback(mescroll) {
      try {
        if (!this.$store.state.isJxxtLogin) {
          await JxxtApi.login(
            this.$store.state.username,
            this.$store.state.jxxtPassword
          )
          this.$store.commit('updateJxxtLogin', true)
        }

        // 获取所有有待交作业的课程
        const courseId = this.$route.params.id
        const response = await JxxtApi.getHomeworkList(courseId)
        this.homeworks = response.data

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
      this.$store.commit('updateJxxtLogin', false)
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
</script>
