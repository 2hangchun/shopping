import Mock from 'mockjs'
import floor from './floor'
import banner from './banner'

// 第一个参数请求地址，第二个参数是返回的数据
Mock.mock('/mock/bannerList', { code: 200, data: banner })
Mock.mock('/mock/floorList', { code: 200, data: floor })