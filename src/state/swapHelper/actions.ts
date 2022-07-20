import { Currency, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { createAction } from '@reduxjs/toolkit'
import { AuthorizationInProgress, SwapAuthorization } from './typings'

export const saveAuthorization = createAction<{
  authorization: SwapAuthorization | null
  chainId: number
  address: string
}>('swapHelper/saveAuthorization')
export const clearAuthorization = createAction<{ addresses: string[]; chainId: number }>(
  'swapHelper/clearAuthorization'
)
export const setSwapState = createAction<{
  showConfirm: boolean
  tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined
  attemptingTxn: boolean
  swapErrorMessage: string | undefined
  txHash: string | undefined
}>('swapHelper/setSwapState')

export const setOpenModal = createAction<{
  openModal: boolean
}>('swapHelper/setOpenModal')

export const setLoadingSwap = createAction<{
  isLoading: boolean
}>('swapHelper/setLoadingSwap')

export const setAuthorizationInProgress = createAction<{
  authorizationInProgress?: AuthorizationInProgress | null
}>('swapHelper/setAuthorizationInProgress')

export const clearSwapHelperState = createAction('swapHelper/clearSwapHelperState')
