'use strict'

import { app, BrowserWindow, globalShortcut } from 'electron'

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

// 引入创建托盘函数
let tray = require('./tray');
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    // 隐藏默认窗口框
    // frame: false
  })

  mainWindow.loadURL(winURL)

   // 注册esc，用来关闭眼保的遮挡框
   globalShortcut.register('Esc', function () {
    // 关闭眼保
    closeEye();
  })
  tray(mainWindow);
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


// 创建主窗口
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

// 最小化窗口
ipcMain.on('min-app', () => {
  mainWindow.minimize()
})
// 放大窗口
ipcMain.on('max-app', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  }else {
    mainWindow.maximize();
  }
});
// 关闭窗口
ipcMain.on('close-app', () => {
  // 告知窗口即将关闭，检查是否设置了托盘功能
  mainWindow.webContents.send('app-close');
  ipcMain.on('close-app',()=>{
    if(mainWindow){
    mainWindow.close()
    }
   });
});


// 眼保模式
let eyeWindow = null,
 eyeTimer = null;

ipcMain.on('open-eye',(event,duration)=>{
    // 创建一个窗口
    eyeWindow = new BrowserWindow({
      width:200,
      height:200,
      frame: false,
      parent: mainWindow
    });
    eyeWindow.loadURL(`file:///${__dirname}/eye.html`);
    // eyeWindow.setFullScreen(true);
    // 十分钟之后,关闭护眼遮罩  
    eyeTimer = setTimeout(()=>{
       closeEye();
    },duration * 1000)

})

// 关闭眼保
function  closeEye() {
  if(eyeWindow){
    eyeWindow.close();
    eyeWindow = null;
    clearTimeout(eyeTimer);
    eyeTimer = null;
    // 通知渲染进程重新计时
    mainWindow.webContents.send('re-open-eye');
  }
}
