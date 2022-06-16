import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

import { PayoutList, PayoutHistoryList } from './types'

export const getMyPayoutList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<PayoutList>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('tm/getMyPayoutList/pending'),
  fulfilled: createAction('tm/getMyPayoutList/fulfilled'),
  rejected: createAction('tm/getMyPayoutList/rejected'),
}

export const getPayoutHistoryList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<PayoutHistoryList>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('tm/getPayoutHistoryList/pending'),
  fulfilled: createAction('tm/getPayoutHistoryList/fulfilled'),
  rejected: createAction('tm/getPayoutHistoryList/rejected'),
}
