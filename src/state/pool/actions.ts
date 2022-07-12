import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const setPoolTransctionHash = createAction<{ transactionHash: null | string }>('pool/loading')

export const addLiquidity: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('pool/addLiquidity/pending'),
  fulfilled: createAction('pool/addLiquidity/fulfilled'),
  rejected: createAction('pool/addLiquidity/rejected'),
}
