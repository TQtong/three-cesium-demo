<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 09:54:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-25 15:31:52
 * @FilePath: \three-cesium-demo\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <CesiumLoading/> -->
  <!-- <CesiumUseThreeStart/> -->
  <CesiumClip/>
  <!-- <CesiumUseThreeLoadBaseGraph/> -->
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import { onMounted } from 'vue'
import { webSocketInit } from '@/utils/ueMap'
import CesiumLoading from './views/CesiumLoading/CesiumLoading'
import CesiumUseThreeStart from './views/CesiumUseThreeStart/CesiumUseThreeStart'
import CesiumUseThreeLoadBaseGraph from './views/CesiumUseThreeLoadBaseGraph/CesiumUseThreeLoadBaseGraph'
import CesiumClip from './views/CesiumClip/CesiumClip'

onMounted(() => {
  webSocketInit()
})

@Options({
  components: {
    // CesiumLoading,
    // CesiumUseThreeStart,
    CesiumClip
    // CesiumUseThreeLoadBaseGraph
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
