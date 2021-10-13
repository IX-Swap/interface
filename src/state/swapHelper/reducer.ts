import { createReducer } from '@reduxjs/toolkit'
import { saveAuthorization, setOpenModal, setSwapState } from './actions'
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
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(saveAuthorization, (state, { payload: { authorization, chainId, address } }) => {
      return {
        ...state,
        authorizations: {
          ...state.authorizations,
          [chainId]: {
            ...state.authorizations[chainId],
            [address]: authorization,
          },
        },
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
)
