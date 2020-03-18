<template>
  <div class="setting-box">
    <el-tabs>
      <el-tab-pane label="设置">
        <div>
          <el-checkbox v-model="tray">
            关闭时最小到托盘
          </el-checkbox>
        </div>
        <el-button class="button" type="primary" @click="saveSetting">保存</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tray: false
      }
    },
    methods: {
      saveSetting() {
        this.$store.commit('saveTray',this.tray);
      }
    },
    // 组件挂载时，获取设置
    mounted() {
      // 从缓存中获取配置
      // this.$store.commit('getConfig');
      this.tray = this.$store.state.setting.isTray;
    }
  }
</script>
<style lang="scss" scoped>
.setting-box {
  margin: 10px 40px;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  .button {
    margin-top: 100px;
  }
}


</style>