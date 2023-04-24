/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 13:42:56
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-24 13:43:41
 * @FilePath: \three-cesium-demo\src\base\datGUI.ts
 * @Description: gui base and stats base
 */

import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

export const stats = new Stats()

export const gui = new GUI({ width: 200 })
