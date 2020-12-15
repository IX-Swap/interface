import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { InvestCommitmentView } from 'app/pages/invest/pages/InvestCommitmentView'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { MyCommitments } from 'app/pages/invest/components/MyCommitments'

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
