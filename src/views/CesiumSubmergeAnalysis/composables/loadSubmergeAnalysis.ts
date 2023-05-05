/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-05-05 10:26:25
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-05 11:00:16
 * @FilePath: \three-cesium-demo\src\views\CesiumSubmergeAnalysis\composables\loadSubmergeAnalysis.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Color, CallbackProperty } from 'cesium'
import { cesiumViewer } from '@/base/baseObj'

export const loadSubmergeAnalysis = (height: number):void => {
  cesiumViewer.viewer.entities.add({
    polygon: {
    }
  })
}
