import { camera, renderer, cesiumViewer } from '@/base/baseObj'
import { loadCesium } from './composables/loadCesium'
import { threeRender } from './composables/threeRender'
import { createBasePolygon } from './features/addPolygon'
import { createDoucahed } from './animations/AnimationDouecahed'

renderer.setSize(window.innerWidth, window.innerHeight)

export const init = ():void => {
  loadCesium()
  createBasePolygon()
  createDoucahed()
  window.onresize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  }
  render()
}

const render = ():void => {
  cesiumViewer.viewer.render()
  threeRender()
  requestAnimationFrame(render)
}
