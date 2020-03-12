/**
 *  这个配置文件的作用就是安装了electron-debug和vue-devtools两个工具，
 *  其中vue-devtools工具因为网络原因无法安装，可以自己手动安装。
 */


//  安装`electron-debug`工具
require('electron-debug')({ showDevTools: false })

//  安装Vue的一个Chrome开发工具`vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
})

// Require `main` process to boot app
require('./index')