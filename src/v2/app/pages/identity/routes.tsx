import { InternalRouteProps } from 'v2/types/util'

import Landing from 'v2/app/pages/identity/pages/landing'
import IndividualPreview from 'v2/app/pages/identity/pages/individual'
import CorporatePreview from 'v2/app/pages/identity/pages/corporate'

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
