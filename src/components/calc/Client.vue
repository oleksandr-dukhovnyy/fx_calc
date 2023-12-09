<template>
  <tr :class="{ last: showId === usersLength }">
    <td
      class="user-date-ceil p-clear-hard ov-hide b_clean b_right b_left theme-clr bg-group-header"
      :class="{
        'selection-on': selections.includes(0),
      }"
      @mouseenter="mouseenter(0)"
    >
      <Date :userID="showId" />
    </td>
    <td class="name theme-clr b_clean b_right bg-group-header">
      {{ showId }}
    </td>

    <td class="editable editable-bg fs-8 theme-brd b_clean">
      <input
        class="fs-8 theme-clr plcdr-red"
        placeholder="?"
        type="text"
        :value="client.depo"
        @change="updateDeposit"
        @keypress="checkEnter($event)"
        :ref="`input`"
      />
    </td>

    <td class="b_clean-right b_clean-left b_clean-bottom b_right color-blue">
      {{ client.percentFromDeposit | calcTd | number | addSymbol('%') }}
    </td>

    <td class="b_clean theme-clr">
      {{ client.balance | calcTd | number }}
    </td>

    <td class="none b_clean">
      <span class="color-muted">
        {{ client.balanceInPercents | calcTd | number | addSymbol('%') }}
      </span>
    </td>

    <td class="none b_clean theme-clr">
      {{ client.profit | calcTd | number }}
    </td>

    <td class="none color-muted b_clean">
      {{ client.profitInPercents | calcTd | number | addSymbol('%') }}
    </td>

    <td class="b_right none color-browl b_clean b_right">
      {{ client.traderBonus | calcTd | number }}
    </td>

    <td class="fs-8 none b_clean theme-clr bold-hard">
      {{ client.finalProfit | calcTd | number }}
    </td>

    <td class="fs-8 b_right none b_clean b_right theme-clr bold-hard">
      {{ client.finalProfitInPercents | calcTd | number | addSymbol('%') }}
    </td>

    <td class="fs-8 none b_clean theme-clr editable-like">
      {{ client.newCapital | calcTd | number }}
    </td>

    <td class="b_right none color-green b_clean">
      {{ client.newCapitalInPercents | calcTd | number | addSymbol('%') }}
    </td>
  </tr>
</template>

<script>
import Date from './Date.vue';

import { mapActions, mapGetters } from 'vuex';

const actionsList = [
  'updateUserDeposit',
  'updateFocusDown',
  'registerInputCallback',
];

const gettersList = ['usersLength'];

export default {
  name: 'Client',
  props: ['client', 'showId'],
  data: () => ({
    selectionsArr: [],
  }),
  components: { Date },
  computed: {
    ...mapGetters(gettersList),
    selections() {
      return this.selectionOn ? this.selectionsArr : (this.selectionsArr = []);
    },
  },
  methods: {
    ...mapActions(actionsList),
    setFocus() {
      this.$refs.input.focus();
    },
    updateDeposit(e) {
      if (!isNaN(+e.target.value)) {
        this.updateUserDeposit({
          id: this.client.id,
          newValue: +e.target.value,
        });
      } else {
        this.updateUserDeposit({ id: this.client.id, newValue: 0 });
      }
    },
    checkEnter(e) {
      if (e.keyCode === 13) {
        this.updateFocusDown({ id: this.showId, type: 'depos' });
      }
    },
    mouseenter(id) {
      if (this.selectionOn === true) {
        this.selections.push(id);
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

td.editable {
  background-color: $base-editable-color;

  @include darkTheme() {
    background-color: $theme-dark-bg-color;
  }
}
td {
  border: 1px solid $base-border-color;
  font-size: 7pt;
  padding: 4px;
  text-align: right;

  @include darkTheme() {
    background-color: $theme-dark-bg-color;
    border: 1px solid $base-darkTheme-light-border-color;
  }
}
td > input {
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  text-align: right;
  background-color: transparent;

  @include darkTheme() {
    &::placeholder {
      color: $base-darkTheme-text-color;
    }
  }
}

.name {
  text-align: center;
}

tr > td.b_right {
  border-right: 1px solid #000;

  @include darkTheme() {
    border-right: 1px solid $base-darkTheme-border-color;
  }
}
tr > td.b_left {
  border-left: 1px solid #000;

  @include darkTheme() {
    border-left: 1px solid $base-darkTheme-border-color;
  }
}

.last > td {
  border-bottom: 1px solid black;

  @include darkTheme() {
    border-bottom: 1px solid $base-darkTheme-border-color;
  }
}

// .b {
//     // &_s {
//     //     @include darkTheme(){
//     //         border-top: 1px solid $base-darkTheme-light-border-color;
//     //         border-bottom: 1px solid $base-darkTheme-light-border-color;
//     //     }
//     // }

//     &_l {
//         @include darkTheme(){
//             // border-top: 1px solid $base-darkTheme-light-border-color;
//             // border-bottom: 1px solid $base-darkTheme-light-border-color;
//         }
//     }
// }

// .bc {
//     &-t {
//         border-top: 1px solid $base-darkTheme-light-border-color;
//     }

//     &-r {
//         border-right: $base-darkTheme-light-border-color;
//     }

//     &-b {
//         border-bottom: $base-darkTheme-light-border-color;
//     }

//     &-l {
//         border-left: $base-darkTheme-light-border-color;
//     }
// }
</style>
