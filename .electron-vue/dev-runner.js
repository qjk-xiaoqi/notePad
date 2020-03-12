'use strict'

// 项目的启动文件
const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const { say } = require('cfonts')
const { spawn } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

let electronProcess = null
let manualRestart = false
let hotMiddleware

function logStats (proc, data) {
  let log = ''

  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }

  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

  console.log(log)
}


// 启动渲染进程
function startRenderer () {
  /*
    这个方法完成了三个操作：
    1、根据rendererConfig配置文件生成Compiler实例
    2、利用Compiler实例来创建webpackDevServer对象
    3、监听webpack编译的过程
  */ 
  return new Promise((resolve, reject) => {
    // 加载渲染进程的webpack配置文件：含dev-client.js与rendererConfig.entry.renderer（也就是main.js）两个文件
    // webpack将它们合并到一起打包，最后输出到根目录下的/dist/electron/renderer.js文件中。
    rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.renderer)
    rendererConfig.mode = 'development'
    // 生成Compiler实例
    const compiler = webpack(rendererConfig)
    //创建webpack-hot-middleware 与webpack-dev-server一样实现热加载
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      // 设置时间间隔：多长时间将心跳更新发送到客户端以保持连接的活动
      heartbeat: 2500
    })

    // 编译状态监控 ： 渲染进程监听的是compilation
    compiler.hooks.compilation.tap('compilation', compilation => {
      // hotMiddleware.publish这其实是一个钩子函数，检测webpack的编译状态，
      // 把其中的html-webpack-plugin-after-emit状态，发布到webpackHotMiddleware中。
      compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })
    compiler.hooks.done.tap('done', stats => {
       // logStats作用就是在终端屏幕上输出编译过程
      logStats('Renderer', stats)
    })

    // 创建webpack-dev-server
    const server = new WebpackDevServer(
      // 第一个参数为compiler实例
      compiler,
      {
        contentBase: path.join(__dirname, '../'),
        quiet: true,
        before (app, ctx) {
          // 使用webpackHotMiddleware
          app.use(hotMiddleware)
          ctx.middleware.waitUntilValid(() => {
            resolve()
          })
        }
      }
    )
    // 服务器运行在9080端口
    server.listen(9080)
  })
}




// 启动主进程
function startMain () {
  return new Promise((resolve, reject) => {
    mainConfig.entry.main = [path.join(__dirname, '../src/main/index.dev.js')].concat(mainConfig.entry.main)
    mainConfig.mode = 'development'
    // 创建主进程的compiler实例
    const compiler = webpack(mainConfig)
    //  编译状态监控： 主进程监听的是watchRun事件
    compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      logStats('Main', chalk.white.bold('compiling...'))
      // 向webpack-hot-middleware发布"compiling"的消息，用于页面显示
      hotMiddleware.publish({ action: 'compiling' })
      done()
    })

    // 主进程没有使用webpackDevServer的方式自动更新，而是通过webpack的watch模式，不断重启Electron实现的：
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }
      logStats('Main', stats)
      // 主进程文件发生改变，重启Electron(热更新)
      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        //重启Electron
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}





function startElectron () {
  var args = [
    '--inspect=5858',
    path.join(__dirname, '../dist/electron/main.js')
  ]

  // detect yarn or npm and process commandline args accordingly
  if (process.env.npm_execpath.endsWith('yarn.js')) {
    args = args.concat(process.argv.slice(3))
  } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    args = args.concat(process.argv.slice(2))
  }

  // 通过node的spawn方法运行electron,并传递了两个参数
  electronProcess = spawn(electron, args)
  
  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}



function electronLog (data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}

// 生成log
function greeting () {
  const cols = process.stdout.columns
  let text = ''

  if (cols > 104) text = 'electron-vue'
  else if (cols > 76) text = 'electron-|vue'
  else text = false

  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  electron-vue'))
  console.log(chalk.blue('  getting ready...') + '\n')
}





// 脚本运行时的唯一方法
function init () {
  // greeting函数生成一个log
  greeting();

  Promise.all([startRenderer(), startMain()])
    .then(() => {
      // 开启electron
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}

init();
