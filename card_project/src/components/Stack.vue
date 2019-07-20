<template>
  <div class="cards">
    <Card
      v-for="(card, index) in cards"
      :key="card"
      :index="cards.length - index"
      :factoid="card.factoid"
      @swipeCard="$emit('swipeCard')"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  components: {
    Card
  },

  props: {
    cards: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  height: calc(100% - 50px);
}
</style>
