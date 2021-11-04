import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { VestingStatus } from 'pages/Farming/Vesting/Vesting'
import { VestingDetails, VestingState } from './types'

export const saveIsVesting: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ isVesting: boolean }>
  rejected: ActionCreatorWithPayload<{ errorMessage?: string }>
}> = {
  pending: createAction('vesting/saveIsVesting/pending'),
  rejected: createAction('vesting/saveIsVesting/rejected'),
  fulfilled: createAction('vesting/saveIsVesting/fulfilled'),
}
export const persistIsVesting = createAction<{ isVesting: boolean }>('vesting/persistIsVesting')
export const saveAvailableClaim: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ availableClaim: string }>
  rejected: ActionCreatorWithPayload<{ errorMessage?: string }>
}> = {
  pending: createAction('vesting/saveAvailableClaim/pending'),
  rejected: createAction('vesting/saveAvailableClaim/rejected'),
  fulfilled: createAction('vesting/saveAvailableClaim/fulfilled'),
}

export const savePayouts: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ payouts: [number, string][] }>
  rejected: ActionCreatorWithPayload<{ errorMessage?: string }>
}> = {
  pending: createAction('vesting/savePayouts/pending'),
  rejected: createAction('vesting/savePayouts/rejected'),
  fulfilled: createAction('vesting/savePayouts/fulfilled'),
}

export const getDetails: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ details: VestingDetails }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('vesting/getDetails/pending'),
  fulfilled: createAction('vesting/getDetails/fulfilled'),
  rejected: createAction('vesting/getDetails/rejected'),
}

export const saveCustomVestingAddress = createAction<{ customVestingAddress: string }>(
  'vesting/saveCustomVestingAddress'
)

export const saveVestingStatus = createAction<VestingStatus>('vesting/saveVestingStatus')

export const getIsPrivateBuyer: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: VestingState['privateBuyer'] }>
  rejected: ActionCreatorWithPayload<{ errorMessage?: string }>
}> = {
  pending: createAction('vesting/getIsPrivateBuyer/pending'),
  rejected: createAction('vesting/getIsPrivateBuyer/rejected'),
  fulfilled: createAction('vesting/getIsPrivateBuyer/fulfilled'),
}

export const claimAll: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithoutPayload
}> = {
  pending: createAction('vesting/claimAll/pending'),
  rejected: createAction('vesting/claimAll/rejected'),
  fulfilled: createAction('vesting/claimAll/fulfilled'),
}
