import { useCallback, useMemo, useRef, useState } from 'react'
import { Button } from 'antd'
import Son from './Son'
import { ChildrenContext, MsgContext, ParentContext } from './contexts'
import './FatherSonComponent.css'

const msgValue = { msg: 'xxxxxx' }

function FatherSonComponent() {
  const [money, setMoney] = useState(100)
  const sonRef = useRef(null)
  const childrenRef = useRef([])

  const moneyMinus1 = useCallback(() => setMoney((val) => val - 1), [])
  const moneyPlus1 = useCallback(() => setMoney((val) => val + 1), [])

  const parentApi = useMemo(
    () => ({ moneyMinus1, moneyPlus1 }),
    [moneyMinus1, moneyPlus1],
  )

  const childrenApi = useMemo(
    () => ({
      register: (instance) => {
        childrenRef.current.push(instance)
      },
      unregister: (instance) => {
        childrenRef.current = childrenRef.current.filter((item) => item !== instance)
      },
    }),
    [],
  )

  return (
    <div className="father-son">
      <MsgContext.Provider value={msgValue}>
        <ParentContext.Provider value={parentApi}>
          <ChildrenContext.Provider value={childrenApi}>
            <p>
              我有金钱（<span className="father-son-num">{money}</span>）传给儿子
            </p>
            <p>
              我通过<span className="father-son-key">Context</span>把消息（
              <span className="father-son-key">{msgValue.msg}</span>）传给儿子、孙子
            </p>
            <div className="father-son-actions">
              <Button onClick={() => sonRef.current?.moneyPlus1()}>
                ref调用子组件方法（金钱+1）
              </Button>
              <Button onClick={() => childrenRef.current[0]?.moneyPlus1()}>
                children调用子组件方法（金钱+1）
              </Button>
            </div>
            <Son ref={sonRef} money={money} onMoneyMinus1={moneyMinus1} />
          </ChildrenContext.Provider>
        </ParentContext.Provider>
      </MsgContext.Provider>
    </div>
  )
}

export default FatherSonComponent
