import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo } from 'react'
import { Button } from 'antd'
import Grandson from './Grandson'
import { ChildrenContext, MsgContext, ParentContext } from './contexts'
import './FatherSonComponent.css'

const Son = forwardRef(function Son({ money, onMoneyMinus1 }, ref) {
  const { msg } = useContext(MsgContext)
  const parent = useContext(ParentContext)
  const { register, unregister } = useContext(ChildrenContext)

  const api = useMemo(
    () => ({
      // 对应 vue 的 this.$parent.money++
      moneyPlus1: () => parent.moneyPlus1(),
    }),
    [parent],
  )

  useImperativeHandle(ref, () => api, [api])

  useEffect(() => {
    register(api)
    return () => unregister(api)
  }, [api, register, unregister])

  return (
    <div className="father-son-mid">
      <p>
        我接收了爸爸的金钱（<span className="father-son-num">{money}</span>
        ），再把金钱（<span className="father-son-num">{money}</span>）传给儿子
      </p>
      <p>
        我通过<span className="father-son-key">useContext</span>接收了爸爸的消息（
        <span className="father-son-key">{msg}</span>）
      </p>
      <div className="father-son-actions">
        <Button onClick={onMoneyMinus1}>
          props回调调用父组件方法（金钱-1）
        </Button>
        <Button onClick={() => parent.moneyMinus1()}>
          context调用父组件方法（金钱-1）
        </Button>
      </div>
      <Grandson money={money} />
    </div>
  )
})

export default Son
