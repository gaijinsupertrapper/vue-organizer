<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <b-button @click="goHome" class="mb-4"> Go home </b-button>
    <h2> Panel {{ id }}</h2>
    <div class="taskAdd col-6 mb-4 mt-4">
      <b-form-input type="text" v-model="task" @keyup.enter="addTask" placeholder="New task..."> </b-form-input>
      <p> {{ task }} </p>
    </div>
    <div class="row col-12">
      <div class="col-6">
        <h1> inCompleted </h1>
        <div v-for="task in tasks" v-bind:key="task">
          <h5 v-if="task.isCompleted == false" @click="editTask(task._id)"> {{ task.description }} </h5>
        </div>
      </div>
      <div class = "col-6">
        <h1> Completed </h1>
        <div v-for="task in tasks" v-bind:key="task">
          <h5 v-if="task.isCompleted == true"> {{ task.description }} </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IndexService from '@/services/IndexService'
export default{
  name: 'PanelView',
  data () {
    return {
      id: this.$route.params.id,
      panel: [],
      tasks: [],
      task: ''
    }
  },
  mounted () {
    this.getTasks(this.id)
  },
  methods: {
    async getPanel (id) {
      const response = await IndexService.fetchPanel(id)
      this.panel = response.data
    },
    async getTasks (id) {
      const response = await IndexService.fetchTasks(id)
      this.tasks = response.data
    },
    async addTask () {
      await IndexService.createTask(this.id, this.task)
      this.getTasks(this.id)
    },
    async goHome () {
      this.$router.push({name: 'IndexPage'})
    },
    async editTask (taskId) {
      await IndexService.editTask(this.id, taskId)
      this.getTasks(this.id)
    }
  }
}
</script>
