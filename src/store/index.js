import Vue from 'vue';
import Vuex from 'vuex';

import calcUsersDataState from '../modules/calcUsersDataState/calcUsersDataState.js';

Vue.use( Vuex );
export default new Vuex.Store({
	modules: {
		calcUsersDataState
	}
});