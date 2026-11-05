import axios from 'axios'

const baiduMap = axios.create({ baseURL: '/baiduMap' })

baiduMap.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

baiduMap.interceptors.response.use(
  (resp) => resp.data,
  (error) => Promise.reject(new Error(error)),
)

export default baiduMap
