<template>
  <CesiumLoading/>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import CesiumLoading from './views/CesiumLoading/CesiumLoading'

@Options({
  components: {
    CesiumLoading
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
