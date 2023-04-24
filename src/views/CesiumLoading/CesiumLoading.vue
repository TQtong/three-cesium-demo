<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 09:54:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-24 10:16:40
 * @FilePath: \three-cesium-demo\src\views\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="cesiumContainer"></div>
</template>

<script lang='ts' setup>
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

onMounted(() => {
  init()
})

const init = () => {
  const viewer = new Cesium.Viewer('cesiumContainer')

  viewer.scene.postProcessStages.fxaa.enabled = true

  // 将三维球定位到中国
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 10000000),
    orientation: {
      heading: Cesium.Math.toRadians(348.42),
      pitch: Cesium.Math.toRadians(-89.74),
      roll: Cesium.Math.toRadians(0)
    }
  })
}
</script>

<style lang="less" scoped>
#cesiumContainer {
  height: 100%;
  width: 100%;
}
</style>
