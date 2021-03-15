<template>

    <table cellpadding="0" class="calc">

        <tr class="header-first">
            <td colspan="2" class="b_s logo p_clean-bottom logo-td-contain">
                <div class="logo-contain">
                    <img src="../../assets/centerlogo.png" alt="logo">
                    <h2 class="logo-contain_title">
                        center
                    </h2>
                </div>
            </td>
            <td colspan="2" class="color-blue fs-8">Equity</td>
            <td colspan="2">Balance</td>
            <td colspan="2">Profit before 50/50</td>
            <td class="color-browl">50%</td>
            <td colspan="2" class="bold">Profit after 50/50</td>
            <td colspan="2" class="color-green">new Equity</td>
        </tr>

        <tr class="header-second">
            <td colspan="2" class="b_bottom b_clean-top p_clean-top b_s fs-7">
                <span class="color-black company-name">vip-person</span>
            </td>
            <td class="doll color-blue">$</td>
            <td class="perc color-blue">%</td>
            <td class="doll">$</td>
            <td class="perc">%</td>
            <td class="doll">$</td>
            <td class="perc">%</td>
            <td class="doll b_right color-browl">$</td>
            <td class="doll bold">$</td>
            <td class="perc bold-hard"
            >%</td>
            <td class="doll color-green">$</td>
            <td class="perc color-green">%</td>
        </tr>

        <tr class="header-technical">
            <td class="date b_s">date</td>
            <td class="b_right fs-7">№</td>
            <td class="color-blue del-two del-three">
                {{ header.totalDeposit | calcTd | number }}
            </td>
            <td class="b_clean-left color-blue del-one fs-7 b_right">100 % = const</td>
            <td class="editable b_def-right del-new-deposit">
                <input
                    type="text"
                    placeholder="?"
                    class="fs-6"
                    :value="header.newDeposit"

                    @change="_updateNewDeposit"
                    @keypress="checkEnter"

                    :ref="'input'"
                />
            </td>
            <td class="fs-7 del-one b_right">
                {{ header.newDepositInPercents | calcTd | number | addSymbol( '%' ) }}
            </td>
            <td class="fs-7 b_def-right del-two">
                {{ header.profit | calcTd | number }}
            </td>
            <td class="fs-7 del-one b_right">
                {{ header.profitInPercentes | calcTd | number | addSymbol( '%' ) }}
            </td>
            <td class="color-browl b_right del-two">
                {{ header.traderBonus | calcTd | number }}
            </td>
            <td class="b_def-right del-two bold"
            >
                {{ header.finalProfit | calcTd | number }}
            </td>
            <td class="del-one b_right bold color-muted">
                {{ header.finalProfitInPercents | calcTd | number | addSymbol( '%' ) }}
            </td>
            <td class="color-green b_def-right del-two">
                {{ header.newCapital | calcTd | number }}
            </td>
            <td class="fs-7 color-green del-one b_right">100 % = const</td>
        </tr>

        <Trader
            v-for="( trader, i ) in traders"
            :key="trader.id"

            :showId="i + 1"
            :trader="trader"
        />

        <Client
            v-for="( client, i ) in clients"
            :key="client.id"

            :showId="i + 1  + traders.length"
            :client="client"
        />

        <tr class="air" v-if="false">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import Client from './Client.vue';
import Trader from './Trader.vue';

const gettersList = [
    'traders',
    'clients',
    'header'
];

const actionsList = [
    'getUsersData',
    'updateNewDeposit',
    'updateFocusDown',
    'regiterInputCallback'
];

export default {
    name: 'Calc',
	components: {
		Client, Trader
	},
	methods: {
        ...mapActions( actionsList ),
        _updateNewDeposit( e ){
            this.updateNewDeposit( e.target.value === '' ? 0 : +e.target.value );
        },
        setFocus(){
            this.$refs.input.focus();
        },
        checkEnter( e ){
            if( e.keyCode === 13 ){
                this.updateFocusDown({
                    id: 0,
                    type: 'depos'
                });
            }
        }
    },
    computed: mapGetters( gettersList ),
	mounted(){
        this.getUsersData();
        this.regiterInputCallback({
            id: 0,
            callback: this.setFocus,
            type: 'depos',
        })
    },
}

</script>

<style lang="scss" scoped>

    @import '../../assets/SCSS/base.scss';

    .new-total-depo {
        width: 65px;
    }

    td {
        border: 1px solid $base-border-color;
        padding: 5px 4px 3px 4px;
        white-space: nowrap;
    }

    td.editable {
        background-color: #f1f1f1;
        input {
            width: 100%;
            height: 100%;
            border: 0px;
            outline: none;
            background-color: transparent;
            text-align: center;
        }
    }

    .header-first td,
    .header-second td {
        padding: 5px 2px;
        font-size: 8pt;
    }

    .header-first {
        td {
            border: 1px solid black;
            border-bottom: 0px solid transparent;
            text-align: center;
        }
    }

    .header-second {
        .perc {
            border-right: 1px solid black;
        }
        .doll {
            border-left: 1px solid black;
        }
        td {
            border-bottom: 1px solid black;
            text-align: center;
        }
    }

    .header-technical td {
        text-align: center;
        font-size: 8pt;
        border-bottom: 1px solid black;
    }

    table {
        border-collapse: collapse;
        margin: 7px 0 0 7px;
        border: 1px solid black;
    }

    .bold {
        font-weight: bold;
    }

    .logo-contain {
        display: flex;
        width: max-content;
        margin: 0px auto;

        &_title {
            position: relative;
            top: 2px;
            left: -4px;
            margin-left: 4px;
            color: black;
            font-size: 9pt;
            font-weight: normal;
            line-height: 100%;
            display: flex;
            align-items: flex-end;
        }
        img {
            height: 21px;
            position: relative;
            left: 1px;
            top: 6px;
            margin-top: -6px;
        }
    }

    td.logo {
        height: 10px !important;
        padding-bottom: 0px;
    }

    td.p_clean {
        &-top {
            padding-top: 0px;
        }
        &-bottom {
            padding-bottom: 0px;
        }
    }

    .air {
        opacity: 0;
        height: 350px;

        & td {
            border: 1px solid transparent !important;
        }
    }

    .date {
        padding-left: 4px;
    }

    .company-name {
        position: relative;
        left: 3px;
    }

    @media ( max-device-width: 900px ) {
        .calc {
            margin-left: auto;
            margin-right: auto;
        }
    }

</style>