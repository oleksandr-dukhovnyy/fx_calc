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

html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
body {
  position: absolute;
  top: -7px;
}
</style>
