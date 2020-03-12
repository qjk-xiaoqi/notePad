/**  
 *  构建app用的配置文件: 该文件用于`electron-packager`打包时读取，主要配置了最终生成exe文件的一些参数。
 *  这些参数其实都可以通过命令的形式实现。
 */
const path = require('path');
module.exports = {
  // 目标架构和平台
  arch: 'x64',
  platform: process.env.BUILD_TARGET || 'all',
  // 是否启用asar压缩打包
  asar: true,
  // 打包目录
  dir: path.join(__dirname, '../'),
  // 应用图标
  icon: path.join(__dirname, '../build/icons/icon'),
  // 忽略哪些文件
  ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.join(__dirname, '../build'),
  overwrite: true,
}
