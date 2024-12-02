<script>
import ConfettiExplosion from "vue-confetti-explosion";
import applauseSound from "../assets/applause.wav";
export default {
  components: {
    ConfettiExplosion,
  },
  props: ["winner"],
  mounted() {
    const audio = new Audio(applauseSound);
    audio.play();
  },
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
    <div class="confetti">
      <ConfettiExplosion
        :duration="5500"
        :particleCount="300"
        :force="0.5"
        class="confetti"
      />
    </div>
    <div class="modal">
      <div class="header">
        <h2>Congratulations!</h2>
        <button @click="closeModal" class="close-btn">x</button>
      </div>
      <div class="winner-wrapper">
        <p>The winner is:</p>
        <p class="winner">{{ winner }}</p>
      </div>

      <div class="button-wrapper">
        <button class="btn btn-close" @click="closeModal">Close</button>
        <button class="btn btn-remove" @click="removeWinner">Remove</button>
      </div>
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

.modal {
  background-color: white;
  padding: 5rem 10rem;
  border-radius: 5px;
  text-align: center;
  color: black;
  position: relative;
}
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--main-green);
  margin: 0;
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  left: 0;
  padding: 4px 0px;
  border: 1px transparent;
  border-radius: 5px 5px 0px 0px;
}

.winner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}
.winner {
  font-weight: 900;
  font-size: 1.5rem;
  color: var(--main-red);
}
.modal h2 {
  padding-left: 1rem;
}
.close-btn {
  background-color: transparent;
  font-size: 24px;
  padding-right: 2rem;
  color: black;
  border: none;
}
.close-btn:focus {
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: inherit;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  btn {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    color: black;
    font-size: 1rem;
  }
  .btn-close {
    background-color: var(--main-green);
    color: black;
  }
  .btn-remove {
    background-color: var(--main-red);
    color: black;
  }
}
.confetti {
  position: absolute;
  top: 25%;
}
</style>
