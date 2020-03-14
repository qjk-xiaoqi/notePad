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
+ 遇到的问题：项目显示成一个文件浏览器。原因：项目初始设置eslint来检查代码，比较严格，src/renderderzhon中出现错误导致一个无效的webpack的renderer.js生成出来，打断了htmlWebpackPlugin创建index.html.由于webpack-dev-server 没有index.html可以提供的服务器，所以服务器失败，程序返回文件浏览器。
+ 如何解决: 在开发中尽量关闭eslink来检查代码，因为它实在太严格。

# day3 
+ 头部实现ed
+ 菜单栏实现ing
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
