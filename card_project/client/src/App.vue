<template>
  <div id="app">
    <div class="menu">
      <button>
        <img class="icon" src="./assets/add.svg" alt="add" />
      </button>

      <button v-on:click="removePost">
        <img class="icon" src="./assets/delete.svg" alt="delete" />
      </button>
    </div>

    <Stack :cards="cards" @swipeCard="swipeCard" />
  </div>
</template>

<script>
import Stack from "./components/Stack";
import api from "@/api";

export default {
  name: "App",
  components: {
    Stack
  },

  data() {
    return {
      cards: []
    };
  },

  async created() {
    this.refreshPosts();
  },

  methods: {
    swipeCard() {
      this.cards.push(this.cards.shift());
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

button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
  position: relative;
  margin: 10px;
  vertical-align: middle;
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

.icon {
  height: 30px;
}
</style>
