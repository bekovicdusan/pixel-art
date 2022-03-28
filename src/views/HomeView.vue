<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Pixel Art</h1>
    <BoardComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import BoardComponent from '@/components/BoardComponent.vue'

export default {
  name: 'HomeView',
  components: {
    BoardComponent
  }
}
</script>
