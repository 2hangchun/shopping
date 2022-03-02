import { reqSearchInfo } from '@/api/index'

const state = {
    searchInfo: {}
};
const actions = {
    async searchInfo({ commit }, params = {}) {
        let result = await reqSearchInfo(params)
        if (result.code === 200) {
            commit('SEARCHINFO', result.data)
        }
    }
};
const mutations = {
    SEARCHINFO(state, value) {
        state.searchInfo = value
    }
};
const getters = {
    goodsList(state) {
        return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    },
    attrsList(state) {
        return state.searchInfo.attrsList || []
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
};
