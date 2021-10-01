import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { DepositModalView } from './reducer'

export enum Field {
  AMOUNT = 'AMOUNT',
  SENDER = 'SENDER',
}

export const typeAmount = createAction<{ typedValue: string }>('deposit/typeAmount')
export const typeSender = createAction<{ typedValue: string }>('deposit/typeSender')
export const setCurrency = createAction<{ currencyId: string }>('deposit/setCurrency')
export const setError = createAction<{ errorMessage: string }>('deposit/setError')
export const setLoading = createAction<{ loading: boolean }>('deposit/setLoading')
export const setModalView = createAction<{ view: DepositModalView }>('deposit/setModalView')
export const depositSecTokens: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('deposit/depositSecTokens/pending'),
  fulfilled: createAction('deposit/depositSecTokens/fulfilled'),
  rejected: createAction('deposit/depositSecTokens/rejected'),
}

export const cancelDeposit: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('deposit/cancelDeposit/pending'),
  fulfilled: createAction('deposit/cancelDeposit/fulfilled'),
  rejected: createAction('deposit/cancelDeposit/rejected'),
}
