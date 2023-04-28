import { CustomCesium } from '@/base/cesium'
import { CesiumStore } from './customInterface'
import { Globe, Viewer } from 'cesium'

export const cesiumStore:CesiumStore = {
  cesium: {
    viewer: {} as Viewer,
    globe: {} as Globe
  }
}
