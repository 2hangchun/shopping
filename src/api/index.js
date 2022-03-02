import requests from "./ajax";
import mockRequests from './mockAjax'

//  实际的请求地址为/api/product/getBaseCategoryList
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
export const reqBannerList = () => mockRequests({ url: '/bannerList', method: 'get' })
export const reqFloorList = () => mockRequests({ url: '/floorList', method: 'get' })
export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })