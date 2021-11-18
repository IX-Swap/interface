import { createReducer } from '@reduxjs/toolkit'
import { omit } from 'utils/omit'
import {
  clearAuthorization,
  clearSwapId,
  saveAuthorization,
  setAuthorizationInProgress,
  setLoadingSwap,
  setOpenModal,
  setSwapState,
} from './actions'
import { SwapHelperState } from './typings'

export const initialState: SwapHelperState = {
  authorizations: {},
  localSwap: {
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  },
  openModal: false,
  authorizationInProgress: null,
  loadingSwap: false,
  swapId: undefined,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(saveAuthorization, (state, { payload: { authorization, chainId, address, swapId } }) => {
      return {
        ...state,
        swapId,
        authorizations: {
          ...state.authorizations,
          [chainId]: {
            ...state.authorizations[chainId],
            [address]: authorization,
          },
        },
      }
    })
    .addCase(clearAuthorization, (state, { payload: { chainId, addresses } }) => {
      const newAuthorization = omit(state.authorizations[chainId], addresses)
      return {
        ...state,
        swapId: undefined,
        authorizations: {
          ...state.authorizations,
          [chainId]: {
            ...newAuthorization,
          },
        },
      }
    })
    .addCase(clearSwapId, (state) => {
      return {
        ...state,
        swapId: undefined,
      }
    })
    .addCase(
      setSwapState,
      (state, { payload: { showConfirm, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash } }) => {
        state.localSwap = {
          showConfirm,
          tradeToConfirm,
          attemptingTxn,
          swapErrorMessage,
          txHash,
        }
      }
    )
    .addCase(setOpenModal, (state, { payload: { openModal } }) => {
      state.openModal = openModal
    })

    .addCase(setAuthorizationInProgress, (state, { payload: { authorizationInProgress } }) => {
      state.authorizationInProgress = authorizationInProgress
    })
    .addCase(setLoadingSwap, (state, { payload: { isLoading } }) => {
      state.loadingSwap = isLoading
    })
)
