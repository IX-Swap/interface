import { createAction } from '@reduxjs/toolkit'
import { SwapAuthorization } from './typings'
import { Currency, Token, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'

export const saveAuthorization =
  createAction<{ authorization: SwapAuthorization | null; chainId: number; address: string }>(
    'swapHelper/saveAuthorization'
  )

export const setSwapState =
  createAction<{
    showConfirm: boolean
    tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>('swapHelper/setSwapState')

export const setOpenModal =
  createAction<{
    openModal: boolean
  }>('swapHelper/setOpenModal')

export const saveTokenInProgress = createAction<{
  token: Token | null
}>('swapHelper/saveTokenInProgress')

export const setLoadingSwap =
  createAction<{
    isLoading: boolean
  }>('swapHelper/setLoadingSwap')
