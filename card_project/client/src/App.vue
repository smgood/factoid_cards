<template>
  <div id="app">
    <CardForm
      v-if="showCardForm"
      @submitForm="submitForm"
      @hideForm="hideForm"
    />

    <Stack v-else
      :cards="cards"
      @swipeCard="swipeCard"
      @removeCard="removeCard"
      @showForm="showForm"
    />
  </div>
</template>

<script>
import Stack from "./components/Stack";
import CardForm from "./components/CardForm";

import api from "@/api";

export default {
  name: "App",
  components: {
    Stack,
    CardForm
  },

  data() {
    return {
      cards: [],
      toggleCardForm: false
    };
  },

  async created() {
    this.refreshPosts();
  },

  methods: {
    swipeCard() {
      this.cards.push(this.cards.shift());
    },

    showForm() {
      this.toggleCardForm = true;
    },

    hideForm() {
      this.toggleCardForm = false;
    },

    async submitForm(data) {
      await api.createCard(data);
      this.hideForm();
      this.refreshPosts();
    },

    async removeCard() {
      await api.deleteCard(this.cards[0].id);
      this.refreshPosts();
    },

    async refreshPosts() {
      let response = await api.getCards();
      if (response) {
        this.cards = response.cards;
      }
    }
  },

  computed: {
    showCardForm(){
      return this.toggleCardForm || !this.cards.length;
    }
  }
};
</script>

<style>
body {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: white;
  height: 100%;
  width: 100%;
  max-width: 50vh;
}
</style>
