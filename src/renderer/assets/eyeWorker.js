let time  = 0;
    timer = null; // 定时器
    isOpen = false;// 是否开启
    seconds = 0; // 
// 监听来自主进程的数据
self.addEventListener('message' ,function(event) {
    var data = event.data;
    isOpen = data.isOpen;
    time = data.time;
    seconds = time;
    // 如果是不开启，清除定时器。
    if(!isOpen) {
        clearInterval(timer);
        timer = null;
    }else{
        // 否则开始计时
        countDown();
    }
},false);

// 计时函数
function countDown () {
    // 逐秒减
    timer = setInterval(() => {
        seconds--;
        // 只剩1分钟时，弹窗
        if(seconds < 60){
            // 向主进程发消息
            self.postMessage(seconds);
            if( 0 === seconds){
                clearInterval(timer);
                timer = null;
            }
        }
    }, 1000);
}