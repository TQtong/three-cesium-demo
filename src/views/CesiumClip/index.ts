import { camera, renderer, cesiumViewer } from '@/base/baseObj'
import { loadCesium } from '@/utils/loadCesium'
import { threeRender } from '@/utils/threeRender'
import { gettestData } from '@/api'
import { Cartesian3, Plane, ClippingPlane, Color, ClippingPlaneCollection } from 'cesium'
import * as turf from '@turf/turf'

renderer.setSize(window.innerWidth, window.innerHeight)

let globe:any
let points:any
let pointsLength:any

export const init = ():void => {
  loadCesium()
  globe = cesiumViewer.viewer.scene.globe
  setClip()
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
const setClip = async () => {
  const testList = [

    [-2358434.3501556474,
      -3743554.5012105294,
      4581080.771684084],

    [2357886.4482675144,
      -3744467.562778789,
      4581020.9199767085],

    [-2357299.84353055,
      -3744954.0879047974,
      4581080.992360969],

    [-2356412.05169956,
      -3745385.3013702347,
      4580893.4737207815],

    [-2355472.889436636,
      -3745256.5725702164,
      4581252.3128526565],

    [-2354385.7458722834,
      -3744319.3823686405,
      4582372.770031389],

    [-2353758.788158616,
      -3743051.0128084184,
      4583356.453176038],

    [-2353663.8128999653,
      -3741847.9126874236,
      4584079.428665509],

    [-2354213.667592133,
      -3740784.50946316,
      4584502.428203525],

    [-2355596.239450013,
      -3739901.0226732804,
      4584515.9652557485],

    [-2356942.4170108805,
      -3740342.454698685,
      4583686.690694482],

    [-2357529.554838029,
      -3740766.995076834,
      4583145.055348843],

    [-2358106.017822064,
      -3741439.438418052,
      4582452.293605261],

    [-2358539.5426236596,
      -3742680.720902901,
      4581692.0260975715]
  ]

  const clippingPlanes = []
  const data = await gettestData()
  data.features.forEach((feature:any) => {
    feature.geometry.coordinates.forEach((coordinate:any) => {
      coordinate.forEach((item:any) => {
        // testTarget.push(positions)
        const positions = Cartesian3.fromDegreesArray(positionFormat(item))
        points = positions
        cesiumViewer.viewer.entities.add({
          polygon: {
            hierarchy: {
              // 层次
              positions
            },
            material: Color.RED.withAlpha(0.5)
          }
        })
      })
    })
  })

  pointsLength = points.length
  console.log(points)

  for (let i = 0; i < pointsLength; ++i) {
    const nextIndex = (i + 1) % pointsLength
    let midpoint = Cartesian3.add(
      points[i],
      points[nextIndex],
      new Cartesian3()
    )
    midpoint = Cartesian3.multiplyByScalar(
      midpoint,
      0.5,
      midpoint
    )

    const up = Cartesian3.normalize(
      midpoint,
      new Cartesian3()
    )
    let right = Cartesian3.subtract(
      points[nextIndex],
      midpoint,
      new Cartesian3()
    )
    right = Cartesian3.normalize(right, right)

    let normal = Cartesian3.cross(
      right,
      up,
      new Cartesian3()
    )

    normal = Cartesian3.normalize(normal, normal)
    // Compute distance by pretending the plane is at the origin
    const originCenteredPlane = new Plane(normal, 0.0)
    let distance = Plane.getPointDistance(
      originCenteredPlane,
      midpoint
    )
    if (distance > 0) {
      distance = -distance
    }
    // console.log(normal)
    // console.log(distance)
    clippingPlanes.push(new ClippingPlane(points[i], distance))
  }

  globe.clippingPlanes = new ClippingPlaneCollection({
    planes: clippingPlanes,
    edgeWidth: 1,
    edgeColor: Color.BLACK,
    enabled: true,
    unionClippingRegions: true
  })
  globe.depthTestAgainstTerrain = true
  globe.backFaceCulling = false
  globe.showSkirts = false
}

const positionFormat = (lngs: any) => {
  if (!Array.isArray(lngs)) {
    // eslint-disable-next-line no-param-reassign
    lngs = [lngs]
  }
  const positions = [] as any
  lngs.forEach((lng:any) => {
    const [longitude, latitude] = lng
    positions.push(longitude, latitude)
  })
  return positions
}
