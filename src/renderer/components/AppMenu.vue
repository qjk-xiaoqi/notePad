<template>
   <!-- 项目菜单 -->  
   <el-menu  default-active="memo"  :collapse="true" 
      class="el-menu-vertical-demo left-app-menu"  @select="indexChange">
       <el-menu-item index="memo" @click="toEdit()">
          <i class="el-icon-edit"></i>
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
export default {
    
}
</script>
<style scoped>
 .left-app-menu{
    height: 100%;
    background-color: pink;
    float:left;
 }
</style>
