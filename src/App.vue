<script>
import SideControls from "./components/SideControls.vue";

export default {
  components: {
    SideControls,
  },
  data() {
    return {
      names: [],
      size: 600,
      colors: [
        "rgb(255, 255, 224)",
        "rgb(255, 153, 153)",
        "rgb(173, 216, 230)",
        "rgb(152, 251, 152)",
        "rgb(255, 229, 180)",
        "rgb(204, 204, 255)",
      ],
      spin: 0, // Current spin rotation angle
      spinning: false, // Animation state
    };
  },
  computed: {
    angles() {
      const total = this.names.length || 1;
      const anglePerSection = 360 / total;
      return this.names.map((_, index) => ({
        start: index * anglePerSection,
        end: (index + 1) * anglePerSection,
      }));
    },
    spinTransform() {
      // Rotate the wheel smoothly by applying the spin angle
      return `translate(${this.size / 2}, ${this.size / 2}) rotate(${
        this.spin
      })`;
    },
  },
  methods: {
    updateNames(newNames) {
      this.names = newNames;
    },
    generatePath(startAngle, endAngle) {
      const radius = this.size / 2;
      const x1 = Math.cos((Math.PI / 180) * startAngle) * radius;
      const y1 = Math.sin((Math.PI / 180) * startAngle) * radius;
      const x2 = Math.cos((Math.PI / 180) * endAngle) * radius;
      const y2 = Math.sin((Math.PI / 180) * endAngle) * radius;
      return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${
        endAngle - startAngle > 180 ? 1 : 0
      } 1 ${x2} ${y2} Z`;
    },
    calculateTextPosition(startAngle, endAngle) {
      const midAngle = (startAngle + endAngle) / 2;
      const radius = this.size / 4;
      const x = Math.cos((Math.PI / 180) * midAngle) * radius;
      const y = Math.sin((Math.PI / 180) * midAngle) * radius;
      return { x, y };
    },
    spinWheel() {
      if (this.spinning) return; // Prevent double clicks
      this.spinning = true;

      // Generate random spin angle (720° to 1080°) for smooth spinning
      const randomSpins = 720 + Math.random() * 360;
      this.spin += randomSpins;

      // Wait for the transition to complete before resetting state
      setTimeout(() => {
        this.spinning = false;
        // hmmmm
        // this.spin %= 360;
      }, 2000); // Match transition duration
    },
  },
};
</script>

<template>
  <div class="spinner-app">
    <SideControls @update-names="updateNames" />
    <div class="wheel-container">
      <svg
        :viewBox="`0 0 ${size} ${size}`"
        :width="size"
        :height="size"
        class="wheel"
      >
        <g :transform="spinTransform" class="wheel-group">
          <path
            v-for="(angle, index) in angles"
            :key="index"
            :d="generatePath(angle.start, angle.end)"
            :fill="colors[index % colors.length]"
          />
          <text
            v-for="(name, index) in names"
            :key="index"
            :x="calculateTextPosition(angles[index].start, angles[index].end).x"
            :y="calculateTextPosition(angles[index].start, angles[index].end).y"
            text-anchor="middle"
            alignment-baseline="middle"
            font-size="16"
          >
            {{ name }}
          </text>
        </g>
      </svg>
    </div>
    <button @click="spinWheel" class="spin-button">Spin!</button>
  </div>
</template>

<style>
.spinner-app {
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 2rem;
}

.wheel-container {
  margin: 20px auto;
}

.wheel {
  border: 2px solid #000;
  border-radius: 50%;
}

.wheel-group {
  transition: transform 2s cubic-bezier(0.25, 1, 0.5, 1);
}

.spin-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.spin-button:hover {
  background-color: #005f75;
}
</style>
