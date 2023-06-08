/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-27 09:54:35
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-06-07 16:27:32
 * @FilePath: \three-cesium-demo\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/CesiumSubmergeAnalysis/CesiumSubmergeAnalysis'
import HomeView from '../views/CesiumWater/CesiumWater'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
