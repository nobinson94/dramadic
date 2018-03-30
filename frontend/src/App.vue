<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import HomePage from './components/HomePage'

export default {
  name: 'app',
  components: { 
    HomePage,
  },

}
</script>

<style>
body {
  height: 100%;
  background-color: #00013e;
}
.app {
  height: 100%;
} 
.main-content {
  height: 100%;
  z-index: 1;
}
.btn-dramadic {
  background-color: #f2de7d;
}
</style>
