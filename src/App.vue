<template>
  <div id="app">
    <Calc />
    <!-- <div style="margin-top: 30px;">
      <button
        style="margin: 10px; padding: 5px;"
        @click="select( 1 )"
      >1</button>
      <button
        style="margin: 10px; padding: 5px;"
        @click="select( 2 )"
      >2</button>
      <button
        style="margin: 10px; padding: 5px;"
        @click="select( 3 )"
      >3</button>
      <button
        style="margin: 10px; padding: 5px;"
        @click="select( 4 )"
      >4</button>
      <button
        style="margin: 10px; padding: 5px;"
        @click="select( 5 )"
      >5</button>
      <button
        style="margin: 10px; padding: 5px;"
        @click="select( 6 )"
      >6</button>
      <button
        style="margin: 10px; padding: 5px;"
        @click="select( 7 )"
      >(7)</button>
    </div> -->

    <Footer />
  </div>
</template> 

<script>

import Footer from './components/general/Footer.vue';
import Calc from './components/calc/Calc.vue';
import {
  mapActions
} from 'vuex';

const actions = [
  'selectDateIcon'
];

export default {
  name: 'App',
  components: {
    Calc, Footer
  },
  data(){
    return {
      showIcon: 1
    }
  },
  methods: {
    ...mapActions( actions ),
    select( id ){
      this.selectDateIcon( id );
    }
  },
  mounted(){

    /* 
      The cunning guys from the hosting insert their banner installation at the end of the last script.
      It turns out that you cannot remove their logo from my code.
      But, they did not take into account that it is possible to take advantage of a banal delay by means of "setTimeout".
      Anyway, the page will not have time to be rendered to the user during this delay of 340 ms.
    */
    setTimeout( () => {
      let imgs = document.querySelectorAll( 'img' );
      imgs.forEach( img => {
        if( img.alt === 'www.000webhost.com' ) img.remove();
      });
    }, 340 );
    /*
      laughter and nothing more...
    */

  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Roboto', sans-serif;
}
html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
