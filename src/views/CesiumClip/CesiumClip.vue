<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 10:20:01
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-05 09:53:08
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThree\CesiumUseThree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="container">
    <div id="cesiumContainer" ref="cesiumContainer"></div>
    <div id="threeContainer" ref="threeContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { renderer } from '@/base/baseObj'
import { init } from './index'

const cesiumContainer = ref<HTMLDivElement>()
const threeContainer = ref<HTMLDivElement>()

onMounted(() => {
  threeContainer.value?.appendChild(renderer.domElement)
  init()
})
</script>

<style lang='less' scoped>
#container {
  position: relative;
  width: 100%;
  height: 100%;
  #cesiumContainer {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  #threeContainer {
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0%;
    z-index: 10;
    pointer-events: none;
  }

    .map {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
