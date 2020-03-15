<template>
  <div id="app">
    <!-- 头部 -->
    <app-top></app-top>
     <!-- 菜单 -->
    <app-menu></app-menu>
    <!-- 内容 -->
    <div class="content" >
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AppTop from './components/AppTop'
  import AppMenu from './components/AppMenu'
  export default {
    name: 'notepad',
    components: {
      AppTop,
      AppMenu
    }
  }
</script>

<style>
*{
  padding: 0px;
  margin: 0px;
}
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
.content {
  position: absolute;
  top: 30px;
  left: 65px;
  right: 0;
  bottom:0;
  /* background: rgb(245, 195, 202); */

}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
    border-radius: 10px;
    width: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #bbb;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: #eee;
}

 
</style>
