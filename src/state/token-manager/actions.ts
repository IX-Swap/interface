import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

import { PayoutList } from './types'

export const getMyPayoutList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<PayoutList>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('user/getMyPayoutList/pending'),
  fulfilled: createAction('user/getMyPayoutList/fulfilled'),
  rejected: createAction('user/getMyPayoutList/rejected'),
}
