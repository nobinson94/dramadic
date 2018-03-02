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
  }
}
</script>

<style>

.app {
  height: 100%;
} 
.main-content {
  height: 100%;
  z-index: 1;
}
.guide {
  color: #FCEFBD;
  font-style: italic;
  font-size: 20px;
}
</style>
