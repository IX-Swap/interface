import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { StakingStatus, Tier } from 'state/stake/reducer'

export const saveStakingStatus = createAction<{ status: StakingStatus }>('stake/saveStakingStatus')
export const selectTier = createAction<{ tier: Tier }>('stake/selectTier')

export const increaseAllowance: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/increaseAllowance/pending'),
  fulfilled: createAction('stake/increaseAllowance/fulfilled'),
  rejected: createAction('stake/increaseAllowance/rejected'),
}

export const stake: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/staking/pending'),
  fulfilled: createAction('stake/staking/fulfilled'),
  rejected: createAction('stake/staking/rejected'),
}
