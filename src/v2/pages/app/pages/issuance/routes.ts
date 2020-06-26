import { InternalRouteProps } from '../../../../types/util'

import InvestList from './pages/list'
import ViewDso from './pages/view'
import AddDso from './pages/add'

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
