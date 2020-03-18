<template>
    <div class="main-work">
        <div class="from-row">
            <p>任务名称:</p>
            <el-input v-model="name" placeholder="请输入任务名称" size="small"></el-input>
        </div>
        <div class="from-row">
            <p>任务细节:</p>
            <el-input type="textarea" :row="2"  v-model="content" placeholder="请输入细节内容"></el-input>
        </div>
        <div class="from-row">
            <el-switch
                v-model="isTop"
                active-text="是否置顶"
                on-color="#13ce66"
                off-color="#ff4949">
            </el-switch>
        </div>
       
        <el-button  type="primary" @click="addNewWork"><i class="el-icon-edit" ></i>添加任务</el-button>
    </div>
</template>
<script>

export default {
    data() {
        return {
            name: '',
            content: '',
            isTop: false
        }
    },
    methods: {
        addNewWork() {
            // 检查填写是否为空
            if(this.name === '' || this.content === ''){
                this.$message.error("请输入内容");
                return;
            }
            //先增加ID，再获取ID
            this.$store.commit('addID');
            this.$store.commit('addWork',{
                name: this.name,
                content: this.content,
                ID: this.$store.getters.getID,
                isTop: this.isTop
            });
            this.name = "";
            this.content = "";

        }
    }
}
</script>
<style lang="scss" scoped>
.main-work {
    padding: 10px;
    .from-row {
        margin-bottom: 20px;
        & > p {
            margin-bottom: 10px;
        }
         
    }
}   
.el-icon-edit{
    margin-left: -10px;
    padding-right: 10px;
}

</style>