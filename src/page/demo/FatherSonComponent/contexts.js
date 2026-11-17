import { createContext } from 'react'

// 对应 vue 的 provide / inject
export const MsgContext = createContext({ msg: '' })

// 对应 vue 的 $parent：子组件反向拿到父组件的方法
export const ParentContext = createContext(null)

// 对应 vue 的 $children：子组件把自己注册到父组件
export const ChildrenContext = createContext({ register: null, unregister: null })
