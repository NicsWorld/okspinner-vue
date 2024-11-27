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
      colors: ["#7CFC00", "#FF0000", "#0000FF"],
      // colors: ["#7CFC00", "#FF0000", "#0000FF", "#FFFF00", "#5D3FD3"],
      spin: 0, // Current spin rotation angle
      spinning: false, // Animation state
      selectedName: null, // Selected name after spin
    };
  },
  computed: {
    angles() {
      const total = this.names.length || 1;
      const anglePerSection = 360 / total;

      return this.names.map((_, index) => {
        const color = this.colors[index % this.colors.length];
        return {
          start: index * anglePerSection,
          end: (index + 1) * anglePerSection,
          color,
        };
      });
    },
    spinTransform() {
      return `translate(${this.size / 2}, ${this.size / 2}) rotate(${
        this.spin
      })`;
    },
  },
  methods: {
    updateNames(newNames) {
      this.names = newNames;
      if (newNames.length === this.colors.length + 1) {
        this.colors = this.colors.reverse();
      }
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
      if (this.spinning) return;
      this.spinning = true;
      this.selectedName = null;

      // Random spin between 720° and 1080° (2-3 full rotations) + random offset
      const randomSpins = 720 + Math.random() * 360;
      this.spin += randomSpins;

      setTimeout(() => {
        this.spinning = false;

        // Calculate the final angle of the wheel
        const finalAngle = ((this.spin % 360) + 360) % 360; // Normalize to 0-360

        // Adjust for the pointer at the 6 o'clock position
        const pointerAngle = (360 - finalAngle + 270) % 360; // Align pointer to 6 o'clock

        // Determine which section the pointer lands on
        const sectionAngle = 360 / this.names.length;
        let selectedIndex = -1;

        for (let i = 0; i < this.names.length; i++) {
          const start = i * sectionAngle;
          const end = (i + 1) * sectionAngle;
          if (pointerAngle >= start && pointerAngle < end) {
            selectedIndex = i;
            break;
          }
        }

        // Fallback if something goes wrong
        if (selectedIndex === -1) {
          selectedIndex = 0;
        }

        // Set the selected name
        this.selectedName = this.names[selectedIndex];
      }, 2000); // Match the spin animation duration
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
            :fill="angle.color"
          />
          <text
            v-for="(name, index) in names"
            :key="index"
            :x="calculateTextPosition(angles[index].start, angles[index].end).x"
            :y="calculateTextPosition(angles[index].start, angles[index].end).y"
            text-anchor="middle"
            alignment-baseline="middle"
            font-size="20"
          >
            {{ name }}
          </text>
        </g>
        <!-- Pointer repositioned to the 6 o'clock position -->
        <polygon
          points="295,590 305,590 300,570"
          fill="black"
          class="pointer"
        />
      </svg>
    </div>
    <div class="result-ticket" v-if="selectedName">
      Winner: {{ selectedName }}
    </div>
    <button @click="spinWheel" class="spin-button">Spin!</button>
  </div>
</template>

<style>
.spinner-app {
  text-align: center;
  font-family: Arial, sans-serif;
}

.wheel-container {
  margin: 20px auto;
  position: relative;
}

.wheel {
  border: 2px solid #000;
  border-radius: 50%;
}

.wheel-group {
  transition: transform 2s cubic-bezier(0.25, 1, 0.5, 1);
}

.pointer {
  fill: #000; /* Black color for contrast */
  stroke: #fff; /* White border for visibility */
  stroke-width: 2px;
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

.result-ticket {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #008cba;
}
</style>
