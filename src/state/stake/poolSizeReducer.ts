import { createReducer } from '@reduxjs/toolkit'
import {
  getOneWeekHistoricalPoolSize,
  getOneMonthHistoricalPoolSize,
  getTwoMonthsHistoricalPoolSize,
  getThreeMonthsHistoricalPoolSize,
} from './actions'

export const DEFAULT_POOL_SIZE_LIMIT = 2_000_000

interface PoolSizeState {
  oneWeek: number
  oneMonth: number
  twoMonths: number
  threeMonths: number
  isOneWeekLoading: boolean
  isOneMonthLoading: boolean
  isTwoMonthsLoading: boolean
  isThreeMonthsLoading: boolean
}

const initialState: PoolSizeState = {
  oneWeek: 0,
  oneMonth: 0,
  twoMonths: 0,
  threeMonths: 0,
  isOneWeekLoading: false,
  isOneMonthLoading: false,
  isTwoMonthsLoading: false,
  isThreeMonthsLoading: false,
}

export default createReducer<PoolSizeState>(initialState, (builder) =>
  builder
    .addCase(getOneWeekHistoricalPoolSize.pending, (state) => {
      state.isOneWeekLoading = true
    })
    .addCase(getOneWeekHistoricalPoolSize.fulfilled, (state, { payload: { data } }) => {
      state.oneWeek = data
      state.isOneWeekLoading = false
    })
    .addCase(getOneWeekHistoricalPoolSize.rejected, (state, { payload: { errorMessage } }) => {
      state.isOneWeekLoading = false
      console.error('getOneWeekHistoricalPoolSize error: ', errorMessage)
    })
    .addCase(getOneMonthHistoricalPoolSize.pending, (state) => {
      state.isOneMonthLoading = true
    })
    .addCase(getOneMonthHistoricalPoolSize.fulfilled, (state, { payload: { data } }) => {
      state.oneMonth = data
      state.isOneMonthLoading = false
    })
    .addCase(getOneMonthHistoricalPoolSize.rejected, (state, { payload: { errorMessage } }) => {
      state.isOneMonthLoading = false
      console.error('getOneMonthHistoricalPoolSize error: ', errorMessage)
    })
    .addCase(getTwoMonthsHistoricalPoolSize.pending, (state) => {
      state.isTwoMonthsLoading = true
    })
    .addCase(getTwoMonthsHistoricalPoolSize.fulfilled, (state, { payload: { data } }) => {
      state.twoMonths = data
      state.isTwoMonthsLoading = false
    })
    .addCase(getTwoMonthsHistoricalPoolSize.rejected, (state, { payload: { errorMessage } }) => {
      state.isTwoMonthsLoading = false
      console.error('getTwoMonthsHistoricalPoolSize error: ', errorMessage)
    })
    .addCase(getThreeMonthsHistoricalPoolSize.pending, (state) => {
      state.isThreeMonthsLoading = true
    })
    .addCase(getThreeMonthsHistoricalPoolSize.fulfilled, (state, { payload: { data } }) => {
      state.threeMonths = data
      state.isThreeMonthsLoading = false
    })
    .addCase(getThreeMonthsHistoricalPoolSize.rejected, (state, { payload: { errorMessage } }) => {
      state.isThreeMonthsLoading = false
      console.error('getThreeMonthsHistoricalPoolSize error: ', errorMessage)
    })
)
