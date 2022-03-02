import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

const state = {
    // 根基接口的返回值类型进行初始化
    categoryList: [],
    bannerList: [],
    floorList: []
};
const actions = {
    async categoryList({ commit }) {
        const result = await reqCategoryList()
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async bannerList({ commit }) {
        const result = await reqBannerList()
        if (result.code === 200) {
            commit('BANNERLIST', result.data)
        }
    },
    async floorList({ commit }) {
        const result = await reqFloorList()
        if (result.code === 200) {
            commit('FLOORLIST', result.data)
        }
    }
};
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value.slice(0, -1)
    },
    BANNERLIST(state, value) {
        state.bannerList = value
    },
    FLOORLIST(state, value) {
        state.floorList = value
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters,
};
