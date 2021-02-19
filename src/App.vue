<template>
  <div id="app">
    <Calc
      :showHeaderTexts="showHeaderTexts"
    />
    <!-- <span
      @click="hardReset"
      class="hard-reset"
      :showHeaderTexts="showHeaderTexts"
    >
      hard reset
    </span> -->

  </div>
</template> 


<script>
import Calc from './components/calc/Calc.vue';

export default {
  name: 'App',
  components: {
    Calc
  },
  data(){
    return {
      showHeaderTexts: true
    }
  },
  methods: {
    hardReset(){
      window.location.reload( true );
    }
  },
  mounted(){

    // remove host logo
    setTimeout( () => {
      let imgs = document.querySelectorAll( 'img' );
      imgs.forEach( img => {
        if( img.alt === 'www.000webhost.com' ){
          img.remove();
        }
      });
    }, 200 );
    
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
  letter-spacing: -0.1px;
}
html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hideInput {
  display: none;
}
.hard-reset {
  opacity: 0.3;
}
</style>
