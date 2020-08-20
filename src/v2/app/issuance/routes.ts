import { InternalRouteProps } from 'v2/types/util'

import InvestList from 'v2/app/issuance/pages/list'
import ViewDso from 'v2/app/issuance/pages/view'
import AddDso from 'v2/app/issuance/pages/add'

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
    label: 'Create Dso',
    path: '/add',
    component: AddDso
  }
]

export default routes
