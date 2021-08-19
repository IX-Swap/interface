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

export const postLogin: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ auth: RawAuthPayload }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/postLogin/pending'),
  fulfilled: createAction('admin/postLogin/fulfilled'),
  rejected: createAction('admin/postLogin/rejected'),
}

export interface RawGetMePayload {
  id: number
  email: string
  tenant: string
  language: string
  role: string
  photo: {
    uuid: string
  }
  photoId: number
  active: boolean
  ethAddress: string
  ethAddressMd5: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export const getMe: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: RawGetMePayload }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('admin/getMe/pending'),
  fulfilled: createAction('admin/getMe/fulfilled'),
  rejected: createAction('admin/getMe/rejected'),
}

export const logout: Readonly<{
  fulfilled: ActionCreatorWithoutPayload
}> = {
  fulfilled: createAction('admin/logOut/fulfilled'),
}
