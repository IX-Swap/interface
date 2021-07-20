import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { SecToken } from 'types/secToken'

export const saveTokens = createAction<{ tokens: SecToken[] }>('secTokens/saveTokens')
export const fetchSecTokenList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ tokenList: SecToken[] }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('secTokens/fetchSecTokenList/pending'),
  fulfilled: createAction('secTokens/fetchSecTokenList/fulfilled'),
  rejected: createAction('secTokens/fetchSecTokenList/rejected'),
}
