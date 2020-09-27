import React from 'react'
import { DSOList } from 'v2/app/components/DSO/components/DSOList'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import MyCommitments from './components/my-commitments'
import { InvestRoute } from 'v2/app/pages/invest/router'

export const InvestListRoute = {
  offerings: '/app/invest/offerings',
  commitments: '/app/invest/commitments'
}

export const investListRoutes = [
  {
    label: 'Offerings',
    path: InvestListRoute.offerings,
    exact: true,
    component: () => (
      <DSOList user={null} filter={{}} viewURL={InvestRoute.offeringView} />
    )
  },
  {
    label: 'My Commitments',
    path: InvestListRoute.commitments,
    exact: true,
    component: MyCommitments
  }
]

export const useInvestListRouter = generateAppRouterHook(
  InvestListRoute,
  InvestListRoute.offerings,
  investListRoutes
)
