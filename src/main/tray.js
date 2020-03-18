let mainWindow = null;
let appTray = null; // 托盘实例
const electron = require('electron');
const ipcMain = electron.ipcMain;
const path = require('path');
const Menu = electron.Menu;
const Tray = electron.Tray;

ipcMain.on('open-tray', ()=>{
    setTray();
})

// 隐藏主窗口，并创建托盘
function setTray(mainWindow) {
    // 当托盘最小化时，右击有一个菜单显示，这里进设置一个退出的菜单
    let trayMenuTemplate = [{ // 系统托盘图标目录
        label: '退出',
        click: function() {
            app.quit(); // 点击之后退出应用
        }
    }];
    // 创建托盘实例
    let iconPath = path.join(__dirname,'app.png');
    appTray = new Tray(iconPath);
    // 图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    
    // 隐藏主窗口
    mainWindow.hide();
    // 设置托盘悬浮提示
    appTray.setToolTip('notePad');
    // 设置托盘菜单
    appTray.setContextMenu(contextMenu);
    // 单机托盘小图标显示应用
    appTray.on('click', function() {
        // 显示主程序
        mainWindow.show();
        // 关闭托盘显示
        appTray.destory();
    });
}

module.exports = function (main){
    mainWindow = main;
}