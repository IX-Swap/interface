import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

import { WhitelabelRaw } from './types'

export const getWhitelabelConfig: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<WhitelabelRaw>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('whitelabel/getWhitelabelConfig/pending'),
  fulfilled: createAction('whitelabel/getWhitelabelConfig/fulfilled'),
  rejected: createAction('whitelabel/getWhitelabelConfig/rejected'),
}
