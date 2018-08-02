<template>
  <div class="calendar">
    <div class="week-wrapper">
      <div class="week">
        <div class="day" v-for="(weekDay, keyweek) in week" :key="keyweek">
          <span v-text="weekDay"></span>
        </div>
      </div>
      
      <div class="month_hidden">
        <div class="month" v-for="month,keymonth in months" :key="keymonth">
          <div class="week week_block" v-for="week in month.weeks" >
            <div class="day day_hover"  
                 v-for="day in 7"
                 :class="{[`week-day-${day}`]: true}">
              <span v-if="week[day]" 
                v-html="week[day].date.getDate()"
                @click="createEvent($event, month)"></span>
            </div>
          </div>  
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import moment from 'moment'

require('moment/locale/ru.js');

export default {
  name: 'Calendar',
  props: ['year'],
  data() {
    return {
      getDate: '',
      getMonth: '',
      holidayClass: false,
    }
  },
  methods: {
    createEvent(e, mouse) {
      this.getDate = e.target.innerHTML 
      this.getMonth = mouse.title 
      let date = this.getDate + '.' + this.getMonth
      var holidays = this.$store.state.loadedProductionCalendar
      for (var key in holidays) {
        if (date == holidays[key].name) {
          console.log(holidays[key].title)
        }
      }
    }
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
  .day {
    margin: 30px 0.25em;
  }
  .week {
    /*overflow: hidden;*/
    width: 300px;
    margin: 0 auto;
    /*height: 70px;*/
  }
  .week-wrapper {
    margin-bottom: 100px;
  }
  .month_hidden {
    max-width: 400px;
    margin: 0 auto;
    /*padding: 20px 40px;*/
    height: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>