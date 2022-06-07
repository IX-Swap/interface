import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const createDraft: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/createDraft/pending'),
  fulfilled: createAction('payout/createDraft/fulfilled'),
  rejected: createAction('payout/createDraft/rejected'),
}
