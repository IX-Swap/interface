import { createReducer } from '@reduxjs/toolkit'
import { BrokerDealerSwapDto, saveBrokerDealerDto } from './actions'

export interface SwapHelperState {
  dto: BrokerDealerSwapDto | null
}

export const initialState: SwapHelperState = { dto: null }

export default createReducer(initialState, (builder) =>
  builder.addCase(saveBrokerDealerDto, (state, { payload: { dto } }) => {
    state.dto = dto
  })
)
