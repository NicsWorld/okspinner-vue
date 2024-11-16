<script setup>
import HelloWorld from './components/HelloWorld.vue'
import SideControls from './components/SideControls.vue';

</script>
<!-- border-width: 3px 4px 3px 5px;
border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
transform: rotate(2deg); -->
<template>
  <div class="container">
    <SideControls />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
