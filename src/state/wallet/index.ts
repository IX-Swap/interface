import { createSlice } from '@reduxjs/toolkit'

export enum DepositView {
  CREATE_REQUEST,
  PENDING,
  ERROR,
  ABOUT_WRAPPING,
}

export interface WalletState {
  isConnected: boolean
  walletName: string
  isOpenDepositCard: boolean
  depositView: DepositView
  secTokensBalance: any
  isSignLoading: boolean
}

const initialState: WalletState = {
  isConnected: false,
  walletName: '',
  isOpenDepositCard: false,
  depositView: DepositView.CREATE_REQUEST,
  secTokensBalance: {},
  isSignLoading: false,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletState(state, action) {
      const newState = { ...state, ...action.payload }

      return newState
    },
    resetWalletState: () => initialState,
  },
})

export const { setWalletState, resetWalletState } = walletSlice.actions
export default walletSlice.reducer
