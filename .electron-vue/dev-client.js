const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

// 注册webpack-hot-middleware监听器
hotClient.subscribe(event => {
// 这里只处理了Main进程发送的`compiling`事件.
// 我们直接来说作用，他负责在编译过程中，在界面上显示“Compiling Main Process…”的提示语
  if (event.action === 'compiling') {
    document.body.innerHTML += `
      <style>
        #dev-client {
          background: #4fc08d;
          border-radius: 4px;
          bottom: 20px;
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
          color: #fff;
          font-family: 'Source Sans Pro', sans-serif;
          left: 20px;
          padding: 8px 12px;
          position: absolute;
        }
      </style>

      <div id="dev-client">
        Compiling Main Process...
      </div>
    `
  }
})
