import { camera, renderer, cesiumViewer } from '@/base/baseObj'
import { loadCesium } from '@/utils/loadCesium'
import { threeRender } from '@/utils/threeRender'
import { createBox } from './composables/AnimationDouecahed'

renderer.setSize(window.innerWidth, window.innerHeight)

export const init = ():void => {
  loadCesium()
  createBox()
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
