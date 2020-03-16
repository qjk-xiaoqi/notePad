<template>
    <div class="unfinish-work">
        <div class="unfinish-work-box">
            <div class="unfinish-header">
                <span>未完成任务</span>
                (<span>{{this.unfinishWork.length}}</span>)
            </div>
            <div class="unfinish-content">
                <div v-for="(work, index) in unfinishWork" :key="index" class="oneWork">
                    <p class="work-name">
                        <span class="space">任务名称：</span>
                        <span v-text="work.name" :title="work.name"></span>
                    </p>
                    <p class="work-content">
                        <span class="space">任务细节：</span>
                        <span v-text="work.content" :title="work.content"></span>
                    </p>
                    <div class="oparation-icon">
                      <i class="iocns el-icon-upload2" title="置顶" @click="toTop(work.ID)" ></i>
                      <i class="iocns el-icon-check" title="完成" @click="finished(work.ID)"></i>
                      <i class="iocns el-icon-close" title="删除" @click="remove(work.ID)"></i>
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
  methods: {
    toTop(id) {
        this.$store.commit('topWork',id);
    },
    finished(id) {
         this.$store.commit('doFinish',id);
    },
    remove(id) {
        this.$store.commit('doDelete',id);
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
  & > .unfinish-content{
    position: absolute;
    top: 41px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: scroll;
  }
}
.oneWork {
  padding: 5px 5px 8px;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: rgb(248, 220, 225);
  }
  .work-name {
      font-size: 14px;
  }
  .work-content {
    font-size: 13px;
  }
  .work-name,
  .work-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .space {
      margin-bottom: 2px;
  }
  .oparation-icon {
    position: absolute;
    top: 0px;
    right:0px;
    height: 45px;
    line-height: 45px;
    display: none;
    background-color: rgb(248, 220, 225);
    .el-icon-upload2 {
      &:hover {
        color: #409EFF;
      }
    }
    .el-icon-check {
      &:hover {
        color: #409EFF;
      }
    }
    .el-icon-close {
      &:hover {
        color: #F56C6C;
      }
    }

  }
  &:hover .oparation-icon {
    display: block;
  }
}


</style>