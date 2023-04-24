
import {
  Viewer,
  ShadowMode,
  Cartesian3,
  Math as CesiumMath
} from 'cesium'
import { cesiumViewer } from '@/base/baseObj'

const minWGS84 = [115.23, 39.55]
const maxWGS84 = [116.23, 41.55]

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
    (minWGS84[0] + maxWGS84[0]) / 2,
    (minWGS84[1] + maxWGS84[1]) / 2 - 1,
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
