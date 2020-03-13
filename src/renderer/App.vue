<template>
  <div id="app">
    <!-- 头部 -->
    <app-top></app-top>
    <!-- 菜单 -->
    <app-memu></app-memu>
    <!-- 内容 -->
    <div class="content" >
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AppTop from './components/AppTop'
  export default {
    name: 'notepad',
    components: {
      AppTop
    }
  }
</script>

<style>
  /* CSS */
</style>
