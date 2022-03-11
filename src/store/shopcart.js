import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
    cartList: []
}
const actions = {
    async cartList({ commit }) {
        const result = await reqCartList()
        if (result.code === 200) {
            commit('CARTLIST', result.data)
        }
    },
    async deleteCart({ commit }, id) {
        const result = await reqDeleteCartById(id)
        if (result.code === 200) {
            return true
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    },
    async updateChecked({ commit }, { id, isChecked }) {
        const result = await reqUpdateCheckedById(id, isChecked)
        if (result.code === 200) {
            return true
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    },
    deleteSelected({ getters, dispatch }) {
        let promiseArray = []
        getters.cartInfoList.forEach(item => {
            if (item.isChecked === 1) {
                promiseArray.push(dispatch('deleteCart', item.skuId))
            }
        });
        return Promise.all(promiseArray)
    },
    changeAllChecked({ getters, dispatch }, isChecked) {
        let arr = []
        getters.cartInfoList.forEach((item) => {
            if (item.isChecked !== isChecked) {
                arr.push(dispatch('updateChecked', { id: item.skuId, isChecked }))
            }
        });
        return Promise.all(arr)
    }

}
const mutations = {
    CARTLIST(state, value) {
        state.cartList = value
    }
}
const getters = {
    cartInfoList(state) {
        if (state.cartList[0]) {
            return state.cartList[0].cartInfoList
        }
        else {
            return []
        }
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}