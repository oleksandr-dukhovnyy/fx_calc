import Vue from 'vue';

Vue.filter( 'number', ( num, fixTo = 4 ) => {   
  if( typeof ( +num ) !== 'number' || num === 0 || num === '0' || num === '' ) 
    return '';
  return ( +num ).toFixed( fixTo );
});

Vue.filter( 'addSymbol', ( value, symbol ) => {         
  if( value === '' )
    return '';
  return `${value} ${symbol}`;
});

Vue.filter( 'placeholder', ( value ) => {         
  if( value === '' || value === '0' || value === 0 ){
    return '-';
  }
  return value;
});

Vue.filter( 'deleteNull', ( value ) => {
  if( value === null )
    return '';
  return value;
});

Vue.filter( 'calcTd', value => {
  // return value; 
	return isNaN( value ) ? '' : ([
    null,
    undefined,
    '0.0000',
    Infinity,
    -Infinity,
    'NaN'
  ].indexOf( value ) === -1 ) ? value : '';
});