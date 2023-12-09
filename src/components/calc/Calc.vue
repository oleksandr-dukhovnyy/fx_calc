<template>
  <div class="calc-wrapper">
    <table cellpadding="0" class="calc">
      <tr class="header-first">
        <td
          colspan="2"
          class="logo p_clean-bottom border-clean-top border-clean-left"
        >
          <div class="logo-contain">
            <img src="../../assets/centerlogo.png" alt="logo" />
            <h2 class="logo-contain_title">center</h2>
          </div>
        </td>
        <td
          colspan="2"
          class="color-blue fs-8 b_clean-bottom-i bg-group-header"
        >
          Equity
        </td>
        <td colspan="2" class="dark-color b_clean-bottom-i bg-group-header">
          Balance
        </td>
        <td colspan="2" class="dark-color b_clean-bottom-i bg-group-header">
          Profit before 50/50
        </td>
        <td class="color-browl b_clean-bottom-i bg-group-header">50%</td>
        <td
          colspan="2"
          class="bold dark-color b_clean-bottom-i bg-group-header bold-color-hard"
        >
          Profit after 50/50
        </td>
        <td colspan="2" class="color-green b_clean-bottom-i bg-group-header">
          new Equity
        </td>
      </tr>

      <tr class="header-second">
        <td
          colspan="2"
          class="b_bottom p_clean-top b_s fs-7 clean-b-t border-clean-left"
        >
          <span class="color-black company-name">vip-person</span>
        </td>
        <td class="doll color-blue bg-group-header b_clean">$</td>
        <td class="perc color-blue bg-group-header">%</td>
        <td class="doll dark-color bg-group-header">$</td>
        <td class="perc dark-color bg-group-header b_clean">%</td>
        <td class="doll dark-color bg-group-header b_clean">$</td>
        <td class="perc dark-color bg-group-header">%</td>
        <td class="doll b_right color-browl bg-group-header">$</td>
        <td class="doll bold bold-color bg-group-header b_clean">$</td>
        <td class="perc bold bold-color bg-group-header">%</td>
        <td class="doll color-green bg-group-header b_clean">$</td>
        <td class="perc color-green bg-group-header">%</td>
      </tr>

      <tr class="header-technical b_left">
        <td class="date dark-color bg-group-header b_right">
          <span>
            date
          </span>
        </td>
        <td class=" fs-7 dark-color bg-group-header b_right">№</td>
        <td class="color-blue del-two del-three b_left">
          {{ header.totalDeposit | calcTd | number }}
        </td>
        <td class="b_clean-left color-blue del-one fs-7 b_right">
          100 % = const
        </td>
        <td
          class="editable b_def-right del-new-deposit b_clean-right-i editable-bg"
        >
          <input
            ref="input"
            type="text"
            placeholder="?"
            class="fs-6 dark-color plcdr-red editable-bg"
            :value="header.newDeposit"
            @change="_updateNewDeposit"
            @keypress="checkEnter"
          />
        </td>
        <td class="fs-7 del-one b_right dark-color">
          {{ header.newDepositInPercents | calcTd | number | addSymbol('%') }}
        </td>
        <td class="fs-7 del-two dark-color b_clean">
          {{ header.profit | calcTd | number }}
        </td>
        <td class="fs-7 del-one b_right dark-color">
          {{ header.profitInPercentes | calcTd | number | addSymbol('%') }}
        </td>
        <td class="color-browl b_right del-two">
          {{ header.traderBonus | calcTd | number }}
        </td>
        <td class="del-two dark-color b_clean bold-hard">
          {{ header.finalProfit | calcTd | number }}
        </td>
        <td class="del-one b_right b_clean-left-i bold color_mutted">
          {{ header.finalProfitInPercents | calcTd | number | addSymbol('%') }}
        </td>
        <td class="color-green del-two b_clean-right-i">
          {{ header.newCapital | calcTd | number }}
        </td>
        <td class="fs-7 color-green del-one b_right">100 % = const</td>
      </tr>

      <Trader
        v-for="(trader, i) in traders"
        :key="trader.id"
        :showId="i + 1"
        :trader="trader"
      />

      <Client
        v-for="(client, i) in clients"
        :key="client.id"
        :showId="i + 1 + traders.length"
        :client="client"
      />
    </table>

    <Controls />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Client from './Client.vue';
import Trader from './Trader.vue';
import Controls from './Controls.vue';

const gettersList = ['traders', 'clients', 'header'];

