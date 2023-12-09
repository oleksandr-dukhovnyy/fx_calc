<template>
  <div id="app" :class="theme">
    <Calc />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/general/Footer.vue';
import Calc from './components/calc/Calc.vue';
import { mapActions, mapGetters } from 'vuex';

const actions = ['selectDateIcon', 'setConditionField'];

const getters = ['config', 'conditions'];

export default {
  name: 'App',
  components: {
    Calc,
    Footer,
  },
  data() {
    return {
      showIcon: 1,
    };
  },
  computed: {
    ...mapGetters(getters),
    theme() {
      let obj = {};

      obj['theme-' + this.config.theme] = true;
      obj.op = this.conditions.orientation === 'p';
      obj.ol = this.conditions.orientation === 'l';

      return obj;
    },
  },
  methods: {
    ...mapActions(actions),
    select(id) {
      this.selectDateIcon(id);
    },
  },
  mounted() {
    /* 
      The cunning guys from the hosting insert their banner installation at the end of the last script.
      It turns out that you cannot remove their logo from my code.
      But, they did not take into account that it is possible to take advantage of a banal delay by means of "setTimeout".
      Anyway, the page will not have time to be rendered to the user during this delay of 340 ms.
    */
    setTimeout(() => {
      let imgs = document.querySelectorAll('img');
      imgs.forEach((img) => {
        if (img.alt === 'www.000webhost.com') img.remove();
      });
    }, 340);
    /*
      laughter and nothing more...
    */

    const setOrientation = () => {
      this.setConditionField({
        field: 'orientation',
        newValue: window.orientation === 90 ? 'l' : 'p',
      });
    };

    window.addEventListener('orientationchange', setOrientation);
    window.addEventListener('resize', setOrientation);

    setOrientation();
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;

  height: calc(100vh);
  width: calc(100vw - 14px);
  position: relative;
  padding: 7px 7px 0;
  top: 0px;
}

// .theme {
//   &-dark {
//     background-color: #333333;
//   }
//   &-light {
//     background-color: #fff;
//   }
// }

html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
body {
  position: absolute;
  top: -7px;
}
</style>
