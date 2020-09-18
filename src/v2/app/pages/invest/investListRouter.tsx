import React from 'react'
import { DSOList } from 'v2/app/components/DSO/DSOList'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import MyCommitments from './components/my-commitments'

export const InvestListPath = {
  offerings: '/app/invest/list/offerings',
  commiments: '/app/invest/list/commitments'
}

export const investListRoutes = [
  {
    label: 'Offerings',
    path: InvestListPath.offerings,
    exact: true,
    component: () => <DSOList user={null} filter={{}} />
  },
  {
    label: 'My Commitments',
    path: InvestListPath.commiments,
    exact: true,
    component: MyCommitments
  }
]

export const useInvestListRouter = generateAppRouterHook(
  InvestListPath,
  InvestListPath.offerings,
  investListRoutes
)
