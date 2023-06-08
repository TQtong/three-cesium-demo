<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 10:20:01
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-06-08 09:55:14
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThree\CesiumUseThree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="container">
        <el-button size="small" @click="start">开始淹没分析</el-button>
      <el-button size="small" @click="stop">结束淹没分析</el-button>
    <div id="cesiumContainer" ref="cesiumContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import * as Cesium from 'cesium'

const cesiumContainer = ref<HTMLDivElement>()

let viewer:any

const initRiver = (points:any) => {
  const waterPrimitive = new Cesium.GroundPrimitive({
    allowPicking: false,
    asynchronous: false,
    geometryInstances: new Cesium.GeometryInstance({
      id: 'initRiver',
      geometry: new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(points.value),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        extrudedHeight: 2200,
        height: 0
      })
    }),
    appearance: new Cesium.EllipsoidSurfaceAppearance({
      material: new Cesium.Material({
        fabric: {
          type: 'Water',
          uniforms: {
            blendColor: new Cesium.Color(0, 0, 1, 0.3),
            normalMap: require('./water.png'),
            // 频率速度设置
            frequency: 200,
            animationSpeed: 0.01,
            amplitude: 10
          }
        }
      }),
      aboveGround: true
    })
  })
  viewer.scene.primitives.add(waterPrimitive)
}

const start = () => {
  let waterHeight = 22
  viewer.entities.add({
    polygon: {
      hierarchy: positions.value,
      material: Cesium.Color.LIGHTBLUE.withAlpha(0.5),
      // extrudedHeight: new Cesium.CallbackProperty(function () {
      //   return waterHeight
      // }, false),
      extrudedHeight: 0.00001,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND// 设置HeightReference高度参考类型为CLAMP_TO_GROUND贴地类型
      // clampToGround: true
    }
  })
  viewer.clock.onTick.addEventListener(function () {
    if (waterHeight > 2500) {
      waterHeight = 2200
    }
    waterHeight += 0.3
  })
}

const stop = () => {
  viewer.entities.removeAll()
}

const returnCartesian = (viewer:any, position:any) => {
  let cartesian = viewer.scene.pick(position)
  if (!cartesian) {
    const ray = viewer.camera.getPickRay(position)
    cartesian = viewer.scene.globe.pick(ray, viewer.scene)
  }
  return cartesian
}

const getClickPos = () => {
  const handler = new Cesium.ScreenSpaceEventHandler(
    viewer.canvas
  )
  handler.setInputAction(function (event:any) {
    const cartesian = returnCartesian(viewer, event.position)
    console.log(cartesian)
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

onMounted(() => {
  const key =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZDhhOThhNy0zMzUzLTRiZDktYWM3Ni00NGI5MGY2N2UwZDUiLCJpZCI6MjQzMjYsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODUwMzUwNDh9.DYuDF_RPKe5_8w849_y-sutM68LM51O9o3bTt_3rF1w'
  Cesium.Ion.defaultAccessToken = key
  viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    }),
    terrainProvider: Cesium.createWorldTerrain(),
    geocoder: true,
    homeButton: true,
    sceneModePicker: true,
    baseLayerPicker: true,
    navigationHelpButton: true,
    animation: true,
    timeline: true,
    fullscreenButton: true,
    vrButton: true,
    // 关闭点选出现的提示框
    selectionIndicator: true,
    infoBox: true
  })
  viewer.camera.flyTo({
    destination: new Cesium.Cartesian3(
      52066.05151397444,
      5684548.956018807,
      2920846.197147853
    )
  })
  nextTick(() => {
    initRiver(positions)
  })
})

const positions = computed(() => {
  const p0 = new Cesium.Cartesian3(
    62194.45373265314,
    5669267.88190016,
    2918648.9515907196
  )
  const p1 = new Cesium.Cartesian3(
    56303.87004217449,
    5673698.381300747,
    2910246.3633272164
  )
  const p2 = new Cesium.Cartesian3(
    47580.70560061326,
    5671620.854723226,
    2914442.961863161
  )
  const p3 = new Cesium.Cartesian3(
    53458.6273335863,
    5666830.965259356,
    2922892.454129204
  )
  return [p0, p1, p2, p3]
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
}
</style>
