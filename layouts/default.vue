<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <div class="drawer-header">
        <div v-if="$store.state.isLogin" class="account-form">
          <div class="account-name">
            {{ $store.state.username }}
          </div>
          <div class="account-action" @click.stop="logoutDialog = true">
            注销
          </div>
        </div>
        <div v-else class="account-form">
          <div class="account-action" @click.stop="$router.push('/login')">
            请登录
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <bottom-nav></bottom-nav>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="$store.state.title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-dialog v-model="logoutDialog" width="500">
      <v-card>
        <v-card-title class="headline">
          确定注销？
        </v-card-title>

        <v-card-text>
          注销后将需要重新登录才能够使用所有功能
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red" outlined @click="onLogout()">
            确定
          </v-btn>
          <v-btn color="red" @click="logoutDialog = false">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import BottomNav from '~/components/BottomNav.vue'

export default {
  components: {
    BottomNav
  },
  data() {
    return {
      drawer: false,
      logoutDialog: false,
      items: [
        {
          title: '常见问题',
          icon: 'help',
          to: '/faq'
        },
        {
          title: '问题反馈',
          icon: 'question_answer',
          to: '/feedback'
        },
        {
          title: '关于',
          icon: 'info',
          to: '/about'
        }
      ]
    }
  },
  methods: {
    onLogout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
.drawer-header {
  display: flex;
  height: 150px;
  background-image: url('/img/bg_drawer_header.jpg');
  background-position: center;
  background-size: cover;
  flex-direction: column;
  justify-content: center;

  & > .account-form {
    display: flex;
    flex-direction: row;
    justify-content: center;

    & > .account-name {
      padding: 5px 15px;
      background-color: white;
      color: black;
    }

    & > .account-action {
      padding: 5px 15px;
      background-color: red;
      color: white;
      user-select: none;
    }

    & > .account-action:hover {
      background-color: red;
      opacity: 0.9;
    }
  }
}
</style>
