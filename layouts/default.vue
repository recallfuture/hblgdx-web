<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <div class="drawer-header">
        <div class="account-form">
          <div class="account-name">
            学号
          </div>
          <div class="account-action">
            注销
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
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
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
  computed: {
    title() {
      return this.$store.state.title
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
    }
  }
}
</style>
