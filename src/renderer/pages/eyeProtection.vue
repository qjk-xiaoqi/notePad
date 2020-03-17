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
      :min="30" 
      :max="180" 
      :step="10"
      v-model="defTime"
      ></el-input-number>
    </p>
    <el-button type="primary" @click="save" >保存</el-button>
  </div>
</template>
<script>
import func from '../../../vue-temp/vue-editor-bridge';
const ipcRenderer = require('electron').ipcRenderer;
let worker = null; // 开启一个线程
export default {
  data() {
    return {
      isOpen: false,
      defTime: 60
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
    // 组件挂载时创建线程
    worker = new Worker('/src/renderer/assets/eyeWorker.js');
    // 监听子进程发回的数据
    worker.onmessage = function(event) {

    }

    // ipcRenderer.on('')

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