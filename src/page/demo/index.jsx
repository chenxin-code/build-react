import { useState, useEffect, useRef, useCallback } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Divider } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { shuffle } from 'lodash'
import './DemoIndex.css'

const demoIndexData = [
  { title: '百度地图搜索/定位', path: 'baiduMap-search-locate' },
  { title: '水滴', path: 'water' },
  { title: '批量创建计划', path: 'batch-create-plan' },
  { title: '3D地球', path: '3d-earth' },
  { title: '分组排序', path: 'group-order' },
]

function DemoIndex() {
  const navigate = useNavigate()
  const location = useLocation()
  const tabRowRef = useRef(null)
  const [demoIndex, setDemoIndex] = useState([])
  const [showArrows, setShowArrows] = useState(false)

  useEffect(() => {
    setDemoIndex(shuffle(demoIndexData))
  }, [])

  const checkOverflow = useCallback(() => {
    const tabRow = tabRowRef.current
    if (!tabRow) return
    setShowArrows(tabRow.scrollWidth > tabRow.clientWidth)
  }, [])

  useEffect(() => {
    if (demoIndex.length === 0) return
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [demoIndex, checkOverflow])

  const scrollLeft = () => {
    const tabRow = tabRowRef.current
    if (!tabRow) return
    const buttons = tabRow.querySelectorAll('.ant-btn')
    const currentScroll = tabRow.scrollLeft
    let targetButton = null
    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i]
      if (btn.offsetLeft < currentScroll) {
        targetButton = btn
      } else {
        break
      }
    }
    if (targetButton) {
      tabRow.scrollTo({ left: targetButton.offsetLeft - 20, behavior: 'smooth' })
    } else {
      tabRow.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const tabRow = tabRowRef.current
    if (!tabRow) return
    const buttons = tabRow.querySelectorAll('.ant-btn')
    const currentScroll = tabRow.scrollLeft
    const rightEdge = currentScroll + tabRow.clientWidth
    let scrollAmount = tabRow.scrollWidth
    for (const btn of buttons) {
      if (btn.offsetLeft + btn.offsetWidth > rightEdge) {
        scrollAmount = btn.offsetLeft - 20
        break
      }
    }
    tabRow.scrollTo({
      left: Math.min(scrollAmount, tabRow.scrollWidth - tabRow.clientWidth),
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <Divider>DEMO</Divider>
      <div className="tab-container">
        {showArrows && (
          <div className="arrow-left" onClick={scrollLeft}>
            <LeftOutlined />
          </div>
        )}
        <div className="tab-row" ref={tabRowRef}>
          <Button.Group>
            {demoIndex.map((item) => {
              const isActive = location.pathname === `/demo/${item.path}`
              return (
                <Button
                  key={item.path}
                  type={isActive ? 'primary' : 'default'}
                  disabled={isActive}
                  size="large"
                  onClick={() => navigate(`/demo/${item.path}`)}
                >
                  {item.title}
                </Button>
              )
            })}
          </Button.Group>
        </div>
        {showArrows && (
          <div className="arrow-right" onClick={scrollRight}>
            <RightOutlined />
          </div>
        )}
      </div>
      <Outlet />
    </div>
  )
}

export default DemoIndex
