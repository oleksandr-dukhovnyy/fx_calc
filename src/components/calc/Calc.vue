<template>

    <table class="calculated__profit">
        <tr class="head min_w_02" v-if="showHeaderTexts">
            <td class="lineB lineA hideSelection">№</td>
            <td class="f__size__12 bolder lineB hideSelection min_w_02">депо ($)</td>
            <td class=" f__size__12 lineB hideSelection">депо (%)</td>
            <td colspan="2" class="f__size__12 bolder lineB hideSelection">прибыль ($)</td>
            <td class="f__size__12 bolder line lineB hideSelection min_w_02">депо +&nbsp;пр.&nbsp;($)</td>
            <td class="lineB f__size__12 hideSelection min_w_02">депо +&nbsp;пр.&nbsp;(%)</td>
        </tr>
        <tr v-else>
            <td class="lineB lineA hideSelection">№</td>
            <td class="f__size__12 bolder lineB hideSelection min_w_02"></td>
            <td class=" f__size__12 lineB hideSelection"></td>
            <td colspan="2" class="f__size__12 bolder lineB hideSelection"></td>
            <td class="f__size__12 bolder line lineB hideSelection min_w_02"></td>
            <td class="lineB f__size__12 hideSelection min_w_02"></td>
        </tr>
        <tr class="hide temp" v-if="showHeaderTexts">
            <td class="bordered lineA"></td>
            <td class="bordered hard-reset"></td>
            <td class="bordered"></td>
            <td class="bordered f__size__10 w60_5">до 50%</td>
            <td class="bordered f__size__10 w60_5">после 50%</td>
            <td class="line bordered"></td>
            <td class="bordered"></td>
        </tr>
        <tr class="hide temp" v-else>
            <td class="bordered lineA"></td>
            <td class="bordered hard-reset"></td>
            <td class="bordered"></td>
            <td class="bordered f__size__10 w60_5"></td>
            <td class="bordered f__size__10 w60_5"></td>
            <td class="line bordered"></td>
            <td class="bordered"></td>
        </tr>
        <tr class="techHeader">
            <td class="lineB bordered lineA"></td>
            <td class="lineB bordered">
                <span
                    class="total__deposit dollars"
                > {{ totalDeposit | deleteNull | toNormalNumbers }} </span>
            </td>

            <td  class="bold lineB bordered">100%</td>
            <td
				class="lineB bordered changed center"
                colspan="2"   
            >    
                <input
                    type="text"
                    class="profit-input bold"
                    placeholder="?"

					v-model="totalProfit"

                    @keydown="updateFocus"
                    @change="formatingTotalProfit"
                    @click="setFocus( -1 )"
                    @input="numberOnly( 'totalProfit' )"
                    :ref="'input'"
                >
            </td>
            <td class="line lineB bordered">
                <span class="show__total">
                    {{ +totalDeposit + +totalProfit | deleteNull | toNormalNumbers }}
                </span>
            <td class="bold lineB bordered">100%</td>
        </tr>

		<Client
			:clientBalance="traderDeposit"
			:totalProfit="totalProfit"
			:totalDeposit="totalDeposit"
			:trader="true"
            :id="0"

            :activeInput="activeInput"

            :key="-1"
			@changeTotalDeposit="changeTotalDeposit"
            @updateFocus="updateFocus"
            @setFocus="setFocus"

		/>

       	<Client
			v-for="( item, i ) of clients"
			:key="i"

			:clientBalance="item"
			:totalProfit="totalProfit"
			:totalDeposit="totalDeposit"
			:trader="false"
			:id="i+1"

            :activeInput="activeInput"

            @changeTotalDeposit="changeTotalDeposit"
            @updateFocus="updateFocus"
            @setFocus="setFocus"
	   />
    </table>

</template>

<script>
// import Journal

// components
import Client from './Client.vue';

