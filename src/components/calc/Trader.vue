<template>
  <tr class="trader">
    <td
      class="user-date-ceil b_clean-bottom p-clear-hard ov-hide theme-clr bg-group-header b_left b_right"
    >
      <Date :userID="showId" />
    </td>
    <td class="name b_clean-bottom b_right color-trader bg-group-header">
      {{ showId }}
    </td>

    <td class="editable fs-8 b_clean editable-bg ">
      <input
        class="fs-8 color-trader placeholder-trader"
        placeholder="?"
        type="text"
        :value="trader.depo"
        @change="updateDeposit"
        @keypress="checkEnter($event)"
        :ref="`input`"
      />
    </td>

    <td class="color-blue b_right">
      {{ trader.percentFromDeposit | calcTd | number | addSymbol('%') }}
    </td>

    <td class="b_clean b_left theme-clr">
      {{ trader.balance | calcTd | number }}
    </td>

    <td class="none b_clean">
      <span class="color-muted">
        {{ trader.balanceInPercents | calcTd | number | addSymbol('%') }}
      </span>
    </td>

    <td class="none color-trader fs-8 b_clean">
      {{ trader.profit | deleteNull | toNormalNumbers }}
    </td>

    <td class="none color-trader fs-8 b_clean">
      {{ trader.profitInPercents | calcTd | number | addSymbol('%') }}
    </td>

    <td class="b_right none color-browl no-const-contain">no = const</td>

    <td class="fs-8 none color-trader b_clean">
      {{ trader.finalProfit | calcTd | number }}
    </td>

    <td class="fs-7 b_right none no-const-contain color-trader bold">
      no = const
    </td>

    <td class="fs-8 none color-trader editable-like b_clean">
      {{ trader.newCapital | calcTd | number }}
    </td>

    <td class="b_right none color-green">
      {{ trader.newCapitalInPercents | calcTd | number | addSymbol('%') }}
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex';

import Date from './Date.vue';

const actionsList = [
  'updateUserDeposit',
  'updateFocusDown',
  'registerInputCallback',
];

export default {
  name: 'Trader',
  components: {
    Date,
  },
  props: ['trader', 'showId'],
  methods: {
    ...mapActions(actionsList),
    setFocus() {
      this.$refs.input.focus();
    },
    updateDeposit(e) {
      if (!isNaN(+e.target.value)) {
        this.updateUserDeposit({
          id: this.trader.id,
          newValue: +e.target.value,
        });
      } else {
        this.updateUserDeposit({ id: this.trader.id, newValue: 0 });
      }
    },
    checkEnter(e) {
      if (e.keyCode === 13) {
        this.updateFocusDown({ id: this.showId, type: 'depos' });
      }
    },
  },
  mounted() {
    this.registerInputCallback({
      id: this.showId,
      callback: this.setFocus,
      type: 'depos',
    });
  },
};
</script>

<style lang="scss" scoped>
.no-const-contain {
  font-weight: normal !important;
}

.theme {
  &-clr {
    @include darkTheme() {
      color: $base-darkTheme-text-color;
    }

    &-i {
      @include darkTheme() {
        color: $base-darkTheme-text-color !important;
      }
    }
  }
}

td {
  font-size: 7pt;
  padding: 5px 4px 3px 4px;
  text-align: right;
  white-space: nowrap;

  > input {
    width: 100%;
    height: 100%;
    border: 0px;
    outline: none;
    text-align: right;
    background-color: transparent;

    &:focus,
    &:active {
      outline: none;
      border: 0px;
      background-color: transparent;
    }
  }

  .editable {
    background-color: $base-editable-color;

    @include darkTheme() {
      background-color: $theme-dark-bg-color;
    }
  }
}

.name {
  text-align: center;
  width: 13px;
}
</style>
