<template>
  <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
    <v-dialog v-model="detailDialog">
      <v-card class="pt-2">
        <v-card-text>
          <div v-if="!detail" class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <!-- eslint-disable-next-line -->
          <div v-else v-html="detail" class="title"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card @click="$router.back()">
            <v-card-text class="d-flex flex-row align-center">
              <v-icon color="white" class="mr-4">arrow_back</v-icon>
              返回上一级
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          v-for="(homework, index) in homeworks"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card @click="showDetail(homework)">
            <v-card-title class="d-flex flex-row align-center">
              <v-icon v-if="!homework.resultUrl" color="red" class="mr-4"
                >error</v-icon
              ><v-icon v-else color="green" class="mr-4">check</v-icon>
              {{ homework.title }}
            </v-card-title>
            <v-card-text> 提交日期：{{ homework.dateTime }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </mescroll-vue>
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
        callback: this.downCallback
      },
      homeworks: [], // 列表数据
      detailDialog: false,
      detail: ''
    }
  },
  mounted() {
    this.$store.commit('updateTitle', '作业查询')
  },
  methods: {
    async showDetail(homework) {
      try {
        this.detail = null
        this.detailDialog = true

        if (homework.detail) {
          this.detail = homework.detail
        }

        const response = await JxxtApi.getHomeworkDetail(homework.id)
        this.detail = response.data
        homework.detail = response.data
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
      }
    },
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
}
</script>
