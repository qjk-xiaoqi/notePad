import cache from '../../assets/dataBase';

const state = {
    isTray: false
};
const mutations = {
    getConfig() {
        let setting = cache.getSetting();

    },
    saveTray(state, tray) {
        state.isTray = tray;
        let setting = cache.getSetting();
        setting.all.alwaysTray = state.isTray;
        cache.saveSetting(setting);
    }
}
const actions = {

}
const getters = {
}
export default {
    state,
    mutations,
    actions,
    getters
}