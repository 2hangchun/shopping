import { reqGoodsInfo } from '@/api'

const state = {
    goodsInfo: {}
}
const actions = {
    async goodsInfo({ commit }, id) {
        const result = await reqGoodsInfo(id)
        if (result.code === 200) {
            commit('GOODSINFO', result.data)
        }
    }
}
const mutations = {
    GOODSINFO(state, value) {
        state.goodsInfo = value
    }

}
const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}