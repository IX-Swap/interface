import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export enum Field {
  AMOUNT = 'AMOUNT',
  SENDER = 'SENDER',
}

export const typeAmount = createAction<{ typedValue: string }>('deposit/typeAmount')
export const typeSender = createAction<{ typedValue: string }>('deposit/typeSender')
export const setCurrency = createAction<{ currencyId: string }>('deposit/setCurrency')

export const depositSecTokens: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('deposit/depositSecTokens/pending'),
  fulfilled: createAction('deposit/depositSecTokens/fulfilled'),
  rejected: createAction('deposit/depositSecTokens/rejected'),
}
