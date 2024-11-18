<!-- <script>
import SideControls from './components/SideControls.vue';

export default {
  components: {
    SideControls,
  },
  data() {
    return {
      names: [],
      size: 200, // Circle size
      colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'], // Section colors
    };
  },
  computed: {
    angles() {
      const total = this.names.length;
      const anglePerSection = 360 / total;
      return this.names.map((_, index) => {
        return {
          start: index * anglePerSection,
          end: (index + 1) * anglePerSection,
        };
      });
    },
  },
  methods: {
    addName(name) {
      if (name.trim()) {
        this.names.push(name.trim());
      }
    },
    generatePath(startAngle, endAngle) {
      const x1 = Math.cos((Math.PI / 180) * startAngle) * 100;
      const y1 = Math.sin((Math.PI / 180) * startAngle) * 100;
      const x2 = Math.cos((Math.PI / 180) * endAngle) * 100;
      const y2 = Math.sin((Math.PI / 180) * endAngle) * 100;
      return `M 0 0 L ${x1} ${y1} A 100 100 0 ${
        endAngle - startAngle > 180 ? 1 : 0
      } 1 ${x2} ${y2} Z`;
    },
  },
};
</script>

<template>
  <div class="spinner-app">
    <SideControls 
      :names="names" 
      @add-name="addName"
    />
    <div class="wheel-container">
      <svg 
        viewBox="0 0 200 200" 
        :width="size" 
        :height="size"
        class="wheel"
      >
        <g transform="translate(100, 100)">
          <path 
            v-for="(angle, index) in angles" 
            :key="index"
            :d="generatePath(angle.start, angle.end)"
            :fill="colors[index % colors.length]"
          />
        </g>
      </svg>
    </div>
  </div>
</template>



<style>
.spinner-app {
  text-align: center;
  font-family: Arial, sans-serif;
}

.wheel-container {
  margin: 20px auto;
}

.wheel {
  border: 2px solid #000;
  border-radius: 50%;
}
</style> -->
<template>
  <div class="spinner-app">
    <!-- <TextAreaComponent @update-names="updateNames" /> -->
    <SideControls @update-names="updateNames" />
    <div class="wheel-container">
      <svg 
        viewBox="0 0 200 200" 
        :width="size" 
        :height="size"
        class="wheel"
      >
        <g transform="translate(100, 100)">
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
            font-size="10"
          >
            {{ name }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import SideControls from './components/SideControls.vue';

export default {
  components: {
    SideControls,
  },
  data() {
    return {
      names: [],
      size: 200, // Circle size
      colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'], // Section colors
    };
  },
  computed: {
    angles() {
      const total = this.names.length;
      const anglePerSection = 360 / total;
      return this.names.map((_, index) => {
        return {
          start: index * anglePerSection,
          end: (index + 1) * anglePerSection,
        };
      });
    },
  },
  methods: {
    updateNames(names) {
      this.names = names;
    },
    generatePath(startAngle, endAngle) {
      const x1 = Math.cos((Math.PI / 180) * startAngle) * 100;
      const y1 = Math.sin((Math.PI / 180) * startAngle) * 100;
      const x2 = Math.cos((Math.PI / 180) * endAngle) * 100;
      const y2 = Math.sin((Math.PI / 180) * endAngle) * 100;
      return `M 0 0 L ${x1} ${y1} A 100 100 0 ${
        endAngle - startAngle > 180 ? 1 : 0
      } 1 ${x2} ${y2} Z`;
    },
    calculateTextPosition(startAngle, endAngle) {
      const midAngle = (startAngle + endAngle) / 2;
      const x = Math.cos((Math.PI / 180) * midAngle) * 50; // Move text to the center of each section
      const y = Math.sin((Math.PI / 180) * midAngle) * 50;
      return { x, y };
    },
  },
};
</script>

<style>
.spinner-app {
  text-align: center;
  font-family: Arial, sans-serif;
}

.wheel-container {
  margin: 20px auto;
}

.wheel {
  border: 2px solid #000;
  border-radius: 50%;
}
</style>
