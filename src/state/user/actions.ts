import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { SupportedLocale } from 'constants/locales'
import { SecToken } from 'types/secToken'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
  tokenInfo?: any
  [key: string]: any
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserLocale = createAction<{ userLocale: SupportedLocale }>('user/updateUserLocale')
export const updateUserSingleHopOnly = createAction<{ userSingleHopOnly: boolean }>('user/updateUserSingleHopOnly')
export const updateHideClosedPositions = createAction<{ userHideClosedPositions: boolean }>('user/hideClosedPositions')
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number | 'auto' }>(
  'user/updateUserSlippageTolerance'
)
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>('user/addSerializedToken')
export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>('user/addSerializedPair')
export const saveAccount = createAction<{ account: string }>('user/saveAccount')
export const removeSerializedPair = createAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>(
  'user/removeSerializedPair'
)
export const toggleURLWarning = createAction<void>('app/toggleURLWarning')
export const clearUserData = createAction<void>('user/clearData')
export const fetchUserSecTokenList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ tokenList: SecToken[] }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('user/fetchUserSecTokenList/pending'),
  fulfilled: createAction('user/fetchUserSecTokenList/fulfilled'),
  rejected: createAction('user/fetchUserSecTokenList/rejected'),
}
export const saveUserSecTokens = createAction<{ tokenList: SecToken[] }>('user/saveUserSecTokens')
export const passAccreditation: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('user/passAccreditation/pending'),
  fulfilled: createAction('user/passAccreditation/fulfilled'),
  rejected: createAction('user/passAccreditation/rejected'),
}

export const authorizeSecToken: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('user/authorizeSecToken/pending'),
  fulfilled: createAction('user/authorizeSecToken/fulfilled'),
  rejected: createAction('user/authorizeSecToken/rejected'),
}

export const updateUnderstoodPlayground = createAction<{ understood: boolean }>(
  'application/updateUnderstoodPlayground'
)

export const getMe: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: RawGetMePayload }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('user/getMe/pending'),
  fulfilled: createAction('user/getMe/fulfilled'),
  rejected: createAction('user/getMe/rejected'),
}

export interface ManagerOfToken {
  id: number
  tokenId: number
  userId: number
  createdAt: null | string
  updatedAt: null | string
  deletedAt: null | string
  token: SecToken
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
  isWhitelisted: boolean
  managerOf: ManagerOfToken[]
}
