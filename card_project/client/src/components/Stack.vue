<template>
  <div class="cards">
    <Card
      v-for="(card, index) in cards"
      :key="card.id"
      :index="cards.length - index"
      :description="card.description"
      :factoid="card.factoid"
      @swipeCard="$emit('swipeCard')"
      @removeCard="$emit('removeCard')"
      @showForm="$emit('showForm')"
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
  height: 100%;
}
</style>
