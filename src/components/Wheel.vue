<!-- <template>
    <div class="wheel">
    
    </div>
</template>

<style scoped>
.wheel {
    height: 500px;
    width: 500px;
    border: 1px solid black;
    position: absolute;
    top: 15%;
    border-radius: 82%;
}
</style> -->
<script>
  export default {
    data() {
      return {
        names: [],
        newName: '',
        size: 600,
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
      addName() {
        if (this.newName.trim()) {
          this.names.push(this.newName.trim());
          this.newName = '';
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
      <input 
        type="text" 
        v-model="newName" 
        placeholder="Add a name"
        @keyup.enter="addName"
      />
      <button @click="addName">Add Name</button>
      <div class="wheel-container">
        <svg 
          viewBox="0 0 600 600" 
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
      <ul>
        <li v-for="(name, index) in names" :key="index">{{ name }}</li>
      </ul>
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
  </style>
  