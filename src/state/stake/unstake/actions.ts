import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const increaseIXSGovAllowance: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/increaseIXSGovAllowance/pending'),
  fulfilled: createAction('stake/increaseIXSGovAllowance/fulfilled'),
  rejected: createAction('stake/increaseIXSGovAllowance/rejected'),
}

export const checkIXSGovAllowance = createAction<{ allowanceAmount: number }>('stake/checkIXSGovAllowance')

export const unstake: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ txStatus: number }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/unstaking/pending'),
  fulfilled: createAction('stake/unstaking/fulfilled'),
  rejected: createAction('stake/unstaking/rejected'),
}
