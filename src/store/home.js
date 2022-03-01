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
        console.log('向服务器发送请求获取数据');
        const result = await reqBannerList()
        console.log('已经获取到数据');
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
        console.log('修改仓库数据');
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
