import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { changeYear } from '../../../store/yearSlice'
import { yearOptions } from './options'
import './BrotherComponent.css'

function Brother2() {
  const dispatch = useDispatch()
  const year = useSelector((state) => state.year)

  const onChange = (value) => {
    console.log('dispatch 调用 reducers')
    dispatch(changeYear(value))
  }

  return (
    <div className="brother-redux-box">
      <h2>{year}年销量数据</h2>
      <Select
        value={year}
        options={yearOptions}
        onChange={onChange}
        style={{ width: 120 }}
      />
    </div>
  )
}

export default Brother2
