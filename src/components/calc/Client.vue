<template>

<tr :class="{ trader: trader }">
        <td class="name"
        >
            {{ trader ? 1 : id + 2 }}
        </td>

        <td class="deposit changed">
            <input
                class="dollars"
                :ref="`input`"

                placeholder="?"
                type="text"
				v-model="balance"

                @blur="refresh()"
            >
        </td>

        <td class="persent persents">
            <span> {{ percentageOfTheTotalDeposit | deleteNull | toNormalNumbers | addSymbol( '%' ) }} </span>
        </td>

        <td class="profit">
            <span class="second">
                {{ firstProfit | deleteNull | toNormalNumbers }}
            </span>
        </td>

        <td class="profit2">
            <span class="first">
                <span>
                    {{ secondProfit | deleteNull | toNormalNumbers }}
                </span>
            </span>
        </td>

        <td class="total">
            <span class="dollars">
                {{ depositAndProfit$ | deleteNull | toNormalNumbers | addSymbol( '$' ) }}
            </span>
            
        </td>

        <td class="persent__total">
            <span class="persents">
                {{ depositAndProfitPersent | deleteNull | toNormalNumbers | addSymbol( '%' ) }}
            </span>
        </td>
    </tr>

</template>

<script>
// functions
import { calculeClientData } from '../../js/calc/calculeClientData.js'

const parse = num => +(`${num}`.replace(/[^\d.]+/g ) );
const stringify = num => `${( +num ).toFixed( 4 )}`.replace(/\./g, ' . ')

export default {
	name: 'Client',
	props: [
		'totalDeposit',
		'totalProfit',
		'clientBalance',
        'trader',
        'id'
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
                this.$emit( 'changeTotalDeposit', this.trader ? -1 : this.id, this.balance );
                this.refresh( false );
            }

            if( this.balance !== 0 && this.balance !== '0.0000' && this.balance != 0 ){
                this.balance = ( +this.balance ).toFixed( 4 );
            } else {
                this.balance = '';
            }
            
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
        }
    }
}

</script>

<style scoped>

    .dollars {
        font-size: 12px;
    }
    .persents {
        font-size: 11px;
    }

    .first {
        z-index: 0;
        left: 0px;
        position: relative;
        
    }
    .second {
        z-index: 0;
        right: 0px;
        position: relative;
        font-size: 10px;
    }


    .trader > td {
        width: 15px;
        text-align: center;
        padding: 4px;
        height: 25px;
        color: #f9632c;
    }

    td.persent__total {
        font-size: 13px;
        width: 65px;
        text-align: right;
        padding-right: 18px;
    }

    td.total {
        border-left: 1px solid #2b2b2b !important;
        width: 90px;
        font-size: 12px;
        text-align: right;
        padding-right: 18px;
    }

    td.profit {

        font-size: 10px;
        width: 45px;
        text-align: right;
        padding-right: 18px;
    }
    td.profit2 {

        margin-left: -22px;
        font-size: 10px;
        width: 45px;
        text-align: right;
        padding-right: 18px;
    }

    td.deposit {
        font-size: 13px;
        font-weight: 600;
    }

    td.deposit > input {
        text-align: right;
    }

    td.persent {
        font-size: 13px;
        width: 75px;
        text-align: right;
        padding-right: 10px;
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
        width: 80px;
        height: 25px;
        border: 1px solid #e8e8e8;
        padding: 4px;
    }

    input {
        text-align: center;
        border: none;
        width: 100%;
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