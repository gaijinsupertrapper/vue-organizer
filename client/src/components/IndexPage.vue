<template>
    <div class="text-center w-100" id="mainpage">
        <h1> Join existing panel </h1>
        <h2 v-if="error" class="mt-2"> Incorrect handle </h2>
        <div class="join_panel mb-4">
            <b-form-input type="text" v-model="panel" @keyup.enter = "getPanel()" class="mt-4"> </b-form-input>
        </div>
        <h3> or </h3>
        <b-button @click="addPanel" class="mt-4"> Add new panel </b-button>
    </div>
</template>
<script>
import IndexService from '@/services/IndexService'
export default {
  name: 'IndexPage',
  data () {
    return {
      posts: [],
      panel: '',
      error: false
    }
  },
  mounted () {
    this.getPanels()
  },
  methods: {
    async getPanels () {
      const response = await IndexService.fetchPosts()
      this.posts = response.data
    },
    async addPanel () {
      const response = await IndexService.addPanel({})
      this.getPanel(response.data.id)
    },
    async getPanel (panel = this.panel) {
      const response = await IndexService.fetchPanel(panel)
      console.log(response.status)
      if (response.status == 200) {
        this.$router.push({name: 'PanelView', params: { id: panel }})
      } else {
        this.error = true
      }
    }
  }
}
</script>
<style>
#mainpage{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
