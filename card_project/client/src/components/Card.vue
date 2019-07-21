<template>
  <div
    ref="card"
    :style="{
      transform: transformCardPosition,
      backgroundColor: randomHex,
      zIndex: index
    }"
    class="card"
    v-touch:moved="mouseStart"
    v-touch:moving="mouseMoving"
    v-touch:end="mouseEnd"
  >
    <div class="photo-container">
      <img
        class="photo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1920px-Heart_coraz%C3%B3n.svg.png"
        alt="card image"
      />
    </div>

    <div class="text-container">
      <p>
        <b>Description:</b>
        {{ description }}
      </p>
      <p>
        <b>Factoid:</b>
        {{ factoid }}
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vue2TouchEvents from "vue2-touch-events";

Vue.use(Vue2TouchEvents);

export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    factoid: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      cardPosition: { x: 0, y: 0 },
      isMoving: false,
      startPosition: null,
      width: null
    };
  },

  computed: {
    transformCardPosition() {
      const { x, y } = this.cardPosition;
      let rotation = (x * 10) / this.width;
      return `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    },

    randomHex() {
      var x = Math.floor(Math.random() * 256);
      var y = Math.floor(Math.random() * 256);
      var z = Math.floor(Math.random() * 256);
      return "rgb(" + x + "," + y + "," + z + ")";
    }
  },

  mounted() {
    this.width = this.$refs.card.clientWidth;
  },

  methods: {
    mouseStart: function(event) {
      this.isMoving = true;
      this.startPosition = this.getMousePosition(event);
    },

    mouseEnd: function() {
      this.isMoving = false;

      if (Math.abs(this.cardPosition.x) > this.width / 2) {
        this.swipeCard();
      } else {
        this.cardPosition.x = 0;
      }
    },

    mouseMoving: function(event) {
      if (this.isMoving) {
        this.cardPosition.x =
          this.getMousePosition(event).x - this.startPosition.x;
      }
    },

    getMousePosition: function(event) {
      return {
        x: event.x || event.touches[0].clientX,
        y: event.y || event.touches[0].clientY
      };
    },

    swipeCard() {
      setTimeout(() => {
        this.$emit("swipeCard", this.card);
        this.cardPosition.x = 0;
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 30px;
  cursor: pointer;
}

.photo-container {
  position: relative;
  overflow: hidden;
  pointer-events: none;
  height: 40%;
  width: 80%;
  padding: 0 10%;
  margin: 10% 0;
}
.photo {
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.text-container {
  position: relative;
  overflow: hidden;
  pointer-events: none;
  height: 40%;
  width: 80%;
  margin: 0;
  padding: 0 10%;
}
</style>
