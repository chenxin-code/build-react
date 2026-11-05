import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Divider } from 'antd'

const demoIndex = [
  { title: '百度地图搜索/定位', path: 'baiduMap-search-locate' },
]

function DemoIndex() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <Divider>DEMO</Divider>
      <div className="tab-row">
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
      <Outlet />
    </div>
  )
}

export default DemoIndex
