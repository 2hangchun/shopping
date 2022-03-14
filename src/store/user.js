import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    code: '',
    token: getToken() || '',
    userInfo: {}
}
const actions = {
    async getCode({ commit }, phone) {
        const result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
        }
        else {
            return Promise.reject(new Error(result.message))
        }
    },
    async register({ commit }, data) {
        const result = await reqRegister(data)
        if (result.code == 200) {
            return true
        }
        else {
            return Promise.reject(new Error(result.message))
        }
    },
    async login({ commit }, data) {
        const result = await reqLogin(data)
        if (result.code === 200) {
            commit('LOGIN', result.data.token)
            setToken(result.data.token)
            return true
        }
        else {
            return Promise.reject(new Error(result.message))
        }
    },
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 200) {
            commit('GETUSERINFO', result.data)
            return true
        }
        else {
            return Promise.reject(new Error(result.message))
        }
    },
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 200) {
            commit('LOGOUT')
            return true
        }
        else {
            return Promise.reject(new Error(result.message))
        }
    }

}
const mutations = {
    GETCODE(state, value) {
        state.code = value
    },
    LOGIN(state, value) {
        state.token = value
    },
    GETUSERINFO(state, value) {
        state.userInfo = value
    },
    LOGOUT(state) {
        state.userInfo = {}
        removeToken()
    }

}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}