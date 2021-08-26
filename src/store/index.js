import Vue from 'vue';
import Vuex from 'vuex';

import calcUsersDataState from '../modules/calcUsersDataState/calcUsersDataState.js';
import UIConfig from '../modules/UIConfig/UIConfig.js';
import calc_selection from '../modules/calc_selection/calc_selection';

Vue.use( Vuex );
export default new Vuex.Store({
	modules: {
		calcUsersDataState,
		UIConfig,
		calc_selection
	}
});