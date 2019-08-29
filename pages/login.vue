<template>
  <div class="login-page">
    <notifications group="error" />

    <img class="colors" src="/img/colors.png" />
    <h1 class="mt-10rem login-title">校园查</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="请输入学号"
              required
              dark
              outlined
              rounded
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="jwxtPassword"
              :rules="jwxtPasswordRules"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'"
              label="教务系统密码"
              required
              dark
              outlined
              rounded
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="jxxtPassword"
              :rules="jxxtPasswordRules"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'"
              label="教学系统密码"
              required
              dark
              outlined
              rounded
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="deep-purple accent-2"
              x-large
              title
              dark
              block
              rounded
              :loading="loading"
              @click="submit"
            >
              登录
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { JxxtApi } from '../api/jxxt'
import { MyncmcApi } from '../api/myncmc'

export default {
  layout: 'clean',
  data: () => ({
    valid: false,
    loading: false,
    username: this.$store.state.username,
    jwxtPassword: this.$store.state.jwxtPassword,
    jxxtPassword: this.$store.state.jxxtPassword,
    usernameRules: [(v) => !!v || '不能为空！'],
    jwxtPasswordRules: [(v) => !!v || '不能为空！'],
    jxxtPasswordRules: [(v) => !!v || '不能为空！'],
    showPassword: false
  }),
  methods: {
    async submit() {
      // 校验表单
      if (!this.$refs.form.validate()) {
        return
      }

      if (this.loading) {
        return
      }

      this.loading = true

      try {
        // 提交
        let response
        response = await MyncmcApi.login(this.username, this.jwxtPassword)
        if (!this.checkError(response.status)) {
          this.loading = false
          return
        }

        response = await JxxtApi.login(this.username, this.jxxtPassword)
        if (!this.checkError(response.status)) {
          this.loading = false
          return
        }

        // 登录成功
        this.$store.commit('updateUser', {
          username: this.username,
          jwxtPassword: this.jwxtPassword,
          jxxtPassword: this.jxxtPassword
        })
        this.$store.commit('updateJxxtLogin', true)
        this.$store.commit('updateMyncmcLogin', true)

        this.$router.push('/')
      } catch (e) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: '登陆失败',
          text: '请检查网络连接'
        })
        this.loading = false
      }
    },

    checkError(status) {
      window.console.log(status)
      if (status === 200) {
        return true
      } else if (status === 400 || status === 422) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: '登陆失败',
          text: '用户名或密码错误'
        })
        return false
      } else if (status === 401) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: '登陆失败',
          text: '服务器忙，请稍候再试'
        })
        return false
      } else if (status === 403) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: '登陆失败',
          text: '今日已经输错五次密码，请明天再来'
        })
        return false
      } else {
        this.$notify({
          group: 'error',
          type: 'error',
          title: '登陆失败',
          text: '请检查网络连接'
        })
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-page {
  background-color: #15161f;
  text-align: center;
  color: white;
  padding: 30px;
  position: relative;
  min-height: 100%;
  overflow: hidden;
}

.colors {
  position: absolute;
  top: -80px;
  right: -80px;
  width: auto;
  height: 250px;
}

.mt-10rem {
  margin-top: 10rem;
}

.login-title {
  letter-spacing: 3rem;
  text-indent: 1.5em;
}
</style>
