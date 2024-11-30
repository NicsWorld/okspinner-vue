<script>
export default {
  props: ["winner"], // Receive the winner prop
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    removeWinner() {
      this.$emit("remove-winner");
    },
  },
};
</script>

<template>
  <div class="winner-modal">
    <div class="modal">
      <h2>Congratulations!</h2>
      <p>The winner is:</p>
      <p class="winner">{{ winner }}</p>
      <button @click="closeModal">Close</button>
      <button @click="removeWinner">Remove</button>
    </div>
  </div>
</template>

<style>
.winner-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>
