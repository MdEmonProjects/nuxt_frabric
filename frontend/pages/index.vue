<template>
  <div class="d-flex justify-content-between pt-4">
    <Leftside></Leftside>
    <TestCanvas></TestCanvas>
    <div class="controls" style="width: 30%">
      <button class="btn btn-warning mb-4" id="add-to-canvas">Ganarate Canvas</button>
      <button class="btn btn-danger mb-4" id="download">Download Image</button>
      <canvas id="sub_canvas" width=400 height=300></canvas>
    </div>

  </div>
</template>

<script>

import TestCanvas from "../components/TestCanvas.vue";
export default {
  name: "IndexPage",
  mounted: () => {
    
  },
  components: { TestCanvas }
}
</script>



