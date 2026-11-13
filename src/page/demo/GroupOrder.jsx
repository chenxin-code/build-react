import { useState } from 'react'
import { Tag, Popover, Button, Checkbox, Alert } from 'antd'
import { CaretDownOutlined, CaretUpOutlined, SettingOutlined } from '@ant-design/icons'
import _ from 'lodash'
import './GroupOrder.css'

const groupSelectOption = [
  { label: '字段a', value: 'a' },
  { label: '字段b', value: 'b' },
  { label: '字段c', value: 'c' },
  { label: '字段d', value: 'd' },
  { label: '字段e', value: 'e' },
  { label: '字段f', value: 'f' },
  { label: '字段g', value: 'g' },
]

const initTag = [{ label: '字段a', value: 'a', flag: true }]

function GroupOrder() {
  const [groupTag, setGroupTag] = useState(initTag)
  const [tempGroupTag, setTempGroupTag] = useState(initTag)

  const toggleFlag = (index) => {
    setGroupTag((prev) =>
      prev.map((item, i) => (i === index ? { ...item, flag: !item.flag } : item)),
    )
  }

  const removeTag = (index) => {
    setGroupTag((prev) => prev.filter((_, i) => i !== index))
  }

  const checkboxChange = (checked, option) => {
    setTempGroupTag((prev) => {
      if (checked) {
        return [...prev, { ...option, flag: true }]
      }
      return prev.filter((item) => item.value !== option.value)
    })
  }

  const handleOpenChange = (visible) => {
    if (visible) {
      setTempGroupTag(_.cloneDeep(groupTag))
    } else {
      setGroupTag(tempGroupTag)
    }
  }

  let asc = ''
  let desc = ''
  groupTag.forEach((item) => {
    if (item.flag) {
      desc += item.value + ','
    } else {
      asc += item.value + ','
    }
  })
  asc = asc.slice(0, -1)
  desc = desc.slice(0, -1)

  const popoverContent = (
    <div className="group-order-checkbox">
      {groupSelectOption.map((item) => (
        <Checkbox
          key={item.value}
          checked={tempGroupTag.some((t) => t.value === item.value)}
          onChange={(e) => checkboxChange(e.target.checked, item)}
        >
          {item.label}
        </Checkbox>
      ))}
    </div>
  )

  return (
    <div className="group-order">
      <div className="group-order-bar">
        {groupTag.map((item, index) => (
          <Tag
            key={item.value}
            className="group-order-tag"
            closable
            onClick={() => toggleFlag(index)}
            onClose={(e) => {
              e.preventDefault()
              e.stopPropagation()
              removeTag(index)
            }}
          >
            {item.flag ? <CaretDownOutlined /> : <CaretUpOutlined />}
            {item.label}
          </Tag>
        ))}
        <Popover
          placement="top-start"
          trigger="click"
          content={popoverContent}
          onOpenChange={handleOpenChange}
        >
          <Button icon={<SettingOutlined />} size="large">
            分组管理
          </Button>
        </Popover>
      </div>
      <Alert
        type="success"
        message={`升序：${asc} 降序：${desc}`}
        style={{ marginTop: 10, width: 500, textAlign: 'center' }}
      />
    </div>
  )
}

export default GroupOrder
