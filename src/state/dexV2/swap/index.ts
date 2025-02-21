import { createSlice } from '@reduxjs/toolkit'
import { networkConfig } from 'hooks/dex-v2/useNetwork'
import config from 'lib/config'

const defaultSwapDeadlineMinutes = 100

export interface SwapState {
  inputAsset: string
  outputAsset: string
  validationErrors: {
    highPriceImpact: boolean
    noSwaps: boolean
  }
  submissionError: string | null
  selectedTokens: string[]
  initialized: boolean
  tokenInAddress: string
  tokenOutAddress: string
  tokenInAmount: string
  tokenOutAmount: string
  transactionDeadline: number
}

const initialState: SwapState = {
  inputAsset: networkConfig.tokens.InitialSwapTokens.input,
  outputAsset: networkConfig.tokens.InitialSwapTokens.output,
  validationErrors: {
    highPriceImpact: false,
    noSwaps: false,
  },
  submissionError: null,
  selectedTokens: [],
  initialized: false,
  tokenInAddress: '',
  tokenOutAddress: '',
  tokenInAmount: '',
  tokenOutAmount: '',
  transactionDeadline: defaultSwapDeadlineMinutes,
}

const swapSlice = createSlice({
  name: 'swapDexV2',
  initialState,
  reducers: {
    setSwapState(state, action) {
      const newState = { ...state, ...action.payload }

      return newState
    },
    setSelectedTokensState(state, action) {
      state.selectedTokens = action.payload
    },
    addSelectedTokenState(state, action) {
      state.selectedTokens.push(action.payload)
    },
    removeSelectedTokenState(state, action) {
      const tokenIndex = state.selectedTokens.indexOf(action.payload)
      state.selectedTokens.splice(tokenIndex, 1)
    },
    resetSwapState: () => initialState,
  },
})

export const { setSwapState, resetSwapState, setSelectedTokensState, addSelectedTokenState, removeSelectedTokenState } =
  swapSlice.actions
export default swapSlice.reducer
