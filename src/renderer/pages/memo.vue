<template>
   <!-- 记事本模块 -->  
   <el-row style="height:100%; background: #f5f5f5">
      <el-col :span="6" style="height:100% " >
         <main-work></main-work>
      </el-col>
      <el-col :span="9" style="height:100%">
         <unfinish-work></unfinish-work>
      </el-col>
      <el-col :span="9" style="height:100%">
         <finished-work></finished-work>
      </el-col>
   </el-row>
</template>
<script>
import MainWork from '../components/MainWork'
import FinishedWork from '../components/FinishedWork'
import UnfinishWork from '../components/UnfinishWork'
export default {
   components: {
       MainWork,
       FinishedWork,
       UnfinishWork
   }

}
</script>
<style lang="stylus" scoped>

</style>
