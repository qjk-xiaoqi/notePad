<template>
  <div class="eye-protection">
    <el-switch 
    v-model="isOpen"
    active-text="眼保模式"
    on-color="#13ce66"
    off-color="#ff4949">>
    </el-switch>  
    <p>
      <span>间隔时间：</span>
      <el-input-number 
      :min="1" 
      :max="180" 
      :step="5"
      v-model="defTime"
      ></el-input-number>
    </p>
    <el-button type="primary" @click="save" >保存</el-button>
  </div>
</template>
<script>
const ipcRenderer = require('electron').ipcRenderer;
let worker = null; // 开启一个线程
let _this;
export default {
  data() {
    return {
      isOpen: false,
      defTime: 60,
      duration: 10// 休息时间
    }
  },
  methods: {
    save() {
      // 点击保存按钮，
      worker.postMessage({
        isOpen: this.isOpen,
        time: this.defTime * 60 // 换为秒
      }) 
    }
  },
  mounted() {
    _this = this;
    // 组件挂载时创建线程
    worker = new Worker('/src/renderer/assets/eyeWorker.js');
    // 监听子进程发回的数据
    worker.onmessage = function(event) {
      if(event.data == 10) {
        // 如果传过来的seconds大于0，弹窗，告知用户眼保模式要开启了
          _this.$message.warning("即将进入护眼模式");
      }
      if(event.data == 0){
        // 时间到了 开启护眼
        ipcRenderer.send('open-eye',_this.duration * 60);
      }
    }
    // 重新计时
    ipcRenderer.on('re-open-eye', ()=>{
      _this.save();
    })

  }
}
</script>
<style lang="scss" scoped>
.eye-protection {
  padding: 50px;
  & > p {
     margin: 30px 0;
  }
}

</style>