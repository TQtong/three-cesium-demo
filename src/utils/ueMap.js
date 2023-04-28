/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-28 10:13:51
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-28 11:06:09
 * @FilePath: \three-cesium-demo\src\utils\ueMap.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export function webSocketInit () {
  // connection = new WebSocket('ws://192.168.60.36:1134')
  const connection = new WebSocket('ws://192.168.40.15:1134')

  connection.onmessage = function (event) {
    // UE->Web
    debugger
    console.log(JSON.stringify(event))
    event.data.text().then((text) => {
      const result = JSON.parse(text)
      console.log('result', result)
      const name = result.Name
      const obj = result.Data
      // if (ue.interface[name]) {
      //   ue.interface[name](obj)
      // }
    })
  }

  connection.onclose = function () {
    // alert("连接已关闭...");
    setTimeout(function () {
      webSocketInit()
    }, 1000)
  }

  connection.onopen = function () {
    window.websocketCallback()
  }
}
