import { useRoutes } from 'react-router-dom'
import DemoIndex from './page/demo/index'
import BaiduMapSearchLocate from './page/demo/BaiduMapSearchLocate'

const routes = [
  {
    path: '/',
    element: <DemoIndex />,
  },
  {
    path: '/demo',
    element: <DemoIndex />,
    children: [
      {
        path: 'baiduMap-search-locate',
        element: <BaiduMapSearchLocate />,
      },
    ],
  },
]

function App() {
  return useRoutes(routes)
}

export default App
