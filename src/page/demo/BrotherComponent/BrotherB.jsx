import { useEffect, useState } from 'react'
import { Select } from 'antd'
import eventBus from '../../../eventBus'
import { foodOptions } from './options'
import './BrotherComponent.css'

function BrotherB() {
  const [food, setFood] = useState('西瓜')

  useEffect(() => {
    const onAchange = (value) => {
      console.log('B on')
      setFood(value)
    }
    eventBus.on('Achange', onAchange)
    return () => eventBus.off('Achange', onAchange)
  }, [])

  const changeFood = (value) => {
    setFood(value)
    console.log('B emit')
    eventBus.emit('Bchange', value)
  }

  return (
    <div className="brother-bus-box">
      <h2>我喜欢吃{food}</h2>
      <Select
        value={food}
        options={foodOptions}
        onChange={changeFood}
        style={{ width: 120 }}
      />
    </div>
  )
}

export default BrotherB
