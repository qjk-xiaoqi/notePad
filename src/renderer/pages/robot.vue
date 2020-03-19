<template>
    <div>
        <div class="content-box">
            <div class="content-msg-box"
                 v-for="(mg, msgID) in talk" :key="msgID">
                 <p :class="[mg.belongTo + '-msg']">{{mg.content}}</p>
            </div>
        </div>

        <div class="message-box">
            <input type="text" 
                    v-model="msg" 
                    class="message-input"
                    placeholder="输入信息"
                    @keypress.enter="sendToRobot"/>
            <el-button   size="medium" class="message-button" @click.native="sendToRobot">发送</el-button>
        </div>
       
    </div>
   
</template>
<script>
import { ipcRenderer } from 'electron';
const ipcRenderder = require('electron').ipcRenderer;
let _this = null;
    export default {
        data() {
            return {
                msg: '',// 用户输入的内容
                talk:[] ,// 当前的聊天记录,
                msgID: 1
            }
        },
        methods: {
            sendToRobot () {
                if(!this.msg){
                    this.$message('您没有输入内容');
                    return;
                }
                // 点击发送或者回车，向talk中插入一条my msg
                this.talk.push({
                    msgID: this.msgID,
                    content: this.msg,
                    belongTo: 'my'

                })
                this.msgID ++ ;
                this.msg = '';
                // 通知主进程发请求
                ipcRenderer.send('http-request', {
                    text: this.msg,
                    methods: 'POST'
                })
            }
        },
        mounted() {
            _this = this;
            // 组件挂载时，向对话框中插入一条robot的msg
            this.talk.push({
                msgID:0,
                content: '你好啊',
                belongTo: 'robot'
            });

            // 监听主进程发回的消息
            ipcRenderer.on('http-response',(event,data)=>{
                let response = JSON.parse(data);
                _this.talk.push({
                    msgID: _this.index,
                    content: response,
                    belongTo: 'robot'
                });
                _this.msgID++;
            });

        }
    }
</script>
<style lang="scss" scoped>
.content-box {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 3em;
    left: 0px;
    padding: 20px;
    overflow: scroll;
 }
.content-msg-box {
    overflow:hidden;
    width: 100%;
    margin-bottom: 1em;
    p {
        max-width: 60%;
        padding: 5px 10px;
        border-radius: 5px;
        word-wrap: break-word;
        word-break: break-all;
    }
    .robot-msg {
        float: left;
        background-color: pink;
    }
    .my-msg {
        float: right;
        background-color:  #DCDFE6;
    }
}

.message-box {
    padding: 5px;
    position: absolute;
    right: 0;
    bottom: 6px;
    left: 0px;
    height: 2em;
    line-height: 2em;
    border-top: 1px solid  #DCDFE6;
    background-color:#EBEEF5;
    .message-input {
        border: 1px solid #ccc;
        height: 2em;
        line-height: 2em;
        padding: 0 10px;
        border-radius: 6px;
        display: block;
        margin-right: 60px;
        width: -webkit-fill-available;
        &:focus {
            outline: none;
        }
    }
    .message-button {
        background-color: pink;
        padding: 0px;
        width: 3.6em;
        height: 2.4em;
        line-height: 28px;
        position: absolute;
        top: 0.2em;
        right: 0.2em;
        color: #fff;
        bottom: 0.2px;
    }
}
</style>