export default {
  actions: {
    async setToConfig({ commit }, data) {
      commit('setFieldToConfig', data);
    },
    async setConfig({ commit }, newConfig) {
      commit('setConfig', newConfig);
    },
  },
  mutations: {
    setConfig(state, newConfig) {
      state.config = newConfig;
    },
    setFieldToConfig(state, { field, value }) {
      state.config[field] = value;
    },
  },
  state: {
    config: {
      theme: 'dark',
    },
  },
  getters: {
    config: (s) => s.config,
    theme: (s) => s.config.theme,
  },
};
