import { reqCategoryList } from "@/api";

const state = {
    // 根基接口的返回值类型进行初始化
    categoryList: []
};
const actions = {
    async categoryList({ commit }) {
        const result = await reqCategoryList()
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    }
};
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value.slice(0, -1)
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters,
};
