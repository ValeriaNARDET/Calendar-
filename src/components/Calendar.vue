<template>
  <div class="calendar calendar_months">
    <div>
      <button class="btn btn_prevMonth" @click="slideLeft()">btn</button>
      <button class="btn btn_prevMonth" @click="slideRight()">btn</button>
    </div>
    <div class="month-wrapper">
      <div 
        class="month month_row" 
        v-for="(month, m) in months"
      >
        <div class="title" v-text="month.title"></div>

        <div class="week">
          <div 
            class="day" 
            v-for="(weekDay, wd) in week" 
          >
            <span class="day_bold" v-text="weekDay"></span>
          </div>
        </div>

        <div 
          class="week" 
          v-for="(week, ind) in month.weeks" 
        >
          <div 
            class="day day_hover"  
            v-for="day in 7"
            :class="{[`week-day-${day}`]: true}"
          >
            <span 
              v-if="week[day]" 
              v-html="week[day].date.getDate()"
              @click="createEvent($event, month)"
            >
            </span>
          </div>
        </div>  
      </div>
    </div>
  
    <modal 
      v-if="showModal" 
      @close="showModal = false" 
      :chDate='getDate' 
      :chMonth='getMonth' 
      :hTitle='holiTitle' 
      :theEvent='theEvent'
    ></modal>
  </div>
</template>

<script>
import Modal from './Modal'
import moment from 'moment'

require('moment/locale/ru.js');

export default {
  name: 'Calendar',
  props: ['year'],
  data() {
    return {
      msg: 'hello',
      data: [],
      getDate: '',
      getMonth: '',
      holidayClass: false,
      showMonth: 'январь',
      showModal: false,
      holiTitle: '',
      theEvent: [],
      allNotes: []
    }
  },
  components: {
    'modal': Modal
  },
  methods: {
    createEvent(e, mouse) {
      this.getDate = e.target.innerHTML 
      this.getMonth = mouse.title 
      let date = this.getDate + '.' + this.getMonth
      var holidays = this.$store.state.loadedProductionCalendar
      var events = this.$store.state.allEvents

      for (var i = 0; i < events.length; i++) {
        if (date === events[i].dayEvent) {
          this.theEvent = events[i]
        }
      }

      for (var key in holidays) {
        if (date == holidays[key].name) {
          this.holiTitle = holidays[key].title
        }
      }
      this.showModal = true
    },
    slideLeft() {
      this.$store.dispatch("commitPrevMonth")
    },
    slideRight() {
      this.$store.dispatch("commitNextMonth")
    },
  },
  computed: {
    week() {
      return this.$store.state.week
    },
    months() {
      return this.$store.state.month
    }
  }
}
</script>

<style scoped>
  .calendar {
    width: 400px;
    margin: 0 auto;
  }
  .month {
    min-height: 200px;
    margin: 0 50px;
  }
</style> 