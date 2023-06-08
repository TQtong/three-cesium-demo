<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 10:20:01
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-15 15:07:26
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThree\CesiumUseThree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="container">
    <div id="cesiumContainer" ref="cesiumContainer"></div>
    <div id="threeContainer" ref="threeContainer"></div>
    <div v-show="flag" class="map">
      <iframe
        id="palybox"
        :src="ueIframeUrl"
        height="100%"
        width="100%"
        name="demo"
        frameborder="0"
        scrolling="no"
        sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { renderer, cesiumViewer } from '@/base/baseObj'
import { init } from './index'
import {
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Math as CesiumMath,
  Cartesian3
} from 'cesium'

const cesiumContainer = ref<HTMLDivElement>()
const threeContainer = ref<HTMLDivElement>()
const ueIframeUrl = 'http://192.168.40.15:84'
const flag = ref<boolean>(false)

onMounted(() => {
  threeContainer.value?.appendChild(renderer.domElement)
  init()
  const handler = new ScreenSpaceEventHandler(cesiumViewer.viewer.scene.canvas)
  handler.setInputAction(function () {
    const test = Cartesian3.fromDegrees(
      121.041608,
      29.960749,
      500
    )
    console.log(cesiumViewer.viewer.camera)

    cesiumViewer.viewer.camera.flyTo({
      destination: test,
      orientation: {
        heading: CesiumMath.toRadians(140),
        pitch: CesiumMath.toRadians(80),
        roll: 0
      },
      duration: 3
    })
  }, ScreenSpaceEventType.LEFT_CLICK)
  cesiumViewer.viewer.camera.changed.addEventListener(() => {
    // 当前高度
    const height = cesiumViewer.viewer.camera.positionCartographic.height
    // 下面可以写其他的代码了

    if (height < 10000) {
      flag.value = !flag.value
    }
  })
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
