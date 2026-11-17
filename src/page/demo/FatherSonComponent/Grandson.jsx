import { useContext } from 'react'
import { MsgContext } from './contexts'
import './FatherSonComponent.css'

function Grandson({ money }) {
  const { msg } = useContext(MsgContext)

  return (
    <div className="father-son-leaf">
      <p>
        我接收了爸爸的金钱（<span className="father-son-num">{money}</span>）
      </p>
      <p>
        我通过<span className="father-son-key">useContext</span>接收了爷爷的消息（
        <span className="father-son-key">{msg}</span>）
      </p>
    </div>
  )
}

export default Grandson
