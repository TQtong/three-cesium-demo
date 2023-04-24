/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 13:42:56
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-24 14:45:52
 * @FilePath: \three-cesium-demo\src\base\baseObj.ts
 * @Description: base class
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// import * as d3 from 'd3'

// export const projection = d3
//   .geoMercator()
//   .center([108.923611, 34.540833])
//   .scale(80)
//   .translate([0, 0])

export const clock = new THREE.Clock() // 时间

export const raycaster = new THREE.Raycaster() // 射线追踪

export const mouse = new THREE.Vector2() // 鼠标对象

export const map = new THREE.Object3D() // map carrier

export const scene = new THREE.Scene()

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10 * 1000 * 1000)

export const axes = new THREE.AxesHelper(5)

export const cameraHelper = new THREE.CameraHelper(camera)

export const renderer = new THREE.WebGLRenderer({
  alpha: true,
  logarithmicDepthBuffer: true,
  antialias: true
})

export const control = new OrbitControls(camera, renderer.domElement)

export const cesiumViewer = {
  view: null
} as any

export const boundingBox = {
  minWGS84: [115.23, 39.55] as Array<number>,
  maxWGS84: [116.23, 41.55] as Array<number>
}
