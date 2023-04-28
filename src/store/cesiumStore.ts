import { defineStore } from 'pinia'
import { CustomCesium } from '@/base/cesium'
import { cesiumStore } from '@/types/customType'

export const useCesiumStore = defineStore('cesium', {
  state: () => cesiumStore,
  getters: {
    getViewer (state) {
      return state.cesium.viewer
    },
    getGlobe (state) {
      return state.cesium.globe
    }
  },
  actions: {
    setCesium (payload:CustomCesium) {
      this.cesium.viewer = payload.viewer
      this.cesium.globe = payload.globe
    }
  }
})
