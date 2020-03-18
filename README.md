# notepad

> 基于electron的小工具

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```
# day1 
+ 项目架构搭建
+ 项目模块分类：项目头部、主菜单栏、记事本模块、护眼模块、聊天机器人模块、设置模块

# day2
+ 项目头部实现ing
+ 遇到的问题：项目显示成一个文件浏览器。原因：项目初始设置`eslint`来检查代码，比较严格，`src/renderder`中出现错误导致一个无效的`webpack`的`renderer.js`生成出来，打断了`htmlWebpackPlugin`创建`index.html`.由于`webpack-dev-server `没有`index.html`可以提供的服务器，所以服务器失败，程序返回文件浏览器。
+ 如何解决: 在开发中尽量关闭`eslink`来检查代码，因为它实在太严格。

# day3 
+ 头部实现ed
+ 菜单栏实现ing
+ 疑惑的地方： 对ElementUI `el-menu-item`中`slot`不解。
+ 如何解决: 查看源码，`el-menu-item`组件本质是`<li>`与`<slot>`的封装`<li> <slot name="title"></slot></li>`这样就很好理解了，在父组件使用`<span slot="title">备忘录</span>`其实就是具名Slot的使用，直接插入到`el-menu-item`组件中。

# day4
+ 菜单功能基本实现ed
+ 遇到的问题： `vue router` 报错：`Uncaught (in promise) NavigationDuplicated`
+ 如何解决：删除项目依赖的 `node_modules `文件夹
+ 记事本模块ing : 使用ElementUI组件中的`el-row`与`el-col`快速分块：添加新任务模块、未完成模块、已完成模块。
  + 添加新任务模块布局ed
  + 未完成模块布局ed

# day5 
+ 记事本模块ing
  + Vuex实现模块之间（添加新任务模块与未完成模块）的数据交互ed
  + 未完成模块中（置顶、删除、完成按钮）点击数据交互ed
  + 已完成模块布局ed
  + 已完成模块数据交互ed
+ 记事本模块ed

# day6
+ 护眼模块ing
  + 护眼模块样式ed
  + 遇到的问题： 开启护眼模式之后，计时问题。
  + 如何解决： 使用`worker`线程。组件挂载时，就创建`worker`线程，开启护眼模式后，向子线程发送消息.当时间快到时，子线程向主进程发消息，主进程再做相应的操作。
  + 护眼遮罩页面ed
+ 护眼模块ed

# day7
+ 设置模块ing
  + 设置模块样式ed
  + 本模块实现的功能：关闭应用时隐藏到托盘。使用`electron`提供的`Menu`与`Tray`模块实现
+ 设置模块ed

# day8
 




---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
