import requests from "./ajax";
import mockRequests from './mockAjax'

//  实际的请求地址为/api/product/getBaseCategoryList
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
export const reqBannerList = () => mockRequests({ url: '/bannerList', method: 'get' })
export const reqFloorList = () => mockRequests({ url: '/floorList', method: 'get' })
export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
export const reqGoodsInfo = (id) => requests({ url: `/item/${id}`, method: 'get' })
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
export const reqDeleteCartById = (id) => requests({ url: `/cart/deleteCart/${id}`, method: 'delete' })
export const reqUpdateCheckedById = (id, isChecked) => requests({ url: `/cart/checkCart/${id}/${isChecked}`, method: 'get' })
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
export const reqRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })
export const reqLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
export const reqPayment = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })