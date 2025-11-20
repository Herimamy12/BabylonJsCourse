<template>
  <div class="hello">
    <h3>Babylon first course with small code</h3>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { BasicScene } from '../BabylonCourse/BasicScene'
import { StandardMaterials } from '../BabylonCourse/StandardMaterials'

export default defineComponent({
  name: 'BabylonCourse',
  mounted() {
    const canvas = document.querySelector("canvas")!
    // new BasicScene(canvas)
    new StandardMaterials(canvas)
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  canvas {
    width: 70%;
    height: 70%;
  }
</style>
