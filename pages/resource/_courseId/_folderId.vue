<template>
  <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
    <v-container>
      <!-- 非首页的情况，展示资源目录 -->
      <v-row v-if="courseId">
        <v-col
          v-for="(resource, index) in resources"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card @click="onClick(resource)">
            <v-card-text class="d-flex flex-row align-center">
              <v-icon color="white" class="mr-4">{{
                resource.type === 0 ? 'folder' : 'insert_drive_file'
              }}</v-icon>
              {{ resource.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- 首页情况，展示所有课程目录 -->
      <v-row v-else>
        <v-col
          v-for="(course, index) in $store.state.courses"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card :to="'/resource/' + course.id">
            <v-card-text class="d-flex flex-row align-center">
              <v-icon color="white" class="mr-4">folder</v-icon>
              {{ course.name }}
            </v-card-text>
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
      courseId: this.$route.params.courseId,
      folderId: this.$route.params.folderId,
      resources: [],
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        callback: this.downCallback
      }
    }
  },
  mounted() {
    this.$store.commit('updateTitle', '课程资源')
  },
  methods: {
    onClick(resource) {
      if (resource.type === 0) {
        this.$router.push(`/resource/${this.courseId}/${resource.folderId}`)
      } else {
        location.href = resource.downloadUrl
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

        // 获取路由参数
        const { courseId, folderId } = this.$route.params

        if (!courseId) {
          // 获取所有课程
          const response = await JxxtApi.getAllCourses()
          const courses = response.data
          this.$store.commit('updateCourses', courses)
        } else {
          // 获取所有课程
          const response = await JxxtApi.getResourceList(courseId, folderId)
          this.resources = response.data
        }

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
