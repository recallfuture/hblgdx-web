<template>
  <div class="login-page">
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
export default {
  layout: 'clean',
  data: () => ({
    valid: false,
    username: '',
    jwxtPassword: '',
    jxxtPassword: '',
    usernameRules: [(v) => !!v || '不能为空！'],
    jwxtPasswordRules: [(v) => !!v || '不能为空！'],
    jxxtPasswordRules: [(v) => !!v || '不能为空！'],
    showPassword: false
  }),
  methods: {
    submit() {
      // 校验表单
      if (!this.$refs.form.validate()) {
      }

      // 提交
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
