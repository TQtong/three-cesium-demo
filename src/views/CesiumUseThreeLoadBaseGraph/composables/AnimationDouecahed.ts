/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 17:14:20
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-24 17:23:04
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThreeLoadBaseGraph\composables\AnimationDouecahed.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene, boundingBox } from '@/base/baseObj'
import { Cartesian3 } from 'cesium'

export const createBox = ():void => {
  const _3Dobjects = [] as any

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  cube.scale.set(10000, 10000, 10000) // scale object to be visible at planet scale
  cube.position.z += 10000 // translate "up" in Three.js space so the "bottom" of the mesh is the handle
  cube.rotation.x = Math.PI / 2 // rotate mesh for Cesium's Y-up system
  scene.add(cube)

  // Assign Three.js object mesh to our object array
  const _3DOB = _3DObject()
  _3DOB.threeMesh = cube
  _3DOB.minWGS84 = boundingBox.minWGS84
  _3DOB.maxWGS84 = boundingBox.maxWGS84
  _3Dobjects.push(_3DOB)

  // Configure Three.js meshes to stand against globe center position up direction
  for (const id in _3Dobjects) {
    boundingBox.minWGS84 = _3Dobjects[id].minWGS84
    boundingBox.maxWGS84 = _3Dobjects[id].maxWGS84
    // convert lat/long center position to Cartesian3
    const center = Cartesian3.fromDegrees(
      (boundingBox.minWGS84[0] + boundingBox.maxWGS84[0]) / 2,
      (boundingBox.minWGS84[1] + boundingBox.maxWGS84[1]) / 2
    )

    // get forward direction for orienting model
    const centerHigh = Cartesian3.fromDegrees(
      (boundingBox.minWGS84[0] + boundingBox.maxWGS84[0]) / 2,
      (boundingBox.minWGS84[1] + boundingBox.maxWGS84[1]) / 2,
      1
    )

    // configure entity position and orientation
    _3Dobjects[id].threeMesh.position.copy(center)
    _3Dobjects[id].threeMesh.lookAt(
      centerHigh.x,
      centerHigh.y,
      centerHigh.z
    )
  }

  const render = () => {
    requestAnimationFrame(render)
    cube.rotation.y += 0.01
  }
  render()
}

const _3DObject = (): any => {
  return {
    threeMesh: null, // Three.js 3DObject.mesh
    minWGS84: null, // location bounding box
    maxWGS84: null
  } as any
}
