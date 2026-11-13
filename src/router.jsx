import { Navigate } from 'react-router-dom'
import DemoIndex from './page/demo/index'
import BaiduMapSearchLocate from './page/demo/BaiduMapSearchLocate'
import Water from './page/demo/Water'
import BatchCreatePlan from './page/demo/BatchCreatePlan'
import Earth3D from './page/demo/Earth3D'
import GroupOrder from './page/demo/GroupOrder'
import NotFound from './page/NotFound'

const routes = [
  {
    path: '/',
    element: <Navigate to="/demo" replace />,
  },
  {
    path: '/404',
    element: <NotFound />,
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
      {
        path: '3d-earth',
        element: <Earth3D />,
      },
      {
        path: 'group-order',
        element: <GroupOrder />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]

export default routes
