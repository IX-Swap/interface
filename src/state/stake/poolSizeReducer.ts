import { createReducer } from '@reduxjs/toolkit'
import {
  getOneWeekHistoricalPoolSize,
  getOneMonthHistoricalPoolSize,
  getTwoMonthsHistoricalPoolSize,
  getThreeMonthsHistoricalPoolSize,
} from './actions'

import { PERIOD } from 'state/stake/reducer'

export const DEFAULT_POOL_SIZE_LIMIT = '2000000'
export const POOL_SIZE_LOADING = '-1'
export const POOL_SIZE_ERROR = '-2'

interface PoolSizeState {
  [PERIOD.ONE_WEEK]: string
  [PERIOD.ONE_MONTH]: string
  [PERIOD.TWO_MONTHS]: string
  [PERIOD.THREE_MONTHS]: string
}

const initialState: PoolSizeState = {
  [PERIOD.ONE_WEEK]: '0',
  [PERIOD.ONE_MONTH]: '0',
  [PERIOD.TWO_MONTHS]: '0',
  [PERIOD.THREE_MONTHS]: '0',
}

export default createReducer<PoolSizeState>(initialState, (builder) =>
  builder
    .addCase(getOneWeekHistoricalPoolSize.pending, (state) => {
      state[PERIOD.ONE_WEEK] = POOL_SIZE_LOADING
    })
    .addCase(getOneWeekHistoricalPoolSize.fulfilled, (state, { payload: { data } }) => {
      state[PERIOD.ONE_WEEK] = data
    })
    .addCase(getOneWeekHistoricalPoolSize.rejected, (state, { payload: { errorMessage } }) => {
      state[PERIOD.ONE_WEEK] = POOL_SIZE_ERROR
      console.error('getOneWeekHistoricalPoolSize error: ', errorMessage)
    })
    .addCase(getOneMonthHistoricalPoolSize.pending, (state) => {
      state[PERIOD.ONE_MONTH] = POOL_SIZE_LOADING
    })
    .addCase(getOneMonthHistoricalPoolSize.fulfilled, (state, { payload: { data } }) => {
      state[PERIOD.ONE_MONTH] = data
    })
    .addCase(getOneMonthHistoricalPoolSize.rejected, (state, { payload: { errorMessage } }) => {
      state[PERIOD.ONE_MONTH] = POOL_SIZE_ERROR
      console.error('getOneMonthHistoricalPoolSize error: ', errorMessage)
    })
    .addCase(getTwoMonthsHistoricalPoolSize.pending, (state) => {
      state[PERIOD.TWO_MONTHS] = POOL_SIZE_LOADING
    })
    .addCase(getTwoMonthsHistoricalPoolSize.fulfilled, (state, { payload: { data } }) => {
      state[PERIOD.TWO_MONTHS] = data
    })
    .addCase(getTwoMonthsHistoricalPoolSize.rejected, (state, { payload: { errorMessage } }) => {
      state[PERIOD.TWO_MONTHS] = POOL_SIZE_ERROR
      console.error('getTwoMonthsHistoricalPoolSize error: ', errorMessage)
    })
    .addCase(getThreeMonthsHistoricalPoolSize.pending, (state) => {
      state[PERIOD.THREE_MONTHS] = POOL_SIZE_LOADING
    })
    .addCase(getThreeMonthsHistoricalPoolSize.fulfilled, (state, { payload: { data } }) => {
      state[PERIOD.THREE_MONTHS] = data
    })
    .addCase(getThreeMonthsHistoricalPoolSize.rejected, (state, { payload: { errorMessage } }) => {
      state[PERIOD.THREE_MONTHS] = POOL_SIZE_ERROR
      console.error('getThreeMonthsHistoricalPoolSize error: ', errorMessage)
    })
)
