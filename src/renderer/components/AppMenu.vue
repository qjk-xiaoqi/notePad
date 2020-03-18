<template>
   <!-- 项目菜单   -->  
   <el-menu  default-active="memo" :collapse="true" 
      class="el-menu-vertical-demo left-app-menu" @select="indexChange" >
       <el-menu-item index="memo" @click="toEdit()">
          <i class="el-icon-date"></i>
          <span slot="title">备忘录</span>
       </el-menu-item>
       <el-menu-item index="eyeProtection" @click="toEye()">
          <i class="el-icon-view"></i>
          <span slot="title">眼保</span>
       </el-menu-item>
        <el-menu-item index="robot" @click="toRobot()">
          <i class="el-icon-s-custom"></i>
          <span slot="title">聊天机器人</span>
       </el-menu-item>
        <el-menu-item index="setting" @click="toSetting()">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
       </el-menu-item>
    </el-menu>
</template>
<script>
const ipcRenderer = require('electron').ipcRenderer;
let _this = null;
export default {
  data() {
      return {
        nowIndex: '', // 当前所在页面
        lastIndex:'' 
      }
    },
  methods: {
    indexChange(index) {
        // 修改当前所在的页面
        this.lastIndex = this.nowIndex;
        this.nowIndex = index;
    },
    toEdit () {
      this.$router.push('/')
    },
    toEye () {
      this.$router.push('/eyeProtection')
    },
    toRobot () {
      this.$router.push('/robot')
    },
    toSetting () {
      this.$router.push('/setting')
    }
  },
  mounted() {
    _this = this;
    this.nowIndex = 'memo';
    this.lastIndex = 'memo';
  },
  watch: {
    nowIndex() {
      // 当从设置页面切出时，要保存一下当前的设置
      if('setting' === this.lastIndex){
        this.$store.commit('saveTray');
      }
    }
  }
};
// 监听关闭事件
ipcRenderer.on('app-close', ()=>{
  let tray = _this.$store.state.setting.isTray;
  // 写入缓存 待实现
  
  // 判断是否要最小化托盘
  if(tray) {
    // 如果设置了托盘，通知主进程要最小化托盘
    ipcRenderer.send('open-tray');
  }else{
    // 直接关闭应用
    ipcRenderer.send('close-app-ok');
  }
})
</script>
<style scoped>
 .left-app-menu{
    height: 100%;
    background-color: pink;
    float:left;
 }
</style>
