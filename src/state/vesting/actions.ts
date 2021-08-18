import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { VestingDetails } from './types'

export const saveIsVesting = createAction<{ isVesting: boolean }>('vesting/saveIsVesting')
export const saveAvailableClaim = createAction<{ availableClaim: string }>('vesting/saveAvailableClaim')
export const savePayouts = createAction<{ payouts: [number, string][] }>('vesting/savePayouts')
export const getDetails: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ details: VestingDetails }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('vesting/getDetails/pending'),
  fulfilled: createAction('vesting/getDetails/fulfilled'),
  rejected: createAction('vesting/getDetails/rejected'),
}
