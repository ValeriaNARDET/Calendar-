<template>
  <div class="calendar">
    <div class="year">
      <div 
        class="month" 
        v-for="month,m in months"
        :key="m" 
      >
        <div class="title" v-html="month.title"></div>
        <div class="week">
          <div 
            class="day" 
            v-for="(weekDay, wd) in week" 
            :key="wd"
          >
            <span v-text="weekDay"></span>
          </div>
        </div>
        <div 
          class="week" 
          v-for="(week, ind) in month.weeks" 
          key="ind" 
        >
          <div 
            class="day day_hover"  
            v-for="day in 7"
            :key="day"
            :class="{[`week-day-${day}`]: true}"
          >
            <span 
              v-if="week[day]" 
              v-html="week[day].date.getDate()"
              @click="createEvent($event, month)"
            ></span>
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
      :eTitle='eventTitle'
    ></modal>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: ['year'],
  data() {
    return {
      getDate: '',
      getMonth: '',
      hTitle: '',
      eTitle: '',
      holidayClass: false,
    }
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
          this.eventTitle = events[i].nameEvent
          console.log(this.eventTitle)
        }
      }

      for (var key in holidays) {
        if (date == holidays[key].name) {
          this.holiTitle = holidays[key].title
        }
      }
      this.showModal = true
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
  .month {
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
  }
</style>