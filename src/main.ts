/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-24 09:54:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-28 10:27:11
 * @FilePath: \three-cesium-demo\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Ion } from 'cesium'
import { createPinia } from 'pinia'
import ueController from './controller/ueController'

import 'cesium/Build/Cesium/Widgets/widgets.css'
import './styles/base.less'

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOTQ1OTEzMi01OGY3LTQyNzctYjBlOS01Zjg5ZTM0ODAwODMiLCJpZCI6MTE0MDgzLCJpYXQiOjE2Njc4OTA0NTh9.U4eb__2aDvkvQPz41Hm9PROQOCde_u2SlStrdiYl7Kk'

const pinia = createPinia()

const app = createApp(App)
app.provide('ueController', ueController)

app.use(router)
app.use(pinia)
app.mount('#app')
