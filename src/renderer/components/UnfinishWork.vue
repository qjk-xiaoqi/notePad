<template>
    <div class="unfinish-work">
        <div class="unfinish-work-box">
            <div class="unfinish-header">
                <span>未完成任务</span>
                (<span>{{this.unfinishWork.length}}</span>)
            </div>
            <div class="unfinish-content">
                <div v-for="(work, index) in unfinishWork" :key="index">
                    <p class="work-name">
                        <span>任务名称：</span>
                        <span v-text="work.name" :title="work.name"></span>
                    </p>
                    <p class="work-content">
                        <span>任务细节：</span>
                        <span v-text="work.content" :title="work.content"></span>
                    </p>
                    <div class="oparation-icon">
                      <i class="iocns el-icon-upload2" title="置顶" ></i>
                      <i class="iocns el-icon-check" title="完成" ></i>
                      <i class="iocns el-icon-close" title="删除" ></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      unfinishWork:[]
    }
  },
  mounted() {
    // 组件挂载完 就形成对应关系
    this.unfinishWork = this.$store.state.work.unfinishWork;
  }
}
</script>
<style lang="scss" scoped>
.unfinish-work {
  height: 100%;
  position: relative;
}

.unfinish-work-box {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  box-shadow:  0 2px 12px 0 rgba(0,0,0,.1);
  & > .unfinish-header{
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid  #ebeef5;
  }
}


</style>