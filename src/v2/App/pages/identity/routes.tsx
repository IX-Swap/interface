import { InternalRouteProps } from '../../../types/util'

import Landing from './pages/landing'
import IndividualPreview from './pages/individual'
import CorporatePreview from './pages/corporate'

const routes: InternalRouteProps[] = [
  {
    label: 'List',
    path: '/',
    exact: true,
    component: Landing
  },
  {
    label: 'View Individual',
    path: '/individual',
    exact: true,
    component: IndividualPreview
  },
  {
    label: 'View Corporate',
    path: '/corporate',
    exact: true,
    component: CorporatePreview
  }
]

export default routes
