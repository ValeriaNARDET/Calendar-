<template>
  <div class="container">
    <h2 class="title_main">{{ storeTitle }}</h2>
    <div class="header">
      <!-- <button class="btn" @click="prevYear()">&lt;</button> -->
      <div class="title">{{ getYear }}</div>
      <!-- <button class="btn" @click="nextYear()">&gt;</button> -->
    </div>
    <template v-if="toggle === 'year'">
      <my-calendar-year :year='year' />
    </template>

    <template v-else-if="toggle === 'month'">
      <my-calendar :year='year' />
    </template>

    <template v-else-if="toggle === 'week'">
      <my-calendar-in-week :year='year' />
    </template>

    <button class="btn btn_main" @click="toggle='year'">year</button>
    <button class="btn btn_main" @click="toggle='month'">month</button>
    <button class="btn btn_main" @click="toggle='week'">week</button>

    <p class="title title_sm" v-text='this.$store.state.footerTitle'></p>
  </div>
</template>

<script>
import CalendarYear from './CalendarYear.vue'
import Calendar from './Calendar.vue'
import CalendarWeek from './CalendarWeek.vue'

export default {
  name: 'app',
  data() {
    return { 
      toggle: 'month',
      year: '',
    }
  },
  components: {
    'my-calendar-year': CalendarYear,
    'my-calendar': Calendar,
    'my-calendar-in-week': CalendarWeek,
  },
  methods: {    
    prevYear() {
      this.$store.dispatch("commitPrevYear")
    },
    nextYearn() {
      this.$store.dispatch("commitNextYear")
    },}
  ,
  computed: {
    storeTitle() {
      return this.$store.state.headerTitle
    },

    getYear() {
      return this.$store.state.year
    }
  }
}
</script>