const actionsList = [
  'getUsersData',
  'updateNewDeposit',
  'updateFocusDown',
  'registerInputCallback',
];

export default {
  name: 'Calc',
  components: {
    Client,
    Trader,
    Controls,
  },
  methods: {
    ...mapActions(actionsList),
    _updateNewDeposit(e) {
      this.updateNewDeposit(e.target.value === '' ? 0 : +e.target.value);
    },
    setFocus() {
      this.$refs.input.focus();
    },
    checkEnter(e) {
      if (e.keyCode === 13) {
        this.updateFocusDown({
          id: 0,
          type: 'depos',
        });
      }
    },
  },
  computed: mapGetters(gettersList),
  mounted() {
    this.getUsersData();
    this.registerInputCallback({
      id: 0,
      callback: this.setFocus,
      type: 'depos',
    });
  },
};
</script>

<style lang="scss" scoped>
.border-clean-top {
  border-top: 1px solid transparent !important;
}
.border-clean-left {
  border-left: 1px solid transparent !important;
}

.new-total-depo {
  width: 65px;
}

td {
  // border: 1px solid $base-border-color;
  padding: 5px 4px 3px 4px;
  white-space: nowrap;

  // @include darkTheme() {
  // border: 1px solid $base-darkTheme-light-border-color;
  // }
}

.dark-color {
  &-mutted {
    @include darkTheme() {
      color: $base-darkTheme-text-color;
    }
  }

  @include darkTheme() {
    color: $base-darkTheme-text-color;
  }
}

.color_mutted {
  color: $color-mutted-w !important;

  @include darkTheme() {
    color: #b2b2b2 !important;
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

    @include darkTheme() {
      border: 1px solid $base-darkTheme-border-color;
    }
  }
}

.header-second {
  .perc {
    border-right: 1px solid black;

    @include darkTheme() {
      border-right: 1px solid $base-darkTheme-border-color;
    }
  }
  .doll {
    border-left: 1px solid black;

    @include darkTheme() {
      border-left: 1px solid $base-darkTheme-border-color;
    }
  }
  td {
    border-bottom: 1px solid black;

    @include darkTheme() {
      border-bottom: 1px solid $base-darkTheme-border-color;
    }
    text-align: center;
  }
}

.header-technical td {
  text-align: center;
  font-size: 8pt;
  border-bottom: 1px solid black;

  @include darkTheme() {
    border-bottom: 1px solid $base-darkTheme-border-color;
  }
}

table {
  border-collapse: collapse;
  margin: 7px 0 0;
  border: 1px solid black;
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;

  @include darkTheme() {
    border: 1px solid $base-darkTheme-border-color;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
  }
}

.logo-contain {
  display: flex;
  width: max-content;
  margin: 0px auto;
  border: 1px solid transparent;
  position: absolute;
  top: 0px;
  left: 39px;

  &_title {
    position: relative;
    // top: 2px;
    left: -5px;
    margin-left: 4px;
    color: black;
    font-size: 9pt;
    font-weight: normal;
    line-height: 100%;
    display: flex;
    align-items: flex-end;

    @include darkTheme() {
      color: $base-darkTheme-text-color;
    }
  }
  img {
    height: 21px;
    position: relative;
    left: 0px;
    top: 5px;
    // margin-top: -6px;
  }
}

td {
  &.logo {
    height: 10px !important;
    padding-bottom: 0px;
    position: relative;

    border-bottom: 0px solid $base-group-header-color !important;
  }

  &.p_clean {
    &-top {
      padding-top: 0px;
    }
    &-bottom {
      padding-bottom: 0px;
    }
  }

  &.editable {
    background-color: $base-editable-color;

    input {
      width: 100%;
      height: 100%;
      border: 0px;
      outline: none;
      background-color: transparent;
      text-align: center;

      @include darkTheme() {
        background-color: $theme-dark-bg-color;

        &::placeholder {
          color: $base-darkTheme-text-color;
        }
      }
    }

    @include darkTheme() {
      background-color: $theme-dark-bg-color;
    }
  }
}

.clean-b-t {
  // border-top: 1px solid $base-group-header-color;
  border-top: 1px solid transparent;
  @include darkTheme() {
    // border-top: 1px $bg-group-header-d;
    border-top: 1px solid transparent;
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

  @include darkTheme() {
    color: $base-darkTheme-text-color;
  }
}

@media (max-device-width: 900px) {
  .calc {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
