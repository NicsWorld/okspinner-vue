<script>
import SideControls from "./components/SideControls.vue";
import WinnerModal from "./components/WinnerModal.vue";

export default {
  components: {
    SideControls,
    WinnerModal,
  },
  data() {
    return {
      names: [],
      size: 600,
      colors: ["#1F51FF", "#39ff14", "#ff073a", "#FFEA00"],
      spin: 0,
      spinning: false,
      selectedName: null,
    };
  },
  computed: {
    angles() {
      const total = this.names.length || 1;
      const anglePerSection = 360 / total;

      let colorsToAssign = [...this.colors];
      const assignedColors = [];

      for (let i = 0; i < total; i++) {
        const color = colorsToAssign[i % colorsToAssign.length];
        assignedColors.push(color);
      }

      // Check if the first and last colors are the same, and swap if necessary
      if (assignedColors[0] === assignedColors[assignedColors.length - 1]) {
        let newColor = this.colors.find((c) => c !== assignedColors[0]);
        assignedColors[assignedColors.length - 1] = newColor;
      }

      return this.names.map((_, index) => {
        return {
          start: index * anglePerSection,
          end: (index + 1) * anglePerSection,
          color: assignedColors[index],
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
    },

    closeModal() {
      this.selectedName = null;
    },

    removeWinner() {
      this.names = this.names.filter((name) => name !== this.selectedName);
      this.updateNames(this.names);
      this.selectedName = null;
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

      // bad - need to find a better spin sound
      // const sound = new Audio(spinSound);
      // sound.play();

      // Random spin between 720° and 1080° (2-3 full rotations) + random offset
      const randomSpins = 720 + Math.random() * 360;
      this.spin += randomSpins;

      setTimeout(() => {
        this.spinning = false;

        const finalAngle = ((this.spin % 360) + 360) % 360;
        const pointerAngle = (360 - finalAngle + 270) % 360;
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

        if (selectedIndex === -1) {
          selectedIndex = 0;
        }

        this.selectedName = this.names[selectedIndex];
      }, 2000);
    },
  },
};
</script>

<template>
  <div class="spinner-app">
    <SideControls @update-names="updateNames" :names="names" />
    <WinnerModal
      v-if="selectedName"
      :winner="selectedName"
      @close-modal="closeModal"
      @remove-winner="removeWinner"
    />

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
        <polygon points="295,10 305,10 300,30" fill="black" class="pointer" />
      </svg>
    </div>
    <button @click="spinWheel" class="spin-button">Spin!</button>
  </div>
</template>

<style>
.spinner-app {
  text-align: center;
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.wheel-container {
  margin: 20px auto;
  position: relative;
}

.wheel {
  border-radius: 50%;
  border: solid black;
  border-color: black;
  border-width: 2px 4px 3px 5px;
}

.wheel-group {
  transition: transform 2s cubic-bezier(0.25, 1, 0.5, 1);
}

.pointer {
  fill: #000;
  stroke: #fff;
  stroke-width: 2px;
}

.spin-button {
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 24px;
  cursor: pointer;
  background-color: var(--main-green);
  color: black;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  border: solid black;
  border-color: black;
  border-width: 3px 4px 3px 5px;
  border-top-right-radius: 4% 95%;
  border-top-right-radius: 4% 95%;
  border-bottom-right-radius: 92% 6%;
}

.spin-button:hover {
  opacity: 0.9;
}

.result-ticket {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #008cba;
}
</style>
