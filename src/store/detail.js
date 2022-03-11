import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodsInfo: {},
    uuid_token: getUUID()
}
const actions = {
    async goodsInfo({ commit }, id) {
        const result = await reqGoodsInfo(id)
        if (result.code === 200) {
            commit('GOODSINFO', result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code === 200) {
            return true
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GOODSINFO(state, value) {
        state.goodsInfo = value
    },



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