export default {
	actions: {
		toggleSelection({commit}){
			commit( 'toggleSelection' );
		},
		setSelection({commit}, value ){
			commit( 'setSelection', value );
		}
	},
	mutations: {
		toggleSelection( state ){
			console.log( `selection ${!state.selectionOn ? 'on' : 'off'}!` );
			state.selectionOn = !state.selectionOn;
		},
		setSelection( state, value ){
			state.selectionOn = value;
		}
	},
	state: {
		selectionOn: false
	},
	getters: {
		selectionOn: state => state.selectionOn
	},
}