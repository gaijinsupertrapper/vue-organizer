import api from '@/services/api'

export default {
  fetchPosts () {
    return api().get('/')
  },
  fetchPanel (panelId) {
    return api().get('panel/' + panelId, {params: {panelId: panelId}})
  },
  addPanel () {
    return api().post('/')
  },
  fetchTasks (panelId) {
    return api().get('panel/' + panelId + '/tasks', {params: {panelId: panelId}})
  },
  createTask (panelId, description) {
    return api().post('panel/' + panelId + '/new', {panelId: panelId, description: description})
  },
  editTask (panelId, taskId) {
    return api().put('panel/' + panelId, {taskId: taskId})
  }

}
