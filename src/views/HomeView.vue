<template>
  <div class="home">
    <h1>Pixel Art</h1>
    <BoardComponent/>
  </div>
</template>

<script>
import BoardComponent from '@/components/BoardComponent.vue'

export default {
  name: 'HomeView',
  components: {
    BoardComponent
  }
}
</script>
