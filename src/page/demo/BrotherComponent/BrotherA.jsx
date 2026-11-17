import { useEffect, useState } from 'react'
import { Select } from 'antd'
import eventBus from '../../../eventBus'
import { foodOptions } from './options'
import './BrotherComponent.css'

function BrotherA() {
  const [food, setFood] = useState('西瓜')

  useEffect(() => {
    const onBchange = (value) => {
      console.log('A on')
      setFood(value)
    }
    eventBus.on('Bchange', onBchange)
    return () => eventBus.off('Bchange', onBchange)
  }, [])

  const changeFood = (value) => {
    setFood(value)
    console.log('A emit')
    eventBus.emit('Achange', value)
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

export default BrotherA
