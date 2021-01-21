import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.config.silent = true;

Vue.filter( 'toNormalNumbers', function ( num, fixTo = 4 ) {         
  if( num === '' || !num || num === Infinity ) 
    return '';
  return ( +num ).toFixed( fixTo );
});

Vue.filter( 'addSymbol', function ( value, symbol ) {         
  if( value === '' )
    return '';
  return `${value} ${symbol}`;
});

Vue.filter( 'deleteNull', function ( value ){
  let blocked = ['0', 0, null, 'null', undefined, 'undefined' ];
  if( blocked.indexOf( value ) !== -1 )
    return '';
  return value;
});

new Vue({
  render: h => h(App),
}).$mount('#app');