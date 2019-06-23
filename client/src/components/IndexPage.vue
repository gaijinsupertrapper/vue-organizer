<template>
    <div class="text-center">
        <h1> Join existing panel </h1>
        <div class="join_panel d-flex justify-content-center col-12 mt-4 mb-4">
            <b-form-input type="text" v-model="panel" @keyup.enter = "getPanel" class="col-6">
               </b-form-input>
            <h1> {{ panel }} </h1>
            <h2 v-if="error"> Incorrect handle </h2>
        </div>
        <h3> or </h3>
        <b-button @click="addPanel" class="mt-4 mb-4 col-4"> Add new panel </b-button>
        <!-- <div v-for="post in posts" v-bind:key="post">
            <h1> {{ post._id }} </h1>

            <p> {{ post.title }} </p>
        </div>
        <h1> THankS </h1> -->
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
      await IndexService.addPanel({})
      this.getPanels()
    },
    async getPanel () {
      this.$router.push({name: 'PanelView', params: { id: this.panel }})
    }
  }
}
</script>
