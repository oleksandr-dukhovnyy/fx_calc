<template>

<tr :class="{ trader: trader, row: true }"
    @keydown.enter="updateFocus"
>
        <td class="name">
            {{ trader ? 1 : id + 1 }}
        </td>

        <td class="deposit changed min-w_01 align-right">
            <input
                class="dollars align-right"
                :ref="`input`"

                placeholder="?"
                type="text"
				v-model="balance"

                @input="formatingClientDeposit"

                @change="refresh( true )"
                @blur="refresh( true )"

                @click="setFocus"
            >
        </td>

        <td class="persent persents align-right min-w_01">
            <span> {{ percentageOfTheTotalDeposit | deleteNull | toNormalNumbers | addSymbol( '%' ) }} </span>
        </td>

<!-- profit 1 -->
        <td class="profit align-right second profit_1">
            {{ firstProfit | deleteNull | toNormalNumbers }}
        </td>

<!-- profit 2 -->
        <td class="profit2 align-right profit_2 first">
            {{ secondProfit | deleteNull | toNormalNumbers }}
        </td>

        <td class="total align-right min-w_01">
            <span class="dollars align-right">
                {{ depositAndProfit$ | deleteNull | toNormalNumbers }}
            </span>
            
        </td>

        <td class="persent__total align-right min-w_01">
            <span class="persents">
                {{ depositAndProfitPersent | deleteNull | toNormalNumbers | addSymbol( '%' ) }}
            </span>
        </td>
    </tr>

</template>

<script>
// functions
import { calculeClientData } from '../../js/calc/calculeClientData.js'

const parse = num => `${num}`.replace(/[^\d.]+/g );
const stringify = num => `${( +num ).toFixed( 4 )}`.replace(/\./g, ' . ')

export default {
	name: 'Client',
	props: [
		'totalDeposit',
		'totalProfit',
		'clientBalance',
        'trader',
        'id',
        'activeInput'
	],
	data(){
		return {
			balance: 0,
			percentageOfTheTotalDeposit: 0,
			firstProfit: 0,
			secondProfit: 0,
			depositAndProfit$: 0,
            depositAndProfitPersent: 0
		}
    },
    methods: {
        refresh( emit = true ){
            let calculedData = calculeClientData( this.totalDeposit, this.totalProfit, this.balance, this.trader );
            this.percentageOfTheTotalDeposit = calculedData.percentageOfTheTotalDeposit;
            this.firstProfit = calculedData.firstProfit;
            this.secondProfit = calculedData.secondProfit;
            this.depositAndProfit$ = calculedData.depositAndProfit$;
            this.depositAndProfitPersent = calculedData.depositAndProfitPersent;
            if( emit === true ) {
                this.$emit( 'changeTotalDeposit', this.trader ? -1 : this.id-1, this.balance );
                this.refresh( false );
            }
            if( this.balance !== 0 && this.balance !== '0.0000' && this.balance != 0 ){
                this.balance = ( +this.balance ).toFixed( 4 );
            } else {
                this.balance = '';
            }
            
            
        },
        setFocus(){
            this.$emit( 'setFocus', this.id );
        },
        updateFocus(){
            this.$emit( 'updateFocus' );
        },
        formatingClientDeposit(){
            this.balance = this.balance.replace( /[^+\d-\.]/g, '' );
        }
    },
	mounted(){

        this.balance = this.clientBalance;

        let calculedData = calculeClientData( this.totalDeposit, this.totalProfit, this.balance, this.trader );

        for( let value in calculedData )
            this[value] = calculedData[value];
    

        this.refresh( false );
    },
    watch: {
        totalDeposit(){
            this.refresh( false );
        },
        totalProfit(){
            this.refresh( false );
        },
        clientBalance(){
            this.refresh( false );            
        },
        activeInput(){
            if( this.activeInput === this.id ){
                this.$refs.input.focus();
            }
        }
    }
}

</script>

<style scoped>

    .min-w_01 {
        min-width: 60px;
        width: 60px !important;
    }

    td {
        max-width: 58px;
    }

    .row * {
        font-size: 10px !important;
    }

    .align-right {
        text-align: right !important;
    }

    .persents {
        font-size: 10px;
    }

    /* .first {
        z-index: 0;
        left: 0px;
        position: relative;
        
    }
    .second {
        z-index: 0;
        right: 0px;
        position: relative;
        font-size: 10px;
    } */


    .trader > td {
        /* width: 15px; */
        /* text-align: center; */
        /* padding: 4px; */
        height: 25px;
        color: #f9632c;
    }

    td.persent__total {
        font-size: 13px;
        /* width: 65px; */
    }

    td.total {
        border-left: 1px solid #2b2b2b !important;
        /* width: 90px; */
        font-size: 10px;
        text-align: right;
    }

    td.profit {
        font-size: 10px;
        width: 41px;
        text-align: right;
        min-width: 64px;
    }
    td.profit2 {

        margin-left: -22px;
        font-size: 10px;
        min-width: 64px;
        width: 41px;
        text-align: right;
    }

    #profit_1 {
        width: 35px !important;
    }

    #profit_2 {
        width: 35px !important;
    }

    td.deposit {
        padding: 0px;
        margin: 0px;
        width: 60px;
    }

    td.deposit > input {
        text-align: right;
        /* width: 60px; */
    }

    td.persent {
        font-size: 13px;
        /* width: 75px; */
        text-align: right;
    }

    td.name {
        font-size: 10px;
        width: 15px;
        text-align: center;
        border-right: 1px solid #2b2b2b;
    }

    .trader > .deposit > input[type="text"]::-webkit-input-placeholder {
        color: #f9632c;
    } 
    .trader > .deposit > input[type="text"]::-moz-placeholder {
        color: #f9632c;
    }

    td {
        /* width: 80px; */
        height: 25px;
        border: 1px solid #e8e8e8;
        padding: 4px;
    }

    input {
        text-align: center;
        border: none;
        width: 97%;
        height: 100%;
        padding-left: 3px;
        padding: 1px;
    }

    .trader > .deposit > input {
        color: #f9632c;
    }

    input:focus {
        outline: none;
        border: none;
    }

    .changed {
        background-color: rgb( 240, 240, 240 );
    }

    .changed * {
        background-color: rgb( 240, 240, 240 );
    }

</style>