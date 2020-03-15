<template>
    <div class="unfinish-work">
        <div class="unfinish-work-box">
            <div class="unfinish-header">
                <span>未完成任务</span>
                (<span>{{this.unfinishWork.length}}</span>)
            </div>
            <div class="unfinish-content">

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