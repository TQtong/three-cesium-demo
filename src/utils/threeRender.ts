/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 14:29:53
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-24 15:46:06
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThreeStart\composables\threeRender.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { cesiumViewer, camera, renderer, scene } from '@/base/baseObj'
import { Math as CesiumMath } from 'cesium'

export const threeRender = (): void => {
  // Clone Cesium Camera projection position so the
  // Three.js Object will appear to be at the same place as above the Cesium Globe
  camera.matrixAutoUpdate = false
  const cvm = cesiumViewer.viewer.camera.viewMatrix
  const civm = cesiumViewer.viewer.camera.inverseViewMatrix

  camera.lookAt(0, 0, 0)
  camera.matrixWorld.set(
    civm[0],
    civm[4],
    civm[8],
    civm[12],
    civm[1],
    civm[5],
    civm[9],
    civm[13],
    civm[2],
    civm[6],
    civm[10],
    civm[14],
    civm[3],
    civm[7],
    civm[11],
    civm[15]
  )
  camera.matrixWorldInverse.set(
    cvm[0],
    cvm[4],
    cvm[8],
    cvm[12],
    cvm[1],
    cvm[5],
    cvm[9],
    cvm[13],
    cvm[2],
    cvm[6],
    cvm[10],
    cvm[14],
    cvm[3],
    cvm[7],
    cvm[11],
    cvm[15]
  )
  const canvas = renderer.domElement
  renderer.setPixelRatio(window.devicePixelRatio)
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  camera.aspect = width / height
  camera.fov = CesiumMath.toDegrees(cesiumViewer.viewer.camera.frustum.fovy)
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
}
