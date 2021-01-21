<template>
  <div id="app">
    <Calc />
  </div>
</template>


<script>
import Calc from './components/calc/Calc.vue';

export default {
  name: 'App',
  components: {
    Calc
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
  letter-spacing: 0.7px;
}
html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
