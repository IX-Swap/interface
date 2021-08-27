import { createReducer } from '@reduxjs/toolkit'
import { getBrokerDealers } from './actions'

export interface BrokerDealersState {
  tokenId: number
  brokersLoading: boolean
  brokersError: string | null
  brokersData: any[]
}

const initialState: BrokerDealersState = {
  tokenId: 0,
  brokersLoading: false,
  brokersError: null,
  brokersData: [],
}

export default createReducer<BrokerDealersState>(initialState, (builder) =>
  builder
    .addCase(getBrokerDealers.pending, (state) => {
      state.brokersLoading = true
      state.brokersError = null
    })
    .addCase(getBrokerDealers.fulfilled, (state, { payload: { data } }) => {
      state.brokersLoading = false
      state.brokersError = null
      state.brokersData = data
    })
    .addCase(getBrokerDealers.rejected, (state, { payload: { errorMessage } }) => {
      state.brokersLoading = false
      state.brokersError = errorMessage
    })
)
