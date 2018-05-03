<template>
  <div id="app" class="app">
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
@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);

body {
  height: 100%;
  background-color: #00013e;
  margin: 0;
  padding: 0;
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
.btn-outline-dramadic {
  border-color: #f2de7d;
  color: #f2de7d;
  background-color: rgba( 255, 255, 255, 0 );
}
.btn-outline-dramadic:hover {
  color: black;
  background-color: #f2de7d;
}
.font-dramadic {
  font-family: 'Nanum Gothic', serif;
  color: #f2de7d;
}
</style>
