<template>
  <div id="app">
    <div class="menu">
      <button v-on:click="showForm">
        <img class="icon" src="./assets/add.svg" alt="add" />
      </button>

      <button v-on:click="removePost">
        <img class="icon" src="./assets/delete.svg" alt="delete" />
      </button>
    </div>

    <CardForm
      v-if="showCardForm"
      @submitForm="submitForm"
      @hideForm="hideForm"
    />

    <Stack v-else :cards="cards" @swipeCard="swipeCard" />
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
      showCardForm: false
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
      this.showCardForm = true;
    },

    hideForm() {
      this.showCardForm = false;
    },

    async submitForm(data) {
      await api.createCard(data);
      this.hideForm();
      this.refreshPosts();
    },

    async removePost() {
      await api.deleteCard(this.cards[0].id);
      this.refreshPosts();
    },

    async refreshPosts() {
      let response = await api.getCards();
      if (response) {
        this.cards = response.cards;
      }
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

.menu {
  position: relative;
  width: 100%;
  text-align: right;
}

.menu button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
  position: relative;
  margin: 10px;
  vertical-align: middle;
}

.icon {
  height: 30px;
}
</style>
