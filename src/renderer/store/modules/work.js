
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
        // let i = 0;
        // let len = state.unfinishWork.length;
        // 如果是非置顶
        if(!work.isTop){
            state.unfinishWork.push(work);
        }else{
            state.unfinishWork.unshift(work);
        }
    }
};

export default {
    state,
    getters,
    mutations,
     
}