export default {
    name: 'Calc',
    props: [
        'showHeaderTexts'
    ],
	components: {
		Client
	},
	data(){
		return {
			clientsLength: 12,
			clients: [],
			traderDeposit: 0,
			totalProfit: '',
            totalDeposit: 0,
            totalProfitAndTotalDeposit: 0,
            activeInput: -1,
		}
	},
	methods: {
        formatingTotalProfit(){
            this.totalProfit = ( +this.totalProfit ).toFixed( 4 );
        },
        numberOnly( field ){
            this[field] = this[field].replace( /[^+\d-\.\,]/g, '' );
        },
        updateFocus( e = {key: 'Enter'} ){
            if( e.key === "Enter" ){
                if( this.activeInput > this.clientsLength-1 ){
                    this.activeInput = -1;
                    if( this.$refs.input.focus ){
                        this.$refs.input.focus();
                    };
                } else {
                    this.activeInput++;
                }
            }
            this.changeTotalDeposit();
        },
        setFocus( id ){
            if( id === -1 ){
                this.activeInput = -1;
            }
            this.activeInput = id;
            this.changeTotalDeposit();
        },
		changeTotalDeposit( id = null, newValue = '' ){
            newValue = newValue === '' ? 0 : +newValue;
            if( id === -1 ){
                this.traderDeposit = newValue;
            } else {
                this.clients.forEach( ( item, i ) => {                    
                    if( i === id ){                        
                        this.clients.splice( i, 1, newValue );
                    }
                });
            }
            let totalDeposit = 0;
            this.clients.forEach( item => totalDeposit += +item );
            totalDeposit += +this.traderDeposit;
            this.totalDeposit = totalDeposit;
        },

	},
	mounted(){
        for( let i = 0; i < this.clientsLength; i++ ){
            this.clients.push( 0 );
        }
        // get data from server...

    },
}

</script>

<style scoped>

    /* .w60_5 {
        width: 60.5px;
    } */

    .center {
        text-align: center;
    }

    #min_w_02 > td {
        width: 49px !important;
    }

    .total__deposit {
        width: calc( 100% + 5px );
    }

    .w104 {
        /* width: 104px !important; */
        padding: 0 5px !important;
    }

    body::-webkit-scrollbar { width: 0 !important; }

    body { -ms-overflow-style: none !important; }

    body { overflow: -moz-scrollbars-none !important; }

    .profit-input {
        font-size: 10px;
    }

    .changed {
        background-color: rgb( 240, 240, 240 );
    }

    .changed * {
        background-color: rgb( 240, 240, 240 );
    }
    .f__size__10 {
        font-size: 10px;
    }

    .persents {
        font-size: 10px;
    }
    .bordered {
        border: 1px solid #e8e8e8;
    }
    .lineB {
        border-bottom: 1px solid #2b2b2b !important;
    }
    .lineA {
        border-right: 1px solid #2b2b2b !important;
    }
    .line {
        border-left: 1px solid #2b2b2b !important;
    }
    .temp {
        height: 25px;
    }
    .f__size__12 {
        font-size: 12px;
    }
    .bold {
        font-weight: 600;
    }
    .hide {
        border: none !important;
    }
    .techHeader > * {
        height: 25px;
        font-weight: bolder;
    }
    .head > td {
        height: 25px;
    }
    tr.head {
        padding: 15px;
    }
    tr {
        margin: 5px;
    }
    td {
        text-align: center;
		padding: 0 3px;
    }
    .head > td {
        border: 1px solid #e8e8e8;
    }
    input {
        border: none;
        text-align: center;
        width: 97%;
        height: 100%;
    }

    .show__total {
        font-size: 10px;
    }

    .calculated__profit {
        border-spacing: 0px;
        margin-left: 10px;
        margin-top: 10px;
        margin-bottom: 100px;
        border: 1px solid #2b2b2b;
        margin-right: 10px;
        font-size: 10px !important;
    }

    .error {
        border: 1px solid red;
    }
    .error::after {
        content: 'Прибыль должна быть не меньше нуля!';
        padding: 3px;
        border: 1px solid #2b2b2b;
        border-radius: 3px;
    }
    .hideSelection::selection {
        background-color: transparent;
    }

</style>