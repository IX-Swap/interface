import { makeURL } from 'v2/config/urls'
import { InternalRouteProps } from 'v2/types/util'
import { InvestCommitmentView } from 'v2/app/pages/invest/pages/InvestCommitmentView'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { MyCommitments } from 'v2/app/pages/invest/components/MyCommitments'

export const CommitmentRoute = {
  list: makeURL(['app', 'invest', 'commitments']),
  commitmentView: makeURL([
    'app',
    'invest',
    'commitments',
    'commitmentId',
    'view'
  ])
}

export const commitmentRoutes: InternalRouteProps[] = [
  {
    label: 'View Commitment',
    path: CommitmentRoute.commitmentView,
    exact: true,
    component: InvestCommitmentView
  },
  {
    label: 'View Commitment',
    path: CommitmentRoute.list,
    component: MyCommitments
  }
]

export const useCommitmentRouter = generateAppRouterHook(
  CommitmentRoute,
  CommitmentRoute.list,
  commitmentRoutes
)
