<template>
  <div>
    <v-card v-for="(resource, index) in resources" :key="index" class="mb-2">
      <v-card-text class="d-flex flex-row align-center">
        <v-icon color="white" class="mr-4">folder</v-icon>
        {{ resource.name }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resources: [
        {
          fileId: '1',
          folderId: '1',
          resId: '',
          lId: '',
          name: '信息技术',
          isFolder: true,
          downloadUrl: ''
        },
        {
          fileId: '1',
          folderId: 'c++',
          resId: '',
          lId: '',
          name: '软件工程',
          isFolder: true,
          downloadUrl: ''
        }
      ]
    }
  },
  mounted() {
    this.$store.commit('changeTitle', '资源下载')
  }
}
</script>
