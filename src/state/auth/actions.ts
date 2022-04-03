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
export const logout = createAction<string>('auth/logout')
export const postLogin: Readonly<{
  pending: ActionCreatorWithPayload<any>
  fulfilled: ActionCreatorWithPayload<{ auth: RawAuthPayload; account: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string; account: any }>
}> = {
  pending: createAction('auth/postLogin/pending'),
  fulfilled: createAction('auth/postLogin/fulfilled'),
  rejected: createAction('auth/postLogin/rejected'),
}
