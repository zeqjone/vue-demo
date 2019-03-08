<template>
  <div id="app">
    <img alt="enterplorer" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Intelligence />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Intelligence from './components/intelligence/index.vue'
import './assets/redcore-font-2.0/iconfont.css'

export default {
  name: 'app',
  components: {
    Intelligence
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
