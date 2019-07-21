<template>
  <div class="cards">
    <div :style="{ backgroundColor: randomHex }" class="card">
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
          <textarea
            v-model="description"
            rows="4"
            placeholder="Enter description"
            required
          >
          </textarea>
        </p>
        <p>
          <b>Factoid:</b>
          <textarea
            v-model="factoid"
            rows="4"
            placeholder="Enter description"
            required
          >
          </textarea>
        </p>

        <button type="button" v-on:click="hideForm">Cancel</button>
        <button type="button" v-on:click="submitForm">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: null,
      factoid: null
    };
  },

  computed: {
    randomHex() {
      var x = Math.floor(Math.random() * 256);
      var y = Math.floor(Math.random() * 256);
      var z = Math.floor(Math.random() * 256);
      return "rgb(" + x + "," + y + "," + z + ")";
    }
  },

  methods: {
    hideForm() {
      this.$emit("hideForm");
    },

    submitForm() {
      this.$emit("submitForm", {
        description: this.description,
        factoid: this.factoid
      });
    }
  }
};
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  resize: none;
  background: none;
}

.cards {
  position: relative;
  height: 100%;
}

.card {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 30px;
}

.photo-container {
  position: relative;
  overflow: hidden;
  height: 40%;
  width: 80%;
  padding: 0 10%;
  margin: calc(5% + 50px) 0 5% 0;
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
  height: calc(50% - 50px);
  width: 80%;
  margin: 0;
  padding: 0 10%;
}

.text-container button {
  margin-right: 10px;
  cursor: pointer;
}
</style>
