import { reqAddressInfo, reqOrderInfo } from "@/api"
const state = {
    address: [],
    orderInfo: {}
}
const actions = {
    async getUserAddress({ commit }) {
        const result = await reqAddressInfo()
        if (result.code === 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    async getOrderInfo({ commit }) {
        const result = await reqOrderInfo()
        if (result.code === 200) {
            commit('GETORDERINFO', result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, value) {
        state.address = value
    },
    GETORDERINFO(state, value) {
        state.orderInfo = value
    }
}
const getters = {
    detailArrayList(state) {
        return state.orderInfo.detailArrayList
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}