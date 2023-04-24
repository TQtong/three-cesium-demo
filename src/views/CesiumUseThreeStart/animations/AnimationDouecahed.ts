import * as THREE from 'three'
import { scene, boundingBox } from '@/base/baseObj'
import { Cartesian3 } from 'cesium'

export const createDoucahed = ():void => {
  const _3Dobjects = [] as any

  // Three.js Objects
  /**
       *  three的坐标系（右手坐标系），关键数据结构 Vector3
       *    Y
       *    |
       *    |___ X
       *   /
       * Z
       *
       * Cesium的坐标系，关键数据结构 Cartesian3
       *    Z
       *    |
       *    |__ Y
       *   /
       * X
       *
       */
  // 在three的坐标系空间里，先向Z轴平移模型，然后绕X轴向上翻转90度，物体就面向Y轴了，对应Cesiumn的Z轴
  // Lathe geometry
  const doubleSideMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
  })
  const segments = 10
  const points = []
  for (let i = 0; i < segments; i++) {
    points.push(
      new THREE.Vector2(Math.sin(i * 0.2) * segments + 5, (i - 5) * 2)
    )
  }
  let geometry = new THREE.LatheGeometry(points)
  const latheMesh = new THREE.Mesh(geometry, doubleSideMaterial)
  latheMesh.scale.set(1500, 1500, 1500) // scale object to be visible at planet scale
  latheMesh.position.z += 15000 // translate "up" in Three.js space so the "bottom" of the mesh is the handle
  latheMesh.rotation.x = Math.PI / 2 // rotate mesh for Cesium's Y-up system
  const latheMeshYup = new THREE.Group()
  latheMeshYup.add(latheMesh)
  scene.add(latheMeshYup) // don’t forget to add it to the Three.js scene manually

  // Assign Three.js object mesh to our object array
  let _3DOB = _3DObject()
  _3DOB.threeMesh = latheMeshYup
  _3DOB.minWGS84 = boundingBox.minWGS84
  _3DOB.maxWGS84 = boundingBox.maxWGS84
  _3Dobjects.push(_3DOB)

  // dodecahedron
  geometry = new THREE.DodecahedronGeometry()
  const dodecahedronMesh = new THREE.Mesh(
    geometry,
    new THREE.MeshNormalMaterial()
  )
  dodecahedronMesh.scale.set(10000, 10000, 10000) // scale object to be visible at planet scale
  dodecahedronMesh.position.z += 10000 // translate "up" in Three.js space so the "bottom" of the mesh is the handle
  dodecahedronMesh.rotation.x = Math.PI / 2 // rotate mesh for Cesium's Y-up system
  const dodecahedronMeshYup = new THREE.Group()
  dodecahedronMeshYup.add(dodecahedronMesh)
  scene.add(dodecahedronMeshYup) // don’t forget to add it to the Three.js scene manually

  // Assign Three.js object mesh to our object array
  _3DOB = _3DObject()
  _3DOB.threeMesh = dodecahedronMeshYup
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
}

const _3DObject = (): any => {
  return {
    threeMesh: null, // Three.js 3DObject.mesh
    minWGS84: null, // location bounding box
    maxWGS84: null
  } as any
}
