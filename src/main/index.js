'use strict'

import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9089`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    // 隐藏默认窗口框
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 引入ipcMain与渲染进程通信
const ipcMain = require('electron').ipcMain

ipcMain.on('min-app', () => {
  mainWindow.minimize()
})
ipcMain.on('max-app', () => {
  mainWindow.maximize()
})
ipcMain.on('close-app', () => {
  mainWindow.close()
  //  mainWindow.webContents.send('app-close');
  //  ipcMain.on('close-app-ok',()=>{
  //   if(mainWindow){

  //   }
  //  });
})
