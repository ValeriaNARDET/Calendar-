import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

require('moment/locale/ru.js');

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		headerTitle: 'My Calendar',
		footerTitle: 'made by Lja Nardet',
		loadedProductionCalendar: [
  		{
        id: "1",
        name: "1.январь",
 			  title: "Новый год",
 			  date: "01.01"
 			},
  		{
        id: "2",
        name: "7.январь",
 			  title: "Рождество Христово",
 			  date: "07.01"
 			},
  		{
        id: "3",
        name: "8.март",
 			  title: "Международный женский день",
 			  date: "08.03"
 			},
  		{
        id: "4",
        name: "8.апрель",
 			  title: "Пасха",
 			  date: "08.04"
 			},
  		{
        id: "5",
        name: "1.май",
 			  title: "День трудящихся",
 			  date: "01.05"
 			},
  		{
        id: "6",
        name: "9.май",
 			  title: "День победы",
 			  date: "09.05"
 			},
  		{
        id: "7",
        name: "27.май",
 			  title: "Троица",
 			  date: "27.05"
 			},
  		{
        id: "8",
        name: "28.июнь",
 			  title: "День Конституции Украины",
 			  date: "28.06"
 			},
  		{
        id: "9",
        name: "24.август",
 			  title: "День независимости Украины",
 			  date: "24.08"
 			},
  		{
        id: "10",
        name: "14.октябрь",
 			  title: "День защитника Украины",
 			  date: "14.10"
 			}],
    year: null,
    month: [],
    week: [],
    allEvents: []
  },
  actions: {
    commitYear: (context, yearValue) => {
      context.commit('changeYear', yearValue)
    },
    commitMonth: (context, monthValue) => {
      context.commit('changeMonth', monthValue)
    },
    commitWeek: (context, weekValue) => {
      context.commit('changeWeek', weekValue)
    },
    commitPrevYear: (context) => {
      context.commit('changePrevYear')
    },
    commitNextYear: (context) => {
      context.commit('changeNextYear')
    },
    commitPrevMonth: (context) => {
      context.commit('changePrevMonth')
    },
    commitNextMonth: (context) => {
      context.commit('changeNextMonth')
    },
    commitNewEvent: (context, event) => {
      context.commit('pushNewEvent', event)
    },
    commitDeleteEvent: (context, eventy) => {
      context.commit('deleteTheEvent', eventy)
    }
  },
	mutations: {
    changeYear: (state, yearValue) => {
      state.year = yearValue
    },
    changeMonth: (state, monthValue) => {
      state.month = monthValue
    },
    changeWeek: (state, weekValue) => {
      state.week = weekValue
    },
    changePrevYear: (state) => {
      --state.year
    },
    changeNextYear: (state) => {
      ++state.year
    },
    changePrevMonth: (state) => {
      const last = state.month.pop()
      state.month = [last].concat(state.month)
    },
    changeNextMonth: (state) => {
      const first = state.month.shift()
      state.month = state.month.concat(first)
    },
    pushNewEvent: (state, event) => {
      state.allEvents.push(event)
    },
    deleteTheEvent: (state, eventy) => {
      let ev = state.allEvents
      for (var i = 0; i < ev.length; i++) {
        if (ev[i] === eventy) {
          state.allEvents[i].slice(i, (++i))
          console.log(state.allEvents[i])
        }
      }
    }
  }
})