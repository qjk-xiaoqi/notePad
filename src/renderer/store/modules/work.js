
const state = {
    unfinishWork:[],
    nextID: 0
};
const getters = {
    //获取id
    getID: (state) => state.nextID
};
const mutations = {
    addID(state) {
        state.nextID++;
    },
    // 添加新任务到数组中
    addWork(state, work){
        // 如果是非置顶
        if(!work.isTop){
            state.unfinishWork.push(work);
        }else{
            state.unfinishWork.unshift(work);
        }
    },
    topWork(state, id) {
        // 根据id取出匹配的work对象，再将其插入到数组首部
        let index = findIndex(state.unfinishWork, id);
        // 返回的是个数组
        let newarr = state.unfinishWork.splice(index, 1);

        // 数组头部插入数据
        state.unfinishWork.unshift(...newarr);
    }
};

function findIndex(arr, id) {
    for(let i = 0; i< arr.length;i++){
        if(arr[i].ID === id) {
            return i;
        }
    }
}
 
export default {
    state,
    getters,
    mutations,
     
}


