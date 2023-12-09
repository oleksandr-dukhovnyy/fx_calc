import setDefaultValues from '../setDefaultValues.js';
import { compileUsers } from './compileUsers.js';
import updateHeader from './updateHeader.js';

export default {
  actions: {
    async getUsersData({ commit }) {
      const clients = setDefaultValues([], 11, 0, false);
      const traders = setDefaultValues([], 1, 0, true);

      const users = clients.concat(traders);

      commit('calculateTotalDeposit');
      commit('calculateHeader');
      commit('setUsersArr', users);
      commit('compileUsersAndTraderBonus');
    },
    async updateNewDeposit({ commit }, newDeposit) {
      commit('setNewDeposit', newDeposit);
      commit('calculateTotalDeposit');
      commit('calculateHeader');
      commit('compileUsersAndTraderBonus');
    },
    async updateUserDeposit({ commit }, { id, newValue }) {
      commit('updateUserDeposit', { id, newValue });
      commit('calculateTotalDeposit');

      commit('calculateHeader');
      commit('compileUsersAndTraderBonus');
    },

    async updateFocusDown({ commit }, { id, type }) {
      commit('setFocus', { id, type });
    },
    async registerInputCallback({ commit }, { id, callback, type }) {
      commit('addCallback', { id, callback, type });
    },
  },
  mutations: {
    setFocus({ focus }, { id, type }) {
      let callBack = focus[type][id + 1];
      if (callBack !== undefined) {
        callBack();
      } else if (callBack === undefined) {
        focus[type][0]();
      }
    },
    addCallback({ focus }, { id, callback, type }) {
      focus[type][id] = callback;
    },

    calculateTotalDeposit(state) {
      state.header.totalDeposit = state.users.usersArr.reduce(
        (prev, user) => user.depo + prev,
        0
      );
    },
    updateUserDeposit({ users }, { id, newValue }) {
      users.usersArr = users.usersArr.map((user) =>
        user.id === id ? { ...user, depo: newValue } : user
      );
    },
    setTotalDeposit({ header }, totalDeposit) {
      header.totalDeposit = totalDeposit;
    },
    setNewDeposit(state, newDeposit) {
      state.header.newDeposit = newDeposit;
    },
    setUsersArr({ users }, newArr) {
      users.usersArr = newArr;
    },
    calculateHeader(state) {
      state.header = updateHeader(state.header);
    },
    compileUsersAndTraderBonus(state) {
      let { arr, traderBonus } = compileUsers(
        state.header,
        state.users.usersArr
      );
      state.users.usersReadyArr = arr;
      state.header.traderBonus = traderBonus;
    },
  },
  state: {
    users: {
      usersArr: [],
      usersReadyArr: [],
    },
    header: {
      totalDeposit: 0,
      newDeposit: undefined,
      newDepositInPercents: 0,
      profit: 0,
      profitInPercentes: 0,
      traderBonus: 0,
      finalProfit: 0,
      finalProfitInPercents: 0,
      newCapital: 0,
    },
    focus: {
      dates: {},
      depos: {},
    },
  },
  getters: {
    clients({ users }) {
      return users.usersReadyArr
        .filter((user) => !user.isTrader)
        .map((client) =>
          client.depo === 0 ? { ...client, depo: '' } : client
        );
    },
    traders({ users }) {
      return users.usersReadyArr
        .filter((user) => user.isTrader)
        .map((trader) =>
          trader.depo === 0 ? { ...trader, depo: '' } : trader
        );
    },
    header(state) {
      return state.header.newDeposit === 0
        ? { ...state.header, newDeposit: '' }
        : state.header;
    },
    usersLength(state) {
      return state.users.usersArr.length;
    },
  },
};
