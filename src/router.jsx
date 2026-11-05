import { Navigate } from 'react-router-dom'
import DemoIndex from './page/demo/index'
import BaiduMapSearchLocate from './page/demo/BaiduMapSearchLocate'
import Water from './page/demo/Water'

const routes = [
  {
    path: '/',
    element: <Navigate to="/demo" replace />,
  },
  {
    path: '/demo',
    element: <DemoIndex />,
    children: [
      {
        path: 'baiduMap-search-locate',
        element: <BaiduMapSearchLocate />,
      },
      {
        path: 'water',
        element: <Water />,
      },
    ],
  },
]

export default routes
