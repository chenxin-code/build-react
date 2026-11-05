import { Navigate } from 'react-router-dom'
import DemoIndex from './page/demo/index'
import BaiduMapSearchLocate from './page/demo/BaiduMapSearchLocate'
import Water from './page/demo/Water'
import BatchCreatePlan from './page/demo/BatchCreatePlan'

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
      {
        path: 'batch-create-plan',
        element: <BatchCreatePlan />,
      },
    ],
  },
]

export default routes
