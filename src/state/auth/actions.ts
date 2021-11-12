import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
export interface AuthPayload {
  token: string
  refreshToken: string
}
export interface RawAuthPayload {
  accessToken: string
  refreshToken: string
}
export const saveToken = createAction<{ value: AuthPayload }>('auth/saveToken')
export const clearToken = createAction('auth/clearToken')
export const logout = createAction('auth/logout')
export const postLogin: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ auth: RawAuthPayload }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('auth/postLogin/pending'),
  fulfilled: createAction('auth/postLogin/fulfilled'),
  rejected: createAction('auth/postLogin/rejected'),
}
