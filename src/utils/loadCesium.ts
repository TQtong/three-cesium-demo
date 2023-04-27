/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 14:25:44
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-27 09:26:10
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThreeStart\composables\loadCesium.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Viewer, ShadowMode, Cartesian3, Math as CesiumMath, Color, SceneMode, WebMapServiceImageryProvider, Rectangle, WebMercatorProjection } from 'cesium'
import { cesiumViewer, boundingBox } from '@/base/baseObj'
import { projection } from '@turf/turf'

export const loadCesium = (): void => {
  cesiumViewer.viewer = new Viewer('cesiumContainer', {
    useDefaultRenderLoop: false,
    selectionIndicator: false,
    infoBox: false,
    skyBox: false,
    navigationInstructionsInitiallyVisible: false,
    fullscreenButton: false,
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: false,
        antialias: true,
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: false,
        depth: true,
        stencil: false
      }
    },
    targetFrameRate: 60,
    sceneMode: SceneMode.SCENE3D,
    imageryProvider: undefined,
    baseLayerPicker: false,
    automaticallyTrackDataSourceClocks: false,
    dataSources: undefined,
    terrainShadows: ShadowMode.DISABLED
  })
  const center = Cartesian3.fromDegrees(
    (boundingBox.minWGS84[0] + boundingBox.maxWGS84[0]) / 2,
    (boundingBox.minWGS84[1] + boundingBox.maxWGS84[1]) / 2 - 1,
    200000
  )
  const test = Cartesian3.fromDegrees(
    119.285214219999943,
    31.64065216900002,
    200
  )

  cesiumViewer.viewer.camera.flyTo({
    destination: test,
    orientation: {
      heading: CesiumMath.toRadians(0),
      pitch: CesiumMath.toRadians(-60),
      roll: CesiumMath.toRadians(0)
    },
    duration: 3
  })
  cesiumViewer.viewer.imageryLayers.get(0).show = false
  cesiumViewer.viewer.scene.globe.showGroundAtmosphere = false
  cesiumViewer.viewer.scene.globe.showWaterEffect =
  false
  cesiumViewer.viewer.scene.globe.showSkirts =
  false
  cesiumViewer.viewer.scene.globe.skyAtmosphere = false
  cesiumViewer.viewer.scene.globe.baseColor = Color.BLACK
  // cesiumViewer.viewer.scene.globe.show = false
  loadImage()
}

const loadImage = ():void => {
  const rectangle = Rectangle.fromDegrees(119.914698174, 31.72406995, 120.181831273, 31.873365692)
}
