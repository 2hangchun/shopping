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