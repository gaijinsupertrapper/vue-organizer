<template>
  <div id="app" class="h-100">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{ margin:0 !important}
html, body{
  margin: 0;
  color: #FF3F80;
  background-color: #212121;
  min-height: 100%;
  
  
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
