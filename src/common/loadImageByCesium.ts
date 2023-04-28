/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-27 13:54:46
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-27 15:51:27
 * @FilePath: \three-cesium-demo\src\common\loadImageByCesium.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { BoundingBox, CustomLayer } from '@/types/customInterface'
import { Viewer, Rectangle, WebMapServiceImageryProvider } from 'cesium'

export const loadWMSImage = (viewer: Viewer, boundingBox: BoundingBox, layer: CustomLayer):void => {
  const { minX, minY, maxX, maxY } = boundingBox
  const { url, name } = layer
  const rectangle = Rectangle.fromDegrees(minX, minY, maxX, maxY)
  const wmsImageryProvider = new WebMapServiceImageryProvider({
    url: url,
    layers: name,
    parameters: {
      service: 'WMS',
      transparent: true,
      format: 'image/png',
      srs: 'EPSG:4326'
    },
    rectangle: rectangle
  })

  viewer.imageryLayers.addImageryProvider(wmsImageryProvider)
}
