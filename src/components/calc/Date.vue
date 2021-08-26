<template>
  <!-- format - [dd.mm.yyyy - dd.mm.yyyy] -->
  <div class="data-picker_contain p-clear-hard ov-hide-hard"
    @click="edit"
  >
  <div class="input" v-show="editable || calendarFocused || showDate !== ''">
      <input
        class="data-picker_input fs-7 theme-clr"
        type="text"

        :value="showDate"

        @input="numberOnly( $event )"
        @blur="inputBlur"

        @focus="openDatepicker"
        @click="openDatepicker"

        @keypress="checkEnter( $event )"

        :ref="'input'"
      />
      <div class="modal-block ov-hide">
        <div class="picker fs-7">
          <DatePicker
            v-model="dateValue"
            type="daterange"
            :picker-options="pickerOptions"
            align="right"
            size="mini"
            format="dd.MM.yyyy"
            value-format="dd.MM.yyyy"
            popper-class="date-picker"
            unlink-panels

            v-if="showDatepicker"

            @change="selectDate"
            @focus="calendarFocus"
            @blur="calendarBlur"

            :ref="'dataPicker'"
          />  
        </div>
      </div>
    </div>
    <div
      class="input"
      v-if="!editable && !calendarFocused && showDate === ''"
    >
      <img class="calendar-icon" src="../../assets/icons/calendar1.png" alt="edit date">
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

import {DatePicker} from 'element-ui';
import shortsCutsArr from './../../js/calc/getFastCut.js';

const actions = ['regiterInputCallback', 'updateFocusDown'];

export default {
  name: "Date",
  props: ['userID'],
  components: {
    DatePicker
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: shortsCutsArr,
      },
      showDate: '',
      dateValue: '',
      editable: false,
      calendarFocused: false,
      showDatepicker: true
    };
  },
  methods: {
    ...mapActions( actions ),
    checkEnter( e ){
      if( e.keyCode === 13 ){
        this.$refs.input.blur();
        this.editable = false;
        this.calendarBlur();
        this.showDatepicker = false;
        setTimeout( () => {
          this.showDatepicker = true;
          this.updateFocusDown( {id:this.userID - 1, type: 'dates'} );
        }, 0);
      }
    },
    openDatepicker(){
      this.editable = true;
      let node = this.$refs.dataPicker;
      if( node !== undefined ){
        node.focus();
      }
    },
    inputBlur(){
      this.editable = false;
    },
    calendarFocus(){
      this.calendarFocused = true;
    },
    calendarBlur(){
      this.calendarFocused = false;
    },
    selectDate( dateRange ){
      if( dateRange !== null ){
        this.showDate = `${dateRange.join( ' - ' )}`;
      }
    },
    edit(){
      if( this.editable === false ){
        this.openDatepicker();
      }
      setTimeout( () => {
        this.$refs.input.focus();
      }, 200 );
    },
    setFocus(){
      this.edit();
      this.$refs.input.focus();
    },
    numberOnly( event ){
      this.showDate = event.target.value.replace( /(?!s)[^0-9\.\s-]/g, '' );
    },
  },
  mounted() {
    this.regiterInputCallback({
        id: this.userID - 1,
        callback: this.setFocus,
        type: 'dates'
      });

    document.addEventListener( 'keypress', e => {
      if( !isNaN( +e.key ) && +e.key < 7 && +e.key > 0 ){
        this.showNow = +e.key;
      } else if( +e.key === 0 ) {
        this.showNow = 1;
      }
    });
  }
};
</script>

<style lang="scss" scoped>

@import "../../assets/SCSS/base.scss";
@import '../../assets/SCSS/mixins.scss';
@import '../../assets/SCSS/themes.scss';

.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  position: relative;
  opacity: 0;
  height: 0px;
  width: 0px;
  left: 0px;
}

.data-picker {
  &_input {
    width: calc( 100% - 8px );
    padding-left: 0 4px;
    text-align: center;

    &,
    &:focus,
    &:active {
      outline: none;
      border: 1px solid transparent;
      background-color: transparent;
    }
  }
  &_contain {
    max-width: 100%;
    line-height: 16px;
    height: 16px;
    text-align: center;
  }
}

.data-picker_contain *:hover {
  cursor: pointer;
}

.modal-block {

  position: relative;
  top: -10px;
}

.calendar-icon {
  height: 16px;
  background-repeat: no-repeat;
}

.picker {
  height: 0px;
}

.theme {
  &-clr {
    @include darkTheme(){
      color: $base-darkTheme-text-color;
    }
  }
}

</style>