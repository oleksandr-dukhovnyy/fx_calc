<template>
  <section>
    <button @click="toggleSelection">copy</button>
    <button @click="toggleTheme">theme</button>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Controls',
  methods: {
    ...mapActions(['toggleTheme', 'toggleSelection']),
    copy() {
      console.log('copy');
    },
    changeTheme() {
      console.log('theme');
    },
  },
  mounted() {
    // alert( window.innerWidth + ' / ' + window.innerHeight )
  },
};
</script>

<style scoped>
section {
  /* outline: 1px solid coral; */
  padding: 7px 7px 7px 0px;
}
</style>
