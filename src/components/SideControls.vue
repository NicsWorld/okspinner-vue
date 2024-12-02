<script>
export default {
  props: ["names"],

  data() {
    return {
      text: this.names.join("\n"), // Initialize text with the names passed as a prop
    };
  },

  methods: {
    updateNames() {
      const names = this.text
        .split("\n")
        .map((name) => name.trim())
        .filter((name) => name);
      this.$emit("update-names", names);
    },
    reset() {
      this.text = "";
      this.updateNames();
      this.$emit("reset");
    },
  },
};
</script>
<template>
  <div class="controls">
    <div class="text-area">
      <textarea
        v-model="text"
        @input="updateNames"
        placeholder="Enter names, one per line"
      ></textarea>
    </div>

    <button class="resetButton" @click="reset">Reset</button>
  </div>
</template>

<style>
.controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  width: 250px;
  border: solid black;
  border-color: black;
  background-color: var(--main-red);
  border-width: 3px 4px 3px 5px;
  position: absolute;
  left: 0;
  top: 6 px;
  border-top-right-radius: 4% 95%;
  border-top-right-radius: 4% 95%;
  border-bottom-right-radius: 92% 6%;
}
.text-area {
  margin-bottom: 20px;
}
.resetButton {
  border: solid black;
  border-color: black;
  border-width: 3px 4px 3px 5px;
  border-top-right-radius: 4% 95%;
  border-top-right-radius: 4% 95%;
  border-bottom-right-radius: 92% 6%;
  background-color: var(--main-green);
  color: black;
}
textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 14px;
}
</style>
