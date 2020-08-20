import { InternalRouteProps } from 'v2/types/util'

import InvestList from 'v2/app/invest/pages/list'
import ViewDso from 'v2/app/invest/pages/view'
import ViewCommitment from 'v2/app/invest/pages/view-commitment'

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
