import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { timePeriods } from 'utils/time'
export interface AuthPayload {
  token: string
  expiresAt: number
}
export interface RawAuthPayload {
  accessToken: string
  expiresIn: keyof typeof timePeriods
}
export const saveToken = createAction<{ value: AuthPayload }>('auth/saveToken')

export const postLogin: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ auth: RawAuthPayload }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('auth/postLogin/pending'),
  fulfilled: createAction('auth/postLogin/fulfilled'),
  rejected: createAction('auth/postLogin/rejected'),
}
