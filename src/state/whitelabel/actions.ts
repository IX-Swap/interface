import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

import { Whitelabel } from './types'

export const getWhitelabelConfig: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<Whitelabel>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('whitelabel/getWhitelabelConfig/pending'),
  fulfilled: createAction('whitelabel/getWhitelabelConfig/fulfilled'),
  rejected: createAction('whitelabel/getWhitelabelConfig/rejected'),
}
