import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

import { PayoutList } from 'state/token-manager/types'

export const createDraft: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/createDraft/pending'),
  fulfilled: createAction('payout/createDraft/fulfilled'),
  rejected: createAction('payout/createDraft/rejected'),
}

export const getPayoutList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: PayoutList }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getPayoutList/pending'),
  fulfilled: createAction('payout/getPayoutList/fulfilled'),
  rejected: createAction('payout/getPayoutList/rejected'),
}

export const getMyPayoutList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: PayoutList; type: string }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getMyPayoutList/pending'),
  fulfilled: createAction('payout/getMyPayoutList/fulfilled'),
  rejected: createAction('payout/getMyPayoutList/rejected'),
}

export const getPayoutItem: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getPayoutItem/pending'),
  fulfilled: createAction('payout/getPayoutItem/fulfilled'),
  rejected: createAction('payout/getPayoutItem/rejected'),
}
