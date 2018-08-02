<template>
  <div id="app">
    <my-container />
  </div>
</template>

<script>
import Container from './components/Container.vue'
import moment from 'moment'

require('moment/locale/ru.js');

export default {
  name: 'app',
  data() {
    return { 
      // year: (new Date()).getFullYear(),
    }
  },
  components: {
    'my-container': Container,
  },
  created: function() {
    var yearValue = (new Date()).getFullYear()
    this.$store.dispatch("commitYear", yearValue)

      var monthsArrey = [];
      for (let m = 0; m < 12; m++) {
        let day = moment({
          year: yearValue, 
          month: m, 
          day: 1
        });
        let daysInMonth = day.daysInMonth();
        let month = {
          title: day.format("MMMM"),
          weeks: {},
        }

        for (let d = 0; d < daysInMonth; d++) {
          let week = day.week();
          if (m === 11 && week === 1) {
            week = 53
          }
          if (!month.weeks.hasOwnProperty(week)) {
            month.weeks[week] = {}
          }
          month.weeks[week][day.weekday() + 1] = {date: day.toDate()};
          day.add(1, 'd');
        }
        monthsArrey.push(month);
      }
    this.$store.dispatch("commitMonth", monthsArrey)

      var week = [];
      for (let i = 1; i <= 7; i++) {
        week.push(moment().isoWeekday(i).format("dd"))
      }
    this.$store.dispatch("commitWeek", week)
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  margin-top: 30px;
}
</style>
