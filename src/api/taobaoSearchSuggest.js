import axios from 'axios'

const taobaoSearchSuggest = axios.create({
  baseURL: '/taobaoSearchSuggest',
  timeout: 5000,
})

taobaoSearchSuggest.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

taobaoSearchSuggest.interceptors.response.use(
  (resp) => resp.data,
  (error) => Promise.reject(new Error(error)),
)

export default taobaoSearchSuggest
