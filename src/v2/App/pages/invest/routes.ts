import { InternalRouteProps } from '../../../types/util'

import InvestList from './pages/list'
import ViewDso from './pages/view'
import ViewCommitment from './pages/view-commitment'

const routes: InternalRouteProps[] = [
  {
    label: 'List',
    path: '/',
    exact: true,
    component: InvestList
  },
  {
    label: 'View One',
    path: '/view',
    exact: true,
    component: ViewDso
  },
  {
    label: 'View Commitment',
    path: '/view-commitment',
    exact: true,
    component: ViewCommitment
  }
]

export default routes
