/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 14:35:19
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-24 14:38:55
 * @FilePath: \three-cesium-demo\src\views\CesiumUseThree\features\addPolygon.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Cartesian3, Color } from 'cesium'
import { cesiumViewer, boundingBox } from '@/base/baseObj'

export const createBasePolygon = (): void => {
  // Cesium entity
  const entity = {
    name: 'Polygon',
    polygon: {
      hierarchy: Cartesian3.fromDegreesArray([
        boundingBox.minWGS84[0],
        boundingBox.minWGS84[1],
        boundingBox.maxWGS84[0],
        boundingBox.minWGS84[1],
        boundingBox.maxWGS84[0],
        boundingBox.maxWGS84[1],
        boundingBox.minWGS84[0],
        boundingBox.maxWGS84[1]
      ]),
      material: Color.RED.withAlpha(0.2)
    }
  }
  cesiumViewer.viewer.entities.add(entity)
}
