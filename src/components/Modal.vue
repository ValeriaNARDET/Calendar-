<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <p class="modal-text">
            {{ chDate }} {{ chMonth }}
          </p>
          <div  class="modal-text modal-text-red" v-if="hTitle">{{ hTitle }}</div>
          <div  class="modal-text modal-text-red" v-if="theEvent">
            {{ theEvent.nameEvent }}
            <button class="btn btn_delete" v-on:click="delSomeEvent(theEvent)">delete</button>
          </div>
          <div class="input-wrapper">
            <input class="input input_modal" type="text" v-model="currentNote" @key.enter="makeNote" placeholder="add the event">
          </div>
          <button class="btn btn_modal" @click="[cleanEvent(), $emit('close')]">cansel</button>
          <button class="btn btn_modal" @click="[makeNote(), $emit('close')]">save</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: function () {
    return {
      currentNote: ''
    };
  },
  props: ['chDate', 'chMonth', 'hTitle', 'theEvent'],
  methods: {
    makeNote() {
      var eventT = {}
      eventT.nameEvent = this.currentNote;
      eventT.dayEvent = this.chDate + '.' + this.chMonth;
      this.$store.dispatch('commitNewEvent', eventT)
    },
    cleanEvent() {

    },
    delSomeEvent(eventy) {
      this.$store.dispatch('commitDeleteEvent', eventy)
      console.log(eventy)
    }
  }
}
</script>