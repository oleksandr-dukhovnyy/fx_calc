let unicalID = 0;
const setDefaultValues = ( arr, count, defaultValue, isTrader = false ) => {
	let res = [];
	for( let i = 0; i < count; i++ ){
		res.push({
			depo: arr[i] === undefined ? defaultValue : arr[i],
			id: unicalID++,
			isTrader: isTrader
		});
	}
	return res;
};

export default setDefaultValues;