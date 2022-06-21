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
