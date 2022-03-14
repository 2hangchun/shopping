import axios from "axios";
import nprogress from "nprogress";
// 导入进度条样式
import 'nprogress/nprogress.css'

const requests = axios.create({
    // baseUrl表示在请求地址后面都会加上/api，例如访问http://localhost:8080/实际访问的是http://localhost:8080/api
    baseURL: '/mock',
    timeout: 5000
})

requests.interceptors.request.use((config) => {
    nprogress.start()
    return config
})

requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error(error.message))
})

export default requests