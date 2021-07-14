import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { SecToken } from 'types/secToken'

export const saveTokens = createAction<{ tokens: SecToken[] }>('secTokens/saveTokens')
export const fetchSecTokenList: Readonly<{
  pending: ActionCreatorWithPayload<{ url: string; requestId: string }>
  fulfilled: ActionCreatorWithPayload<{ url: string; tokenList: SecToken[]; requestId: string }>
  rejected: ActionCreatorWithPayload<{ url: string; errorMessage: string; requestId: string }>
}> = {
  pending: createAction('secTokens/fetchTokenList/pending'),
  fulfilled: createAction('secTokens/fetchTokenList/fulfilled'),
  rejected: createAction('secTokens/fetchTokenList/rejected'),
}
