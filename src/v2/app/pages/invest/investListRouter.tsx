import React from 'react'
import { DSOList } from 'v2/app/components/DSO/components/DSOList'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import MyCommitments from './components/my-commitments'
import { InvestRoute } from 'v2/app/pages/invest/router'
import { makeURL } from 'v2/config/urls'

export const InvestListRoute = {
  offerings: makeURL(['app', 'invest', 'offerings']),
  commitments: makeURL(['app', 'invest', 'commitments'])
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
