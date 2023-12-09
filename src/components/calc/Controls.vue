<template>
  <section>
    <!-- <button @click="toggleSelection">copy</button> -->
    <button @click="toggleTheme">toggle theme</button>
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

<style lang="scss" scoped>
section {
  /* outline: 1px solid coral; */
  padding: 7px 7px 7px 0px;
}

button {
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid #b2b2b2;
  cursor: pointer;
  border-radius: 12px;
  transition: 0.3s;

  @include darkTheme() {
    color: #fff;
  }

  &:hover {
    box-shadow: 0px 0px 2px 1px #b2b2b2;
  }
}
</style>
