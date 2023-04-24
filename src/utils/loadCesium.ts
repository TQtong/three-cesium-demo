/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 14:25:44
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-24 15:50:49
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThreeStart\composables\loadCesium.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {
  Viewer,
  ShadowMode,
  Cartesian3,
  Math as CesiumMath
} from 'cesium'
import { cesiumViewer, boundingBox } from '@/base/baseObj'

export const loadCesium = ():void => {
  cesiumViewer.viewer = new Viewer('cesiumContainer', {
    useDefaultRenderLoop: false,
    selectionIndicator: false,
    infoBox: false,
    navigationInstructionsInitiallyVisible: false,
    fullscreenButton: false,
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
    orderIndependentTranslucency: true,
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
  cesiumViewer.viewer.camera.flyTo({
    destination: center,
    orientation: {
      heading: CesiumMath.toRadians(0),
      pitch: CesiumMath.toRadians(-60),
      roll: CesiumMath.toRadians(0)
    },
    duration: 3
  })
}
