<template>
     <!-- 项目头部 -->
    <div class="top-bg">
        <div class="top-menu">
            <div class="left-side">
                <i class="  el-icon-bell top-icon"></i>
                <span>小柒的记事本</span>
            </div>
        </div>
        <div class="right-side">
            <i class=" el-icon-minus top-icon " @click="minApp()"></i>
            <i class=" el-icon-plus top-icon" @click="maxApp()"></i>
            <i class="el-icon-close top-icon" @click="closeApp()"></i >
        </div>
    </div>
</template>
<script>

// 引入ipcRenderder模块与主进程进行通信
const ipcRenderder = require('electron').ipcRenderer
export default {
  methods: {
    // 最小化 app
    minApp () {
      ipcRenderder.send('min-app')
    },
    // 最大化 app
    maxApp () {
      ipcRenderder.send('max-app')
    },
    // 关闭 app
    closeApp () {
      ipcRenderder.send('close-app')
    }
  }
}
</script>
<style  scoped>
.top-menu {
    position:absolute;
    top: 0px;
    right: 88px;
    left: 65px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f5f5f5;
    background-color: #e9e6e6;
    /* 设置拖动栏 */
    -webkit-app-region: drag;  
}
.left-side {
    float: left; 
        
} 
.right-side {
    float: right;
     background-color: #e9e6e6 ;
}
.top-icon {
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
  padding: 7px;
}
</style>
