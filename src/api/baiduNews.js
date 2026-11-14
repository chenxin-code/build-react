import axios from 'axios'
import jsonBigint from 'json-bigint'

// 解决前端大整数精度丢失
const jsonBigintString = jsonBigint({ storeAsString: true })

const baiduNews = axios.create({
  baseURL: '/baiduNews',
  timeout: 5000,
  transformResponse: [
    (data) => {
      try {
        return jsonBigintString.parse(data)
      } catch (e) {
        return data
      }
    },
  ],
})

baiduNews.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

baiduNews.interceptors.response.use(
  (resp) => resp.data,
  (error) => Promise.reject(new Error(error)),
)

export default baiduNews
