<template>
  <div id="app">
    <div class="menu">
      <img class="icon" src="./assets/add.svg" alt="add" />
      <img class="icon" src="./assets/delete.svg" alt="delete" />
    </div>

    <Stack :cards="visibleCards" @swipeCard="swipeCard" />
  </div>
</template>

<script>
import Stack from "./components/Stack";

export default {
  name: "App",
  components: {
    Stack
  },

  data() {
    return {
      visibleCards: [
        { factoid: "Card 1" },
        { factoid: "Card 2" },
        { factoid: "Card 3" }
      ]
    };
  },

  methods: {
    swipeCard() {
      this.visibleCards.push(this.visibleCards.shift());
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

.icon {
  position: relative;
  height: 30px;
  padding: 10px;
  vertical-align: middle;
}
</style>
