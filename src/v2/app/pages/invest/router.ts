import { InternalRouteProps } from 'v2/types/util'
import ViewDso from 'v2/app/pages/invest/pages/InvestView'
import ViewCommitment from 'v2/app/pages/invest/pages/InvestCommitmentView'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { InvestList } from 'v2/app/pages/invest/pages/InvestList'

export const InvestRoute = {
  list: '/app/invest',
  offeringView: '/app/invest/offerings/:issuerId/:dsoId',
  commitmentView: '/app/invest/commitments/:commitmentId'
}

export const investRoutes: InternalRouteProps[] = [
  {
    label: 'View Offering',
    path: InvestRoute.offeringView,
    exact: true,
    component: ViewDso
  },
  {
    label: 'View Commitment',
    path: InvestRoute.commitmentView,
    exact: true,
    component: ViewCommitment
  },
  {
    label: 'Invest',
    path: InvestRoute.list,
    component: InvestList
  }
]

export const useInvestRouter = generateAppRouterHook(
  InvestRoute,
  InvestRoute.list,
  investRoutes
)
