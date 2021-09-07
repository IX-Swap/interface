import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const getBrokerDealers: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: any[] }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('broker-dealer/getPairs/pending'),
  fulfilled: createAction('broker-dealer/getPairs/fulfilled'),
  rejected: createAction('broker-dealer/getPairs/rejected'),
}
