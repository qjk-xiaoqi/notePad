/**
 *  主进程真正的入口文件
 */
const {app, BrowserWindow} = require('electron');

let mainwindow;// 主窗口

app.on('ready', () => {
    // 初始化主窗口
    mainwindow = new BrowserWindow({
        width: 1000,
        height: 560,
        title: 'never forget',
        frame: false,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true// 可以使用node的API
        }
    })
})