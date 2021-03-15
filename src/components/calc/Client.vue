<template>

    <tr :class="{ last: showId === usersLength }">
        <td class="user-date-ceil b_s p-clear-hard ov-hide">
            <Date
                :userID="showId"
            />
        </td>
        <td class="name b_right">
            {{ showId }}
        </td>

        <td class="editable fs-8">
            <input
                class="fs-8"
                placeholder="?"
                type="text"

                :value="client.depo"
                
                @change="updateDeposit"
                @keypress="checkEnter( $event )"

                :ref="`input`"
            >
        </td>

        <td class="b_right color-blue">
            {{ client.percentFromDeposit | calcTd | number | addSymbol( '%' ) }}
        </td>

        <td>
            {{ client.balance | calcTd | number }}
        </td>

        <td class="none">
            <span class="color-muted">
                {{ client.balanceInPercents | calcTd | number | addSymbol( '%' ) }}
            </span>
        </td>

        <td class="none">
            {{ client.profit | calcTd | number }}
        </td>

        <td class="none color-muted">
            {{ client.profitInPercents | calcTd | number | addSymbol( '%' )}}
        </td>

        <td class="b_right none color-browl">
            {{ client.traderBonus | calcTd | number }}
        </td>

        <td class="fs-8 bold none">
            {{ client.finalProfit | calcTd | number }}
        </td>
        
        <td class="fs-8 b_right bold none">
            {{ client.finalProfitInPercents | calcTd | number | addSymbol( '%' ) }}
        </td>
        
        <td class="fs-8 none ">
            {{ client.newCapital | calcTd | number }}
        </td>
        
        <td class="b_right none color-green">
            {{ client.newCapitalInPercents | calcTd | number | addSymbol( '%' ) }}
        </td>
    </tr>

</template>

<script>

import Date from './Date.vue';

import {
    mapActions,
    mapGetters
} from 'vuex';

const actionsList = [
    'updateUserDeposit',
    'updateFocusDown',
    'regiterInputCallback',
];

const gettersList = [
    'usersLength'
];

export default {
	name: 'Client',
    props: ['client', 'showId'],
    components: { Date },
    computed: mapGetters( gettersList ),
    methods: {
        ...mapActions( actionsList ),
        setFocus(){
            this.$refs.input.focus();
        },
        updateDeposit( e ){
            if ( !isNaN( +e.target.value ) ){
                this.updateUserDeposit( {id: this.client.id, newValue: +e.target.value} );
            } else {
                this.updateUserDeposit( {id: this.client.id, newValue: 0} );
            }
        },
        checkEnter( e ){
            if( e.keyCode === 13 ){
                this.updateFocusDown( {id: this.showId, type: 'depos'} );
            }
        },
    },
	mounted(){
        this.regiterInputCallback({
            id: this.showId,
            callback: this.setFocus,
            type: 'depos'
        });
    }
}

</script>

<style lang="scss" scoped>
    @import '../../assets/SCSS/base.scss';

    td.editable {
        background-color: #f1f1f1;
    }
    td {
        border: 1px solid $base-border-color;
        font-size: 7pt;
        padding: 4px;
        text-align: right;
    }
    td > input {
        width: 100%;
        height: 100%;
        border: 0px;
        outline: none;
        text-align: right;
        background-color: transparent;
    }

    .name {
        text-align: center;
    }

    tr > td.b_right {
        border-right: 1px solid #000;
    }
    tr > td.b_left {
        border-left: 1px solid #000;
    }

    .last > td {
        border-bottom: 1px solid black;
    }

</style>