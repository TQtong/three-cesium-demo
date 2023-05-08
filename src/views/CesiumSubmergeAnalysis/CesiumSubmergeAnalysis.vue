<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 10:20:01
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-05 13:39:18
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThree\CesiumUseThree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="container">
    <div id="cesiumContainer" ref="cesiumContainer"></div>
    <div class="flood-tools">
    <el-button type="primary" @click="start">开始淹没分析</el-button>
    <el-button type="primary" @click="stop" >结束淹没分析</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { init } from './index'
import { ScreenSpaceEventHandler, Viewer, ScreenSpaceEventType, Cartesian3, Color, ArcGisMapServerImageryProvider, createWorldTerrain, CallbackProperty, Primitive, Cartesian2, Material, EllipsoidSurfaceAppearance, PolygonGeometry, PolygonHierarchy, GeometryInstance, Ray } from 'cesium'

let viewer:Viewer

const cesiumContainer = ref<HTMLDivElement>()

const getClickPos = () => {
  const handler = new ScreenSpaceEventHandler(
    viewer.canvas
  )
  handler.setInputAction((event:any) => {
    const cartesian = returnCartesian(viewer, event.position)
    console.log(cartesian)
  }, ScreenSpaceEventType.LEFT_CLICK)
}
const positions = () => {
  const p0 = new Cartesian3(
    62194.45373265314,
    5669267.88190016,
    2918648.9515907196
  )
  const p1 = new Cartesian3(
    56303.87004217449,
    5673698.381300747,
    2910246.3633272164
  )
  const p2 = new Cartesian3(
    47580.70560061326,
    5671620.854723226,
    2914442.961863161
  )
  const p3 = new Cartesian3(
    53458.6273335863,
    5666830.965259356,
    2922892.454129204
  )
  return [p0, p1, p2, p3]
}

const returnCartesian = (viewer:Viewer, position:Cartesian2) => {
  let cartesian = viewer.scene.pick(position)
  if (!cartesian) {
    const ray = viewer.camera.getPickRay(position)
    cartesian = viewer.scene.globe.pick(ray, viewer.scene)
  }
  return cartesian
}
const stop = () => {
  viewer.entities.removeAll()
}

const start = () => {
  let waterHeight = 2200
  viewer.entities.add({
    polygon: {
      hierarchy: positions(),
      material: Color.LIGHTBLUE.withAlpha(0.5),
      extrudedHeight: new CallbackProperty(function () {
        return waterHeight
      }, false)
    }
  })
  viewer.clock.onTick.addEventListener(function () {
    if (waterHeight > 2500) {
      waterHeight = 2200
    }
    waterHeight += 0.3
  })
}

const initRiver = (points:Array<Cartesian3>) => {
  const waterPrimitive = new Primitive({
    allowPicking: false,
    asynchronous: false,
    geometryInstances: new GeometryInstance({
      id: 'initRiver',
      geometry: new PolygonGeometry({
        polygonHierarchy: new PolygonHierarchy(points),
        vertexFormat: EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        extrudedHeight: 2200,
        height: 0
      })
    }),
    appearance: new EllipsoidSurfaceAppearance({
      material: new Material({
        fabric: {
          type: 'Water',
          uniforms: {
            blendColor: new Color(0, 0, 1, 0.3),
            normalMap: require('@/assets/logo.png'),
            // 频率速度设置
            frequency: 200,
            animationSpeed: 0.01,
            amplitude: 10
          }
        }
      })
    })
  })
  viewer.scene.primitives.add(waterPrimitive)
}

onMounted(() => {
  viewer = new Viewer('cesiumContainer', {
    imageryProvider: new ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    }),
    terrainProvider: createWorldTerrain(),
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
    destination: new Cartesian3(
      52066.05151397444,
      5684548.956018807,
      2920846.197147853
    )
  })
  initRiver(positions())
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

  .flood-tools {
        position: absolute;
  }
}
</style>
