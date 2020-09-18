import { InternalRouteProps } from 'v2/types/util'
import ViewDso from 'v2/app/pages/invest/pages/InvestView'
import ViewCommitment from 'v2/app/pages/invest/pages/InvestCommitmentView'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { InvestList } from 'v2/app/pages/invest/pages/InvestList'

export const InvestPath = {
  list: '/app/invest/list',
  offeringView: '/app/invest/offerings/:issuerId/:offeringId',
  commitmentView: '/app/invest/commitments/:commitmentId'
}

const investRoutes: InternalRouteProps[] = [
  {
    label: 'List',
    path: InvestPath.list,
    component: InvestList
  },
  {
    label: 'View Offering',
    path: InvestPath.offeringView,
    exact: true,
    component: ViewDso
  },
  {
    label: 'View Commitment',
    path: InvestPath.commitmentView,
    exact: true,
    component: ViewCommitment
  }
]

export const useInvestRouter = generateAppRouterHook(
  InvestPath,
  InvestPath.list,
  investRoutes
)
