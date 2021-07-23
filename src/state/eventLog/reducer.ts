import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from 'components/Vault/enum'
import { PaginationDetails } from 'types/pagination'
import { getLog, LogItem, resetPage, setEventLog, setFilter, setPage, setPaginationDetails } from './actions'

export interface EventLogState {
  eventLog: Array<LogItem>
  filter: ActionTypes | null
  page: number
  paginationDetails: PaginationDetails
  eventLogLoading: boolean
  eventLogError: string | null
}

const initialState: EventLogState = {
  eventLog: [],
  filter: null,
  page: 1,
  paginationDetails: {
    offset: 0,
    totalItems: 0,
    totalPages: 1,
    itemCount: 0,
    nextPage: 1,
    prevPage: 1,
  },
  eventLogLoading: false,
  eventLogError: null,
}

export default createReducer<EventLogState>(initialState, (builder) =>
  builder
    .addCase(setEventLog, (state, { payload: { eventLog } }) => {
      return {
        ...state,
        eventLog,
      }
    })
    .addCase(setFilter, (state, { payload: { filter } }) => {
      return {
        ...state,
        filter,
      }
    })
    .addCase(setPage, (state, { payload: { page } }) => {
      return {
        ...state,
        page,
      }
    })
    .addCase(resetPage, (state) => {
      state.page = 1
    })
    .addCase(setPaginationDetails, (state, { payload: { paginationDetails } }) => {
      return {
        ...state,
        paginationDetails,
      }
    })
    .addCase(getLog.pending, (state) => {
      state.eventLogLoading = true
      state.eventLogError = null
    })
    .addCase(getLog.fulfilled, (state, { payload: { response } }) => {
      state.eventLogLoading = false
      state.eventLog = response.items
      const { offset, totalItems, totalPages, itemCount, nextPage, prevPage } = response
      state.paginationDetails = { offset, totalItems, totalPages, itemCount, nextPage, prevPage }
      state.eventLogError = null
    })
    .addCase(getLog.rejected, (state, { payload: { errorMessage } }) => {
      state.eventLogLoading = false
      state.eventLogError = errorMessage
      state.page = 1
    })
)
