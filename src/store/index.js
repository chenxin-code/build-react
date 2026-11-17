import { configureStore } from '@reduxjs/toolkit'
import yearReducer from './yearSlice'

// 对应 vue 项目 main.js 里的 new Vuex.Store({...})
export default configureStore({
  reducer: {
    year: yearReducer,
  },
})
