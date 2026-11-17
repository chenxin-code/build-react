import { createSlice } from '@reduxjs/toolkit'

// 公共数据，对应 vuex 的 state
const yearSlice = createSlice({
  name: 'year',
  initialState: '2022',
  // 更改状态的唯一方法，对应 vuex 的 mutations
  reducers: {
    changeYear(state, action) {
      return action.payload
    },
  },
})

export const { changeYear } = yearSlice.actions

export default yearSlice.reducer
