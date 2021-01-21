<template>

    <table class="calculated__profit">
        <tr class="head">
            <td class="lineB lineA hideSelection">№</td>

            <td class="f__size__12 bolder lineB hideSelection">депозит, $</td>

            <td class=" f__size__12 lineB hideSelection">депозит, %</td>

            <td colspan="2" class="f__size__12 bolder lineB hideSelection">прибыль, $</td>

            <td class="f__size__12 bolder line lineB hideSelection">депо + прибыль, $</td>

            <td class="lineB f__size__12 costyl hideSelection">депо + прибыль, %</td>
        </tr>
        <tr class="hide temp">
            <td class="bordered lineA"></td>
            <td class="bordered"></td>
            <td class="bordered"></td>
            <td class="bordered f__size__10">до 50%</td>
            <td class="bordered f__size__10">после 50%</td>
            <td class="line bordered"></td>
            <td class="bordered"></td>
        </tr>
        <tr class="techHeader">
            <td class="lineB bordered lineA"></td>
            <td class="lineB bordered">
                <span
                    class="total__deposit dollars"
                > {{ totalDeposit | deleteNull | toNormalNumbers | addSymbol( '$' ) }} </span>
            </td>

            <td  class="bold lineB bordered persents">100%</td>
            <td
				class="lineB bordered changed"
                colspan="2"   
            >    
                <input
                    type="text"
                    class="dollars _profitInput"
                    placeholder="?"

					v-model="totalProfit"
                >
            </td>
            <td class="line lineB bordered">
                <span class="show__total">
                    {{ +totalDeposit + +totalProfit | deleteNull | toNormalNumbers | addSymbol( '$' ) }}
                </span>
            <td class="bold lineB bordered persents">100%</td>
        </tr>

		<Client
			:clientBalance="traderDeposit"
			:totalProfit="totalProfit"
			:totalDeposit="totalDeposit"
			:trader="true"
            :id="0"

            :key="-1"
			@changeTotalDeposit="changeTotalDeposit"
		/>

       	<Client
			v-for="( item, i ) of clients"
			:key="i"

			:clientBalance="item"
			:totalProfit="totalProfit"
			:totalDeposit="totalDeposit"
			:trader="false"
			:id="i"

            @changeTotalDeposit="changeTotalDeposit"
	   />
    </table>

</template>

<script>

// components
import Client from './Client.vue';

export default {
	name: 'Calc',
	components: {
		Client
	},
	data(){
		return {
			clientsLength: 12,
			clients: [],
			traderDeposit: 0,
			totalProfit: 0,
            totalDeposit: 0,
            totalProfitAndTotalDeposit: 0
		}
	},
	methods: {
		changeTotalDeposit( id, newValue ){
            newValue = newValue === "" ? 0 : +newValue;
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
        }
	},
	mounted(){
        for( let i = 0; i < this.clientsLength; i++ ){
            this.clients.push( 0 );
        }
        // get data from server
    },
}

</script>

<style scoped>
    .changed {
        background-color: rgb( 240, 240, 240 );
    }

    .changed * {
        background-color: rgb( 240, 240, 240 );
    }
    .f__size__10 {
        font-size: 10px;
    }
    .costyl {
        width: 109px;
    }
    .dollars {
        font-size: 12px;
    }
    .persents {
        font-size: 13px;
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
		padding: 0 5px;
    }
    .head > td {
        border: 1px solid #e8e8e8;
    }
    input {
        border: none;
        text-align: center;
        width: 98%;
        height: 100%;
    }

    .show__total {
        font-size: 12px;
    }

    .calculated__profit {
        border-spacing: 0px;
        margin: 15px;
        margin-bottom: 100px;
        border: 1px solid #2b2b2b;
    }
    
    @media screen and ( max-width: 400px ) {
        .calculated__profit {
            margin-bottom: 35px;
        }
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