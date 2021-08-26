export default {
	actions: {
		async setToConfig( {commit}, data ){
			commit( 'setFieldToConfig', data );
		},
		async setConfig( {commit}, newConfig ){
			commit( 'setConfig', newConfig );
		},
		toggleTheme: ({commit}) => commit( 'toggleTheme' ),
		setConditionField: ( {commit}, p ) => commit( 'setConditionField', p )
	},
	mutations: {
		setConditionField({conditions}, {field, newValue}){
			if( newValue !== undefined ){
				conditions[field] = newValue;
			}
		},
		toggleTheme( {config} ){
			config.theme = config.isLight ? 'dark' : 'light';
			config.isLight = !config.isLight;
		},
		setConfig( state, newConfig ){
			state.config = newConfig;
		},
		setFieldToConfig( state, {field, value} ){
			state.config[field] = value;
		}
	},
	state: {
		config: {
			theme: 'light',
			isLight: true
		},
		conditions: {
			orientation: null
		}
	},
	getters: {
		config: s => s.config,
		conditions: s => s.conditions
	},
}