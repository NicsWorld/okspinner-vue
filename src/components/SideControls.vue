<!-- <!-- <script setup>

</script> -->

<!-- <template>
    <div class="controls">
        <div class="inner-box">
            inner box
        </div>
        hi side controls
    </div>
</template>

<style scoped>
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        height: 100%;
        width: 250px;
        border: solid black;
        border-color: black;
        background-color: #d3d3d3;
        border-color: black;
        border-width: 3px 4px 3px 5px;
        background-color: var(--main-red);
        border-color: black;
        border-width: 3px 4px 3px 5px;
        position: absolute;
        left: 0;
        border-top-right-radius: 4% 95%;
        border-top-right-radius: 4% 95%;
        border-bottom-right-radius: 92% 6%;
    }
</style> -->

<!-- <template>
    <div class="controls">
      <input 
        type="text" 
        v-model="newValue" 
        placeholder="Add a value"
        @keyup.enter="emitAddValue"
        onchange="emitAddValue"
      />
      <button @click="emitAddValue">Add Value</button>
      <ul>
        <li v-for="(value, index) in values" :key="index">{{ value }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      circleValues: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        newValue: '',
      };
    },
    methods: {
      emitAddValue() {
        if (this.newValue.trim()) {
          this.$emit('add-value', this.newValue);
          this.newValue = '';
        }
      },
    },
  };
  </script>
  
  <style>
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        height: 100%;
        width: 250px;
        border: solid black;
        border-color: black;
        background-color: #d3d3d3;
        border-color: black;
        border-width: 3px 4px 3px 5px;
        background-color: var(--main-red);
        border-color: black;
        border-width: 3px 4px 3px 5px;
        position: absolute;
        left: 0;
        border-top-right-radius: 4% 95%;
        border-top-right-radius: 4% 95%;
        border-bottom-right-radius: 92% 6%;
    }
  </style>
   -->
<script>
export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    updateNames() {
      const names = this.text.split('\n').map(name => name.trim()).filter(name => name);
      this.$emit('update-names', names);
    },
  },
};
</script>
   <template>
    <div class="controls">
      <!-- <input 
        type="text" 
        v-model="newName" 
        placeholder="Add a name"
        @keyup.enter="emitAddName"
        @keydown="emitAddName"
      />
      <button @click="emitAddName">Add Name</button>
      <ul>
        <li v-for="(name, index) in names" :key="index">{{ name }}</li>
      </ul> -->
      <div class="text-area">
    <textarea 
      v-model="text" 
      @input="updateNames" 
      placeholder="Enter names, one per line"
    ></textarea>
  </div>
    </div>
  </template>
  
  <!-- <script>
  export default {
    props: {
      names: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        newName: '',
      };
    },
    methods: {
      emitAddName() {
        if (this.newName.trim()) {
          this.$emit('add-name', this.newName);
          this.newName = '';
        }
      },
    },
  };
  </script> -->
  
  <style>
.controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        height: 100%;
        width: 250px;
        border: solid black;
        border-color: black;
        background-color: #d3d3d3;
        border-color: black;
        border-width: 3px 4px 3px 5px;
        background-color: var(--main-red);
        border-color: black;
        border-width: 3px 4px 3px 5px;
        position: absolute;
        left: 0;
        border-top-right-radius: 4% 95%;
        border-top-right-radius: 4% 95%;
        border-bottom-right-radius: 92% 6%;
    }
    .text-area {
  margin-bottom: 20px;
}
textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 14px;
}
  </style>
  