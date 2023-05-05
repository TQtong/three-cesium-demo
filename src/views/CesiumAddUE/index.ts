/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-05-05 09:52:14
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-05 09:53:49
 * @FilePath: \three-cesium-demo\src\views\CesiumAddUE\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { camera, renderer, cesiumViewer } from '@/base/baseObj'
import { loadCesium } from '@/utils/loadCesium'
import { threeRender } from '@/utils/threeRender'

renderer.setSize(window.innerWidth, window.innerHeight)

let globe:any

export const init = ():void => {
  loadCesium()
  globe = cesiumViewer.viewer.scene.globe
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
