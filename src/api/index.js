 import requests from "./request";

//  实际的请求地址为/api/product/getBaseCategoryList
 export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